import React from "react";

const MultiStep = ({ stepCount, stepIndex, prev }) => {
  const Step = ({ count }) => {
    return (
      <div className="multiInner">
        <div className="multiInner__left ">
          <div
            className="multiInner__left__circle"
            style={{
              backgroundColor:
                count < stepIndex || prev
                  ? "green"
                  : count == stepIndex || prev
                    ? "orange"
                    : prev ? "orange"
                  : null,
            }}
          >
            {count < stepIndex || prev ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
              </svg>
            ) : (
              `${count + 1}`
            )}
          </div>
          <div className="">
            {count == stepCount ? "Preview" : ` Step ${count + 1}`}
          </div>
        </div>
        <div className="multiInner__right">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#1C1C1C"
            width="15"
            height="15"
            viewBox="0 0 20 20"
            aria-labelledby="icon-svg-title- icon-svg-desc-"
            role="img"
            class="sc-rbbb40-0 jKmKoK"
          >
            <title>chevron-right</title>
            <path d="M6.98 15.94c-0.3-0.28-0.3-0.76 0-1.060l4.46-4.46-4.46-4.48c-0.3-0.28-0.3-0.76 0-1.060s0.76-0.28 1.060 0l5 5c0.28 0.3 0.28 0.78 0 1.060l-5 5c-0.3 0.3-0.78 0.3-1.060 0z"></path>
          </svg>
        </div>
      </div>
    );
  };
  const timesToRender = () => {
    let arrCount = [];
    for (let i = 0; i <= stepCount; i++) {
      arrCount.push(i);
    }
    return arrCount;
  };
  return (
    <div className="multiStep">
      {timesToRender().map((count) => {
        return <Step count={count} />;
      })}
      {/* <div className="prevStep">prev</div> */}
    </div>
  );
};

export default MultiStep;
