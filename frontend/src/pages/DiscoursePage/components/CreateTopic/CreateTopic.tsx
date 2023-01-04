import { t } from "i18next";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateTopicPayload } from "../../../../interfaces/discourse";
import { createTopic } from "../../api";
import { CONTENT_MIN_LENGTH, TITLE_MIN_LENGTH } from "./constants";
import "./index.scss";

export default function CreateTopic() {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<CreateTopicPayload>({ mode: "onBlur" });

  const create: SubmitHandler<CreateTopicPayload> = useCallback(async data => {
    try {
      const res = await createTopic(data);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }, [])

  return (
    <div className="create-topic">
      <h2>Create a Topic</h2>
      <form onSubmit={handleSubmit(create)} className="create-topic__form">
        <input {...register("title", { required: true, minLength: TITLE_MIN_LENGTH })} placeholder="Title" />
        {errors.title?.type === "required" && <span>{t("Shared.required")}</span>}
        {errors.title?.type === "minLength" && <span>Title must be at least {TITLE_MIN_LENGTH} characters</span>}
        <textarea {...register("raw", { required: true, minLength: CONTENT_MIN_LENGTH })} placeholder="Post content" />
        {errors.raw?.type === "required" && <span>{t("Shared.required")}</span>}
        {errors.raw?.type === "minLength" && <span>Post must be at least {CONTENT_MIN_LENGTH} characters</span>}
        <input disabled={!isValid} type="submit" value="Create" />
      </form>
    </div>
  )
}
