import React from "react";
import withTransactions from "../components/withTransactions";
import { Button } from "reactstrap";

const OverviewPage = props => {
  return (
    <div>
      <h1>Overview Page</h1>
      <br />
      <Button onClick={() => props.history.push("/")}>Back</Button>
    </div>
  );
};

export default withTransactions(OverviewPage);
