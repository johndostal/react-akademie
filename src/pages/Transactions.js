import React, { Component } from "react";
import styled from "styled-components";
import { Button } from "reactstrap";

import Transaction from "../components/Transaction";
import withTransactions from "../components/withTransactions";

const CentText = styled.div`
  text-align: center;
`;

const CentTableDiv = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 80%;
`;

class Transactions extends Component {
  state = {
    newTransaction: {
      name: "",
      value: 0,
      type: ""
    },
    editMode: false
  };

  componentDidMount() {}

  editTransaction = id => {
    this.setState({ editMode: true });
    this.props.setEditedTransaction(id);
  };

  componentDidUpdate() {
    if (this.state.editMode === true) {
      this.setState({ newTransaction: this.props.editedTransaction });
    }
  }

  addIncome = event => {
    event.preventDefault();
    this.props.addIncome(this.state.newTransaction);
    this.setState({
      newTransaction: {
        name: "",
        value: 0,
        type: ""
      }
    });
  };

  addExpense = event => {
    event.preventDefault();
    this.props.addExpense(this.state.newTransaction);
  };

  showAll = () => {
    this.setState(prevState => ({
      transactions: prevState.unFilteredTransactions.slice()
    }));
  };

  hangleInputChange = event => {
    const newTransactionCopy = { ...this.state.newTransaction };
    newTransactionCopy[event.target.id] = event.target.value;
    console.log(newTransactionCopy);
    this.setState({ newTransaction: newTransactionCopy });
  };

  render() {
    const {
      newTransaction: { name, value }
    } = this.state;
    return (
      <div>
        <CentText>
          <h1>My Wallet</h1>
          <br />
          <h2>Add Transaction</h2>
          {/* <Link to="/overview">To overview</Link> */}
          <br />
        </CentText>
        <div className="row">
          <div className="col-md-3" />
          <div className="col-md-6">
            <form>
              <input
                className="form-control"
                type="text"
                id="name"
                value={name}
                onChange={this.hangleInputChange}
              />
              <br />
              <input
                className="form-control"
                type="number"
                id="value"
                value={value}
                onChange={this.hangleInputChange}
              />
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
                onClick={() => this.props.changeFilterCategory("income")}
              >
                Incoming
              </Button>
              <Button
                color="danger"
                onClick={() => this.props.changeFilterCategory("expense")}
              >
                Outgoing
              </Button>
              <button
                className="btn btn-info"
                onClick={() => this.props.changeFilterCategory("all")}
              >
                Show All
              </button>
            </CentText>
            <br />
            <br />
            <table className="table table-striped">
              <tbody>
                {this.props
                  .getFilteredTransactions()
                  .map(({ name, value, type, id }) => {
                    return (
                      <Transaction
                        key={id}
                        id={id}
                        name={name}
                        value={value}
                        type={type}
                        deleteMethod={this.props.deleteTransaction}
                        editMethod={this.editTransaction}
                      />
                    );
                  })}
              </tbody>
            </table>
          </div>
        </CentTableDiv>
      </div>
    );
  }
}

export default withTransactions(Transactions);
