import { stepsMap, DISCOURSE_DISCUSSION_TYPES, Step } from "@igloo/core";
import React, { useState } from "react";
import "./App.css";

function App() {
  const [selectedStepId, setSelectedStepId] = useState<string>(
    "DISCOURSE_DISCUSSION"
  );
  const step = stepsMap.get(
    selectedStepId
  ) as Step<DISCOURSE_DISCUSSION_TYPES.Params>;

  return (
    <div className="error-page">
      <select>
        {Array.from(stepsMap.keys()).map((id) => {
          return <option key={id}>{id}</option>;
        })}
      </select>
      {step === undefined ? (
        <>Not found</>
      ) : (
        React.createElement(step.component, {
          params: { discussionId: "20", duration: 10, createDate: 10 },
        })
      )}
    </div>
  );
}

export default App;
