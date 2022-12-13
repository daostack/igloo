import { t } from "i18next";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreatePostPayload } from "../../../../interfaces/discourse";
import { createPost } from "../../api";
import "./index.scss";

export default function CreatePost() {
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm<CreatePostPayload>({ mode: "onBlur" });

  const create: SubmitHandler<CreatePostPayload> = useCallback(async data => {
    console.log(data);
    return await createPost(data);
  }, [])

  return (
    <div className="create-post">
      <form onSubmit={handleSubmit(create)} className="create-post__form">
        <input {...register("title", { required: true })} placeholder="Title" />
        {errors.title && <span>{t("Shared.required")}</span>}
        <textarea {...register("raw", { required: true })} placeholder="Post content" />
        {errors.raw && <span>{t("Shared.required")}</span>}
        <input disabled={!isValid} type="submit" value="Create" />
      </form>
    </div>
  )
}
