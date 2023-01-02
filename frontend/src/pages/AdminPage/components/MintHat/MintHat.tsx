import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { t } from "i18next";
import { useEthers } from "@usedapp/core";
import { isAddress } from "ethers/lib/utils"
import { HatMint } from "../../../../interfaces/hatsProtocol";
import { useToggle } from "../../../../hooks/useToggle";
import { useMintHat, useViewHats } from "../../../../hooks/hatsProtocol/contractHooks";
import { useToast } from "../../../../components/Toast";
import { getTxLoadingText } from "../../../../utils/utils";
import Loading from "../../../../components/Loading/Loading";
import { HATS_IDS } from "../../../../data/hatsProtocolData";
import "./index.scss";

export default function MintHat() {
  const [loading, setLoading] = useToggle();
  const { account } = useEthers();
  const toast = useToast();
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<HatMint>({ mode: "onBlur" });
  const { send: mintHat, state: mintHatState } = useMintHat();
  const hats = useViewHats(HATS_IDS);

  const mint: SubmitHandler<HatMint> = useCallback(async data => {
    try {
      setLoading(true);
      const receipt = await mintHat(
        data.hatId,
        data.wearer
      );
      if (receipt?.status === 1) reset();
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.open(error instanceof Error ? error.message : t("Shared.general-error"));
    }
  }, [mintHat, toast, setLoading, reset])

  // TODO: need to check why getting array of undefined
  if (!hats) return null;

  return (
    <div className="mint-hat">
      MINT HAT

      {/* TODO: validate fields */}
      <form onSubmit={handleSubmit(mint)} className="mint-hat__form">
        <select {...register("hatId", { required: true })}>
          {hats.map((hat, index) => (
            <option key={index} value={HATS_IDS[index]}>{hat?.details} {`(${hat?.maxSupply})`}</option>
          ))}
        </select>

        <input {...register("wearer", { required: true, validate: isAddress })} placeholder="_wearer" />
        {errors.wearer && <span>{t("Shared.enter-valid-address")}</span>}

        <input disabled={!account || !isValid} type="submit" value="Mint" />
      </form>
      {loading && <Loading text={getTxLoadingText(mintHatState.status)} showTxInfo />}
    </div>
  )
}
