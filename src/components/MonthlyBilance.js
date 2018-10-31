import React, { Component } from "react";

import {
  CentText,
  CentTableDiv,
  RedTd,
  GreenTd,
  BlueTd
} from "../components/shared/StyledComp";

class MonthlyBilance extends Component {
  state = {
    year: 2018,
    month: 10
  };

  componentDidMount() {
    this.setState({
      year: new Date().getFullYear(),
      month: new Date().getMonth()
    });
  }

  getIncomeSum = () => {
    let transValues = this.props.transactions
      .filter(trans => trans.type === "income")
      .filter(trans => {
        let transDate = new Date();
        transDate.setTime(trans.created);
        return (
          transDate.getMonth() === this.state.month &&
          transDate.getFullYear() === this.state.year
        );
      })
      .map(trans => trans.value);
    const sum = transValues.reduce((prev, next) => prev + next, 0);
    return sum;
  };

  getExpenseSum = () => {
    let transValues = this.props.transactions
      .filter(trans => trans.type === "expense")
      .filter(trans => {
        let transDate = new Date();
        transDate.setTime(trans.created);
        return (
          transDate.getMonth() === this.state.month &&
          transDate.getFullYear() === this.state.year
        );
      })
      .map(trans => trans.value);
    const sum = transValues.reduce((prev, next) => prev + next, 0);
    return sum;
  };

  getSum = () => {
    return this.getIncomeSum() - this.getExpenseSum();
  };

  hangleInputChange = event => {
    if (event.target.id === "month") {
      const newMonth = event.target.value - 1;
      this.setState({ month: newMonth });
    } else {
      const newYear = Number(event.target.value);
      this.setState({ year: newYear });
    }
  };

  render() {
    return (
      <CentText>
        <h2>Monthly Bilance</h2>
        <div className="row">
          <div className="col-md-4" />
          <div className="col-md-4">
            <form>
              Month:{" "}
              <input
                className="form-control"
                type="number"
                id="month"
                value={this.state.month + 1}
                onChange={this.hangleInputChange}
                max={new Date().getMonth() + 1}
              />
              Year:{" "}
              <input
                className="form-control"
                type="number"
                id="year"
                value={this.state.year}
                onChange={this.hangleInputChange}
                max={new Date().getFullYear()}
              />
            </form>
          </div>
        </div>
        <br />
        <CentTableDiv>
          <table className="table table-striped">
            <tbody>
              <tr>
                <th>Incomes</th>
                <th>Expenses</th>
                <th>Total</th>
              </tr>
              <tr>
                <GreenTd>{this.getIncomeSum()}</GreenTd>
                <RedTd>{this.getExpenseSum()}</RedTd>
                <BlueTd>{this.getSum()}</BlueTd>
              </tr>
            </tbody>
          </table>
        </CentTableDiv>
      </CentText>
    );
  }
}

export default MonthlyBilance;
