import "./index.scss";
import { stepsMap } from "@igloo/core";
import { useState } from "react";
import React from "react";

export default function CoreTest() {
  const [selectedStepId, setSelectedStepId] = useState<string>('DISCOURSE');
  const step = stepsMap.get(selectedStepId);

  const params = selectedStepId === "DISCOURSE" ? { discussionId: "1", duration: 10, createDate: 10 } : { proposalId: "0xe95592bd1363f34d69521d27e3d3dc087d3a0cfdcb561cbc4c14734bb16e214d", start: "2354534" };

  return (
    <div className="error-page">
      <select onChange={(e) => setSelectedStepId(e.target.value)}>
        {Array.from(stepsMap.keys()).map((id) => {
          return <option key={id}>{id}</option>;
        })}
      </select>
      {step && step.component ? React.createElement(step.component, {
        params: params,
      }) : <>not found</>}
    </div>
  );
}
