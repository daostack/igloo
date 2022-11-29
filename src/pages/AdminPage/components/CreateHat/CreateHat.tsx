import { useEthers } from "@usedapp/core";
import { BigNumber } from "ethers";
import { isAddress } from "ethers/lib/utils";
import { t } from "i18next";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Loading from "../../../../components/Loading/Loading";
import { useToast } from "../../../../components/Toast";
import { HATS_IDS } from "../../../../data/hatsProtocolData";
import { useCreateHat } from "../../../../hooks/hatsProtocol/contractHooks";
import { useToggle } from "../../../../hooks/useToggle";
import { HatCreate } from "../../../../interfaces/hatsProtocol";
import { getTxLoadingText } from "../../../../utils/utils";
import "./index.scss";

export default function CreateHat() {
  const [loading, setLoading] = useToggle();
  const { account } = useEthers();
  const toast = useToast();
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<HatCreate>({
    mode: "onBlur",
    defaultValues: { admin: HATS_IDS.TopHat }
  });
  const { send: createHat, state: createHatState } = useCreateHat();

  const create: SubmitHandler<HatCreate> = useCallback(async data => {
    try {
      setLoading(true);
      const receipt = await createHat(
        data.admin,
        data.details,
        BigNumber.from(data.maxSupply),
        data.eligibility,
        data.toggle,
        data.imageURI
      );
      console.log(receipt);
      /** TODO: call reset only on success - either according the receipt or the tx status */
      reset();
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.open(error instanceof Error ? error.message : t("Shared.general-error"));
    }
  }, [createHat, toast, setLoading, reset])

  return (
    <div className="create-hat">
      CREATE HAT

      {/* TODO: validate fields */}
      <form onSubmit={handleSubmit(create)} className="create-hat__form">
        <input disabled {...register("admin", { required: true })} placeholder="_admin" />
        <input {...register("details", { required: true })} placeholder="_details" />
        <input type="number" {...register("maxSupply", { required: true, valueAsNumber: true })} placeholder="_maxSupply" />
        <input {...register("eligibility", { required: true, validate: isAddress })} placeholder="_eligibility" />
        {errors.eligibility && <span>Enter a valid address</span>}
        <input {...register("toggle", { required: true, validate: isAddress })} placeholder="_toggle" />
        {errors.toggle && <span>Enter a valid address</span>}
        <input {...register("imageURI", { required: true })} placeholder="_imageURI" />

        <input disabled={!account || !isValid} type="submit" value="Create" />
      </form>
      {loading && <Loading text={getTxLoadingText(createHatState.status)} showTxInfo />}
    </div>
  )
}
