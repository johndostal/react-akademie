import React, { Component } from "react";
import { Button } from "reactstrap";
import styled from "styled-components";

import Transaction from "../components/Transaction";
import withTransactions from "../components/withTransactions";
import { CentText, CentTableDiv } from "../components/shared/StyledComp";

export const OverViewBtn = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
`;

class Transactions extends Component {
  state = {
    newTransaction: {
      name: "",
      value: 0,
      type: ""
    },
    filterCategory: "all"
  };

  componentDidMount() {}

  clearInput = () => {
    this.setState({
      newTransaction: {
        name: "",
        value: 0,
        type: ""
      }
    });
  };

  addIncome = event => {
    event.preventDefault();
    this.props.addIncome(this.state.newTransaction);
    this.clearInput();
  };

  addExpense = event => {
    event.preventDefault();
    this.props.addExpense(this.state.newTransaction);
    this.clearInput();
  };

  hangleInputChange = event => {
    const newTransactionCopy = { ...this.state.newTransaction };
    if (event.target.id === "value") {
      newTransactionCopy[event.target.id] = Number(event.target.value);
    } else {
      newTransactionCopy[event.target.id] = event.target.value;
    }
    this.setState({ newTransaction: newTransactionCopy });
  };

  getFilteredTransactions = () => {
    const { filterCategory } = this.state;
    const { transactions } = this.props;
    switch (filterCategory) {
      case "all":
      default:
        return transactions.sort((trA, trB) => trB.created - trA.created);
      case "income":
        return transactions
          .filter(transaction => transaction.type === "income")
          .sort((trA, trB) => trB.created - trA.created);
      case "expense":
        return transactions
          .filter(transaction => transaction.type === "expense")
          .sort((trA, trB) => trB.created - trA.created);
    }
  };

  changeFilterCategory = newfilterCategory => {
    this.setState({ filterCategory: newfilterCategory });
  };

  render() {
    const {
      newTransaction: { name, value }
    } = this.state;
    return (
      <div>
        <CentText>
          <h1>My Wallet</h1>
          <OverViewBtn
            color="primary"
            onClick={() => this.props.history.push("/overview")}
          >
            Overview
          </OverViewBtn>
          <br />
          <h2>Add Transaction</h2>
          {/* <Link to="/overview">To overview</Link> */}
          <br />
        </CentText>
        <div className="row">
          <div className="col-md-3" />
          <div className="col-md-6">
            <form>
              <CentText>
                Name:{" "}
                <input
                  className="form-control"
                  type="text"
                  id="name"
                  value={name}
                  onChange={this.hangleInputChange}
                />
                Amount:{" "}
                <input
                  className="form-control"
                  type="number"
                  id="value"
                  value={value}
                  onChange={this.hangleInputChange}
                />
              </CentText>
              <br />
              <CentText>
                Save as{" "}
                <Button color="success" onClick={this.addIncome}>
                  Income
                </Button>
                <Button color="danger" onClick={this.addExpense}>
                  Expense
                </Button>
              </CentText>
            </form>
          </div>
        </div>

        <br />
        <br />

        <CentTableDiv className="row">
          <div className="col-md-12">
            <CentText>
              <Button
                color="success"
                onClick={() => this.changeFilterCategory("income")}
              >
                Incoming
              </Button>
              <Button
                color="danger"
                onClick={() => this.changeFilterCategory("expense")}
              >
                Outgoing
              </Button>
              <button
                className="btn btn-info"
                onClick={() => this.changeFilterCategory("all")}
              >
                Show All
              </button>
            </CentText>
            <br />
            <br />
            <table className="table table-striped">
              <tbody>
                {this.getFilteredTransactions().map(
                  ({ created, name, value, type, id }) => {
                    return (
                      <Transaction
                        key={id}
                        id={id}
                        created={created}
                        name={name}
                        value={value}
                        type={type}
                        deleteMethod={this.props.deleteTransaction}
                      />
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </CentTableDiv>
      </div>
    );
  }
}

export default withTransactions(Transactions);
