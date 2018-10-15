import React from "react";

const OverviewPage = props => {
  return (
    <div>
      <h1>Overview Page</h1>
      <br />
      <button onClick={() => props.history.push("/")}>Back</button>
    </div>
  );
};

export default OverviewPage;
