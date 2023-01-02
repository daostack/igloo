
import { isAddress } from "ethers/lib/utils";
import { t } from "i18next";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { DelegateApplyPayload } from "../../../../interfaces/igloo";
import "./index.scss";

export default function DelegateApply() {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<DelegateApplyPayload>({ mode: "onBlur" });

  const apply: SubmitHandler<DelegateApplyPayload> = useCallback(async data => {
    console.log(data);
  }, [])

  return (
    <div className="delegate-apply">

      <form onSubmit={handleSubmit(apply)} className="delegate-apply__form">
        <input {...register("mainnetAddress", { required: true, validate: isAddress })} placeholder="Etherum Mainnet Address" />
        {errors.mainnetAddress && <span>{t("Shared.enter-valid-address")}</span>}
        <input {...register("starknetAddress", { required: true })} placeholder="Starknet Address" />
        {errors.starknetAddress && <span>{t("Shared.required")}</span>}
        <textarea {...register("description", { required: true })} placeholder="Description" />
        {errors.description && <span>{t("Shared.required")}</span>}

        <input {...register("ens")} placeholder="ENS name (optional)" />
        <input {...register("twitter")} placeholder="Twitter handle (optional)" />
        <input {...register("link")} placeholder="Any relevant links/Websites (optional)" />
        <input {...register("video")} placeholder="Introduction video link (optional)" />
        
        <input disabled={!isValid} type="submit" value="Submit" />
      </form>
    </div>
  )
}
