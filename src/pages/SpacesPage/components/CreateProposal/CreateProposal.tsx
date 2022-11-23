
import { useCallback } from "react";
import { useParams } from "react-router";
import DatePicker from 'react-datepicker';
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useEthers } from "@usedapp/core";
import { Web3Provider } from "@ethersproject/providers";
import { snapshotClient } from "../../../../config/snapshot";
import { useToast } from "../../../../components/Toast";
import { CHOICE_MAX_LENGTH, DESCRIPTION_MAX_LENGTH, PROPOSAL_TYPE } from "./constants";
import { getAppName, toUnixTime } from "../../../../utils/utils";
import { DateFormat } from "../../../../constants";
import "react-datepicker/dist/react-datepicker.css";
import "./index.scss";

export default function CreateProposal() {
  const { account, library } = useEthers();
  const { spaceId } = useParams();
  const { control, register, handleSubmit, getValues, formState: { errors, isValid } } = useForm({ mode: "onBlur" });
  const { fields, append, remove } = useFieldArray({ control, name: "choices", rules: { minLength: 1 } });
  const toast = useToast();

  // : SubmitHandler<CreateProposalForm>
  const create = useCallback(async (data) => {
    if (!account || !spaceId) return;

    console.log(data)

    try {
      const choices = data.choices.filter(choice => choice.value !== "").map(choice => choice.value);
      choices.unshift(data["first-choice"]);

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
      })

      console.log(receipt);
      toast.open("Proposal Created Successfully!");
      // TODO: redricet to proposal page: receipt.id 
    } catch (error: any) { // TODO: better error type
      console.log(error)
      toast.open(error?.error_description || error?.code || error?.message);
    }
  }, [account, library, spaceId, toast])

  return (
    <div className="create-proposal">
      <h2>Create Proposal</h2>
      <form onSubmit={handleSubmit(create)} className="create-proposal__form">
        <input {...register("title", { required: true })} placeholder="Title" />
        {errors.title && <span>this field is required</span>}
        <textarea {...register("body", { maxLength: DESCRIPTION_MAX_LENGTH })} placeholder="Description (optional)" />
        <input {...register("discussion")} placeholder="Discussion (optional)" />
        {/* TODO: handle Basic voting case */}
        <select {...register("type")}>
          {PROPOSAL_TYPE.map((type, index) => <option key={index} value={type}>{type}</option>)}
        </select>
        <input {...register("first-choice", { required: true, maxLength: CHOICE_MAX_LENGTH })} placeholder="Choice 1" />
        {errors["first-choice"] && <span>at least one choice</span>}
        {fields.map((field, index) => (
          <div key={index}>
            <input
              key={field.id}
              {...register(`choices.${index}.value`, { maxLength: CHOICE_MAX_LENGTH })}
            />
            <button type="button" onClick={() => remove(index)}>Remove</button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append("")}>
          Add
        </button>

        <Controller
          control={control}
          name='start'
          rules={{ required: true }}
          render={({ field }) => (
            <DatePicker
              minDate={new Date()}
              showTimeSelect
              placeholderText='Start Date'
              onChange={(date) => field.onChange(date)}
              selected={field.value}
              dateFormat={DateFormat.Long}
            />
          )}
        />

        <button onClick={() => console.log(getValues("start"))}>get start value</button>
        <Controller
          control={control}
          name='end'
          rules={{ required: true }}
          render={({ field }) => (
            <DatePicker
              disabled={!getValues("start")}
              startDate={new Date(getValues("start"))}
              minDate={new Date(getValues("start"))}
              showTimeSelect
              placeholderText='End Date'
              onChange={(date) => field.onChange(date)}
              selected={field.value}
              dateFormat={DateFormat.Long}
            />
          )}
        />

        <input disabled={!account || !isValid} type="submit" />
      </form>
    </div>
  )
}
