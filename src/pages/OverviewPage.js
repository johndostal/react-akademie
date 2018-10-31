import React, { Component } from "react";
import { Button } from "reactstrap";
import styled from "styled-components";

import withTransactions from "../components/withTransactions";
import { CentText } from "../components/shared/StyledComp";
import DailyBilance from "../components/DailyBilance";
import MontlyBilance from "../components/MonthlyBilance";
import TotalBilance from "../components/TotalBilance";

export const TransactionsBtn = styled(Button)`
  position: absolute;
  top: 0;
  left: 0;
`;

class OverviewPage extends Component {
  state = {
    periodToShow: "day"
  };

  handlePeriodChange = period => {
    this.setState({ periodToShow: period });
  };

  render() {
    return (
      <div>
        <CentText>
          <h1>Overview Page</h1>
          <TransactionsBtn
            color="primary"
            onClick={() => this.props.history.push("/")}
          >
            Back
          </TransactionsBtn>
          <br />
          <Button
            color="primary"
            onClick={() => this.handlePeriodChange("day")}
          >
            Day
          </Button>
          <Button
            color="secondary"
            onClick={() => this.handlePeriodChange("month")}
          >
            Month
          </Button>
          <Button
            color="primary"
            onClick={() => this.handlePeriodChange("all")}
          >
            All
          </Button>
        </CentText>

        <br />
        {this.state.periodToShow === "all" && (
          <TotalBilance transactions={this.props.transactions} />
        )}
        {this.state.periodToShow === "month" && (
          <MontlyBilance transactions={this.props.transactions} />
        )}
        {this.state.periodToShow === "day" && (
          <DailyBilance transactions={this.props.transactions} />
        )}
      </div>
    );
  }
}

export default withTransactions(OverviewPage);
