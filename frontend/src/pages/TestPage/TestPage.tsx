import "./index.scss";
import { stepsMap } from "@igloo/core";
import { useState } from "react";
import React from "react";

export default function TestPage() {
  const [selectedStepId, setSelectedStepId] =  useState<string>('DISCOURSE');
  const step = stepsMap.get(selectedStepId);

  return (
    <div className="error-page">
      <select>
        {Array.from(stepsMap.keys()).map((id) => {
          return <option key={id}>{id}</option>;
        })}
      </select>
      {step && step.component ? React.createElement(step.component, {
          params: { discussionId: "20", duration: 10, createDate: 10 },
        }): <>not found</>}
    </div>
  );
}
