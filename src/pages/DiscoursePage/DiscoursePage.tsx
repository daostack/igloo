import { AsyncStatus, useAsync } from "../../hooks/useAsync";
import { getCategories } from "./api";
import "./index.scss";

export default function DiscoursePage() {
  const { status, value, error } = useAsync(getCategories);

  if (error) {
    console.error(error);
  }

  return (
    <div className="discourse-page">
      {status !== AsyncStatus.Success && <span>data status: {status}</span>}
      {value?.categories.map(category => <span key={category.id}>{category.name}</span>)}
    </div>
  )
}
