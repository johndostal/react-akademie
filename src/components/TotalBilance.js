import React from "react";

import {
  CentText,
  CentTableDiv,
  RedTd,
  GreenTd,
  BlueTd
} from "../components/shared/StyledComp";

const TotalBilance = props => {
  function getIncomeSum() {
    let transValues = props.transactions
      .filter(trans => trans.type === "income")
      .map(trans => trans.value);
    const sum = transValues.reduce((prev, next) => prev + next, 0);
    return sum;
  }

  function getExpenseSum() {
    let transValues = props.transactions
      .filter(trans => trans.type === "expense")
      .map(trans => trans.value);
    const sum = transValues.reduce((prev, next) => prev + next, 0);
    return sum;
  }

  function getSum() {
    return getIncomeSum() - getExpenseSum();
  }

  return (
    <CentText>
      <h2>Total Bilance</h2>
      <CentTableDiv>
        <table className="table table-striped">
          <tbody>
            <tr>
              <th>Incomes</th>
              <th>Expenses</th>
              <th>Total</th>
            </tr>
            <tr>
              <GreenTd>{getIncomeSum()}</GreenTd>
              <RedTd>{getExpenseSum()}</RedTd>
              <BlueTd>{getSum()}</BlueTd>
            </tr>
          </tbody>
        </table>
      </CentTableDiv>
    </CentText>
  );
};

export default TotalBilance;
