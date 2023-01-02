import {
  CampaignOnchainDetails,
  ChainsDetails,
  CampaignClaimInfo,
  TreeClaimInfo,
  campaignProvider,
  TokenBalance,
  Typechain,
  PublishInfo,
  getCampaignPublishInfo,
  bigNumberToNumber,
  erc20Provider,
  Asset,
  cmpAddresses,
  ClaimInPp,
  bigIntToNumber,
} from '@commonvalue/core';
import { Campaign } from '@prisma/client';
import { BigNumber, ethers } from 'ethers';

import { ChainProvider, ChainProviders } from '../../types';
import { awaitWithTimeout } from '../../utils/utils';
import { CampaignService } from '../CampaignService';
import { PriceService } from '../PriceService';

const ZERO_BYTES32 =
  '0x0000000000000000000000000000000000000000000000000000000000000000';

export class ReadDataService {
  constructor(
    protected campaignService: CampaignService,
    protected price: PriceService,
    protected providers: ChainProviders
  ) {}

  getProvider(_chainId?: number): ChainProvider {
    const chainId = _chainId || Array.from(this.providers.keys())[0];
    const provider = this.providers.get(chainId);
    if (!provider) {
      throw new Error(`provider not found ${chainId}`);
    }
    return provider;
  }

  async getBlockNumber(chainId: number): Promise<number> {
    const blockNumber = await this.providers
      .get(chainId)
      .provider.getBlockNumber();
    return blockNumber;
  }

  async getCampaignDetailsFromHandle(
    handle: string
  ): Promise<CampaignOnchainDetails | null> {
    const address = await this.campaignService.getAddressFromHandle(handle);

    if (!address) {
      throw new Error(`Campaign ${handle} not found`);
    }

    return this.getCampaignDetails(address);
  }

  async getCampaignDetails(
    address: string
  ): Promise<CampaignOnchainDetails | null> {
    const campaign = await this.campaignService.getFromAddress(address);

    const campaignContract = campaignProvider(
      campaign.address,
      this.getProvider(campaign.chainId).provider
    );

    const { balances } = await this.getCampaignBalances(campaign);
    const raised = await this.getCampaignRaised(campaign, campaignContract);
    const publishInfo = await this.getPublishInfo(
      campaign.address,
      campaign.chainId
    );

    const root =
      publishInfo.status.validRoot !== ZERO_BYTES32
        ? await this.campaignService.getRoot(publishInfo.status.validRoot)
        : undefined;

    return { balances, raised, publishInfo, root };
  }

  async getCampaignBalances(
    campaign: Campaign
  ): Promise<{ balances: TokenBalance[]; blockNumber: number }> {
    const assets = ChainsDetails.chainAssets(campaign.chainId);

    const tokens = await Promise.all(
      assets.map(async (asset): Promise<TokenBalance> => {
        let getBalance: Promise<BigNumber>;
        const provider = this.getProvider(campaign.chainId).provider;
        if (!ChainsDetails.isNative(asset)) {
          const token = erc20Provider(asset.address, provider);
          getBalance = token.balanceOf(campaign.address);
        } else {
          getBalance = provider.getBalance(campaign.address);
        }
        /* eslint-disable */
        const balance = await awaitWithTimeout<BigNumber>(
          getBalance,
          2000,
          new Error('Timeout getting balance')
        );
        const price = await this.priceOf(campaign.chainId, asset.address);
        /* eslint-enable */
        return {
          ...asset,
          balance: balance.toString(),
          price,
        };
      })
    );

    const custom = await this.getCustomBalances(
      campaign.customAssets,
      campaign.chainId,
      campaign.address
    );

    const blockNumber = await this.getBlockNumber(campaign.chainId);

    return { balances: tokens.concat(custom), blockNumber };
  }

  async getCampaignRaised(
    campaign: Campaign,
    campaignContract: Typechain.Campaign
  ): Promise<TokenBalance[]> {
    const assets = ChainsDetails.chainAssets(campaign.chainId);
    const custom = await this.getCustomAssets(
      campaign.customAssets,
      campaign.chainId
    );

    const raised = await Promise.all(
      assets.concat(custom).map(async (asset): Promise<TokenBalance> => {
        const raised = await campaignContract.totalReceived(asset.address);
        const price = await this.priceOf(campaign.chainId, asset.address);

        return {
          ...asset,
          balance: raised.toString(),
          price,
        };
      })
    );

    return raised;
  }

  async getCustomAssets(
    assetsAddresses: string[],
    chainId: number
  ): Promise<Asset[]> {
    return Promise.all(
      assetsAddresses.map((address) => this.getCustomAsset(address, chainId))
    );
  }

  async getCustomAsset(assetAddress: string, chainId: number): Promise<Asset> {
    const token = erc20Provider(
      assetAddress,
      this.getProvider(chainId).provider
    );

    //
    const decimals = await token.decimals();
    const symbol = await token.symbol();

    return {
      address: assetAddress,
      decimals: decimals,
      id: assetAddress,
      name: symbol,
      // balance: balance.toString(),
    };
  }

  /** append the balance of the custom assets of a given address */
  async getCustomBalances(
    customAssets: string[],
    chainId: number,
    address: string
  ): Promise<TokenBalance[]> {
    const assets = await this.getCustomAssets(customAssets, chainId);

    return Promise.all(
      assets.map(async (asset) => {
        const token = erc20Provider(
          asset.address,
          this.getProvider(chainId).provider
        );
        const balance = await token.balanceOf(address);
        return {
          ...asset,
          balance: balance.toString(),
        };
      })
    );
  }

  async getCustomRewardsAvailable(
    customAssets: string[],
    chainId: number,
    address: string,
    shares: string,
    campaignContract: Typechain.Campaign
  ): Promise<TokenBalance[]> {
    const assets = await this.getCustomAssets(customAssets, chainId);

    return Promise.all(
      assets.map(async (asset) => {
        const amount = await campaignContract.rewardsAvailableToClaimer(
          address,
          shares,
          asset.address
        );
        return {
          ...asset,
          balance: amount.toString(),
        };
      })
    );
  }

  /**
   * based on a given amount of shares, compute the avaialble rewards reading the campaign
   * balances
   */
  async getBalanceOfAssets(
    shares: string,
    address: string,
    chainId: number,
    assets: Asset[],
    customAssets: string[],
    campaignContract: Typechain.Campaign
  ): Promise<TokenBalance[]> {
    const tokens = await Promise.all(
      assets.map(async (asset): Promise<TokenBalance> => {
        const amount = await campaignContract.rewardsAvailableToClaimer(
          address,
          shares,
          asset.address
        );
        const price = await this.priceOf(chainId, asset.address);
        return {
          ...asset,
          balance: amount.toString(),
          price: price,
        };
      })
    );

    const custom = await this.getCustomRewardsAvailable(
      customAssets,
      chainId,
      address,
      shares,
      campaignContract
    );

    return tokens.concat(custom);
  }
  /** get the shares (and fill the assets) for a given merkle root of a given campaign */
  async getTreeClaimInfo(
    uri: string,
    root: string,
    address: string,
    campaignContract: Typechain.Campaign,
    chainId: number,
    customAssets: string[],
    verify: boolean = false
  ): Promise<TreeClaimInfo | undefined> {
    /** if there should be an entry in the root for this addres,
     * read the proof for this address and balance */
    const leaf = await this.campaignService.getBalanceLeaf(uri, root, address);

    /** is this an error? */
    if (leaf == null) return undefined;

    /** protection: check that the proof is valid */
    if (verify) {
      await campaignContract.verifyShares(address, leaf.balance, leaf.proof);
    }

    const assets = await this.getBalanceOfAssets(
      leaf.balance,
      address,
      chainId,
      ChainsDetails.chainAssets(chainId),
      customAssets,
      campaignContract
    );

    return {
      root,
      address,
      present: true,
      shares: leaf.balance.toString(),
      assets,
      proof: leaf.proof,
    };
  }

  /** gets the claim info assuming the merkle root update will go on as planned */
  async getClaimInfoInPp(
    uri: string,
    address: string,
    campaignContract: Typechain.Campaign,
    chainId: number,
    customAssets: string[]
  ): Promise<ClaimInPp> {
    const shares = await this.campaignService.getSharesOfAddressInPp(
      uri,
      address
    );

    const assets = await this.getBalanceOfAssets(
      shares,
      address,
      chainId,
      ChainsDetails.chainAssets(chainId),
      customAssets,
      campaignContract
    );

    const campaign = await this.campaignService.getFromAddress(
      campaignContract.address
    );

    return {
      shares,
      assets,
      activationTime:
        bigIntToNumber(campaign.nextExecDate) !== -1
          ? bigIntToNumber(campaign.nextExecDate)
          : bigIntToNumber(campaign.republishDate),
    };
  }

  async getClaimInfo(
    campaignAddress: string,
    claimerAddress: string
  ): Promise<CampaignClaimInfo | undefined> {
    const campaign = await this.campaignService.getFromAddress(campaignAddress);

    /** read the root details (including the tree) of the current campaign root (use the root
     * from the contract since maybe there is a recent one in the DB that has not been published) */
    const campaignContract = campaignProvider(
      campaign.address,
      this.getProvider(campaign.chainId).provider
    );

    const currentRoot = await campaignContract.getValidRoot();

    const currentClaim = await this.getTreeClaimInfo(
      campaign.uri,
      currentRoot,
      claimerAddress,
      campaignContract,
      campaign.chainId,
      campaign.customAssets,
      true
    );

    const isRootActive = await campaignContract.isPendingActive();
    const activationTime = await campaignContract.activationTime();

    let pendingClaim: TreeClaimInfo | undefined = undefined;
    if (!isRootActive) {
      const pendingRoot = await campaignContract.pendingMerkleRoot();
      if (pendingRoot !== currentRoot) {
        pendingClaim = await this.getTreeClaimInfo(
          campaign.uri,
          pendingRoot,
          claimerAddress,
          campaignContract,
          campaign.chainId,
          campaign.customAssets
        );
      }
    }

    /** check if the address was set as the payment address of an account */
    const claimInPp = await this.getClaimInfoInPp(
      campaign.uri,
      claimerAddress,
      campaignContract,
      campaign.chainId,
      campaign.customAssets
    );

    return {
      inPp: claimInPp,
      current: currentClaim,
      pending: pendingClaim,
      execDates: campaign.execDates.map((bi) => bigIntToNumber(bi)),
      publishedDates: campaign.publishedDates.map((bi) => bigIntToNumber(bi)),
      activationTime: bigNumberToNumber(activationTime),
    };
  }

  async priceOf(chainId: number, address: string): Promise<number | undefined> {
    return this.price.priceOf(chainId, address);
  }

  async assetOfAddress(
    address: string,
    chainId: number
  ): Promise<Asset | undefined> {
    let asset = ChainsDetails.assetOfAddress(chainId, address);
    if (!asset) {
      asset = await this.getCustomAsset(address, chainId);
    }
    return asset;
  }

  /** Fill out the Asset details and the price from the asset address and amount */
  async tokenBalance(
    chainId: number,
    address: string,
    amount: string
  ): Promise<TokenBalance> {
    const asset = await this.assetOfAddress(address, chainId);
    const price = await this.price.priceOf(chainId, address);
    return { ...asset, balance: amount, price };
  }

  async getPublishInfo(address: string, chainId: number): Promise<PublishInfo> {
    return getCampaignPublishInfo(
      this.getProvider(chainId).provider,
      chainId,
      address
    );
  }

  async getBalanceOf(
    assetAddress: string,
    chainId: number,
    account: string
  ): Promise<TokenBalance> {
    const asset = await this.assetOfAddress(assetAddress, chainId);
    if (!asset) {
      throw new Error(`Asset not found ${assetAddress} chainId: ${chainId}`);
    }

    const { provider } = this.providers.get(chainId);

    let get: Promise<BigNumber>;

    if (cmpAddresses(assetAddress, ethers.constants.AddressZero)) {
      get = provider.getBalance(account);
    } else {
      const contract = erc20Provider(assetAddress, provider);
      get = contract.balanceOf(account);
    }

    const balance = await get;
    const price = await this.priceOf(chainId, assetAddress);

    return {
      ...asset,
      balance: balance.toString(),
      price,
    };
  }
}
