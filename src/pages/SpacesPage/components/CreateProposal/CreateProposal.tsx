
import { useCallback } from "react";
import { useParams } from "react-router";
import DatePicker from 'react-datepicker';
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { t } from "i18next";
import { useEthers } from "@usedapp/core";
import { Web3Provider } from "@ethersproject/providers";
import { snapshotClient } from "../../../../config/snapshot";
import { useToast } from "../../../../components/Toast";
import { BASIC_PROPOSAL_CHOICES, CHOICE_MAX_LENGTH, DESCRIPTION_MAX_LENGTH, PROPOSAL_TYPE } from "./constants";
import { getAppName, toUnixTime } from "../../../../utils/utils";
import { DateFormat } from "../../../../constants";
import { useToggle } from "../../../../hooks/useToggle";
import Loading from "../../../../components/Loading/Loading";
import { SnapshotError, SnapshotReceipt } from "../../../../interfaces/snapshot";
import "react-datepicker/dist/react-datepicker.css";
import "./index.scss";

export default function CreateProposal() {
  const [loading, setLoading] = useToggle();
  const { account, library } = useEthers();
  const { spaceId } = useParams();
  const { control, register, handleSubmit, watch, formState: { errors, isValid } } = useForm({ mode: "onBlur" });
  const { fields, append, remove } = useFieldArray({ control, name: "choices", rules: { minLength: 1 } });
  const toast = useToast();
  const navigate = useNavigate();

  // : SubmitHandler<CreateProposalForm>
  const create = useCallback(async (data) => {
    if (!account || !spaceId) return;

    try {
      setLoading(true);
      let choices = data.choices.filter(choice => choice.value !== "").map(choice => choice.value);
      if (data.type === PROPOSAL_TYPE["5"]) {
        choices = BASIC_PROPOSAL_CHOICES;
      } else choices.unshift(data["first-choice"]);

      const receipt = await snapshotClient.proposal(library as Web3Provider, account, {
        title: data.title,
        type: data.type,
        space: spaceId,
        app: getAppName(),
        plugins: JSON.stringify({}),
        snapshot: 1,
        choices: choices,
        start: toUnixTime(data.start),
        end: toUnixTime(data.end),
        body: data.body,
        discussion: data.discussion
      }) as SnapshotReceipt;

      setLoading(false);
      toast.open(t("CreateProposal.create-success"));
      navigate(`/spaces/${spaceId}/proposal/${receipt.id}`);
    } catch (error) {
      setLoading(false);
      toast.open((error as SnapshotError)?.code || (error as SnapshotError)?.error_description);
    }
  }, [account, library, spaceId, toast, navigate, setLoading])

  return (
    <div className="create-proposal">
      <h2>{t("CreateProposal.create-proposal")}</h2>
      <form onSubmit={handleSubmit(create)} className="create-proposal__form">
        <input {...register("title", { required: true })} placeholder="Title" />
        {errors.title && <span>{t("Shared.required")}</span>}
        <textarea {...register("body", { maxLength: DESCRIPTION_MAX_LENGTH })} placeholder={t("CreateProposal.description-placeholder")!} />

        {/* TODO: validate URL */}
        <input {...register("discussion")} placeholder={t("CreateProposal.discussion-placeholder")!} />

        <select {...register("type")}>
          {PROPOSAL_TYPE.map((type, index) => <option key={index} value={type}>{type}</option>)}
        </select>

        {
          watch("type") === PROPOSAL_TYPE[5] ? t("CreateProposal.basic-proposal-choices") : (
            <>
              <input {...register("first-choice", { required: true, maxLength: CHOICE_MAX_LENGTH })} placeholder={`${t("CreateProposal.choice-placeholder")} #1`} />
              {errors["first-choice"] && <span>{t("Shared.required")}</span>}
              {fields.map((field, index) => (
                <div key={index}>
                  <input
                    key={field.id}
                    {...register(`choices.${index}.value`, { maxLength: CHOICE_MAX_LENGTH })}
                    placeholder={`${t("CreateProposal.choice-placeholder")} #${index + 2}`}
                  />
                  <button type="button" onClick={() => remove(index)}>{t("Shared.remove")}</button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => append("")}>
                {t("Shared.add")}
              </button>
            </>
          )
        }

        <Controller
          control={control}
          name='start'
          rules={{ required: true }}
          render={({ field }) => (
            <DatePicker
              minDate={new Date()}
              showTimeSelect
              placeholderText={t("CreateProposal.start-date-placeholder")}
              onChange={date => field.onChange(date)}
              selected={field.value}
              dateFormat={DateFormat.DatePickerLong}
            />
          )}
        />

        <Controller
          control={control}
          name='end'
          rules={{ required: true }}
          render={({ field }) => (
            <DatePicker
              disabled={!watch("start")}
              startDate={new Date(watch("start"))}
              minDate={new Date(watch("start"))}
              showTimeSelect
              placeholderText={t("CreateProposal.end-date-placeholder")}
              onChange={date => field.onChange(date)}
              selected={field.value}
              dateFormat={DateFormat.DatePickerLong}
            />
          )}
        />

        <input disabled={!account || !isValid} type="submit" value={t("CreateProposal.publish")!} />
      </form>
      {loading && <Loading text={t("Shared.follow-wallet")!} />}
    </div>
  )
}
