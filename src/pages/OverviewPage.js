import React from "react";
import withTransactions from "../components/withTransactions";

const OverviewPage = props => {
  return (
    <div>
      <h1>Overview Page</h1>
      <br />
      <button onClick={() => props.history.push("/")}>Back</button>
    </div>
  );
};

export default withTransactions(OverviewPage);
