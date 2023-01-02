import "./index.scss";
import { stepsMap } from "@igloo/steps";
import { useState } from "react";

export default function TestPage() {
  const selectedStep = useState<string>();

  return (
    <div className="error-page">
      <select>
        {Array.from(stepsMap.keys()).map((id) => {
          return <option key={id}>{id}</option>;
        })}
      </select>
    </div>
  );
}
