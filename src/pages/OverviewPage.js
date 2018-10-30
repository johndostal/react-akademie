import React from "react";
import { Button } from "reactstrap";
import styled from "styled-components";

import withTransactions from "../components/withTransactions";
import { CentText } from "../components/shared/StyledComp";

export const TransactionsBtn = styled(Button)`
  position: absolute;
  top: 0;
  left: 0;
`;

const OverviewPage = props => {
  return (
    <div>
      <CentText>
        <h1>Overview Page</h1>
        <TransactionsBtn
          color="primary"
          onClick={() => props.history.push("/")}
        >
          Back
        </TransactionsBtn>
      </CentText>
    </div>
  );
};

export default withTransactions(OverviewPage);
