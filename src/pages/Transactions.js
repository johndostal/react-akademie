import React, { Component } from "react";
import styled from "styled-components";
import { Button } from "reactstrap";

import Transaction from "../components/Transaction";
import axios from "../utils/axios";

const CentTableDiv = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 80%;
`;

const CentDiv = styled.div`
  margin-left: auto;
  margin-right: auto;
`;

const MyBtn = styled(Button)`
  color: black;
`;

class Transactions extends Component {
  state = {
    transactions: [],
    unFilteredTransactions: [],
    newTransaction: {
      name: "",
      value: 0,
      type: ""
    }
  };

  refreshData = response => {
    this.setState({ transactions: response.data });
    this.setState({ unFilteredTransactions: response.data });
  };

  deleteTransaction = id => {
    console.log(id);
    axios.delete(`/transactions/${id}`).then(response => {
      console.log("Transaction with id " + id + " deleted");
      axios.get("/transactions").then(response => {
        this.refreshData(response);
      });
    });
  };

  // is called after the compoment is rendered
  componentDidMount() {
    axios.get("/transactions").then(response => {
      this.setState({ transactions: response.data });
      this.setState({ unFilteredTransactions: response.data });
    });
  }

  addIncome = event => {
    event.preventDefault();
    let newTrans = this.state.newTransaction;
    newTrans.type = "income";

    axios.post("/transactions", newTrans).then(response => {
      console.log("income added");
      axios.get("/transactions").then(response => {
        this.refreshData(response);
      });
    });
  };

  addExpense = event => {
    event.preventDefault();
    let newTrans = this.state.newTransaction;
    newTrans.type = "expense";

    axios.post("/transactions", newTrans).then(response => {
      console.log("expense added");
      axios.get("/transactions").then(response => {
        this.refreshData(response);
      });
    });
  };

  filterType = type => {
    this.setState(prevState => ({
      transactions: [
        ...prevState.unFilteredTransactions
          .slice()
          .filter(transaction => transaction.type === type)
      ]
    }));
  };

  showAll = () => {
    this.setState(prevState => ({
      transactions: prevState.unFilteredTransactions.slice()
    }));
  };

  handleTypeChange = (newTrans, event) => {
    newTrans[event.target.type] = event.target.id;
  };

  hangleInputChange = event => {
    const newTransactionCopy = { ...this.state.newTransaction };
    newTransactionCopy[event.target.id] = event.target.value;
    // newTransactionCopy[event.target.type] = event.target.id; // separatni handler
    this.handleTypeChange(newTransactionCopy, event);
    this.setState({ newTransaction: newTransactionCopy });
  };

  render() {
    const {
      transactions,
      newTransaction: { name, value, type }
    } = this.state;
    return (
      <div>
        <h1>My Wallet</h1>
        <br />
        <h2>Add Transaction</h2>
        {/* <Link to="/overview">To overview</Link> */}
        <br />
        <div className="row">
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
              Save as{" "}
              <MyBtn color="success" onClick={this.addIncome}>
                Income
              </MyBtn>
              <MyBtn color="danger" onClick={this.addExpense}>
                Expense
              </MyBtn>
            </form>
          </div>
        </div>

        <br />
        <br />

        <CentTableDiv className="row">
          <div className="col-md-12">
            <CentDiv className="col-md-6" align="center">
              <MyBtn color="success" onClick={() => this.filterType("income")}>
                Incoming
              </MyBtn>
              <Button color="danger" onClick={() => this.filterType("expense")}>
                Outgoing
              </Button>
              <btn className="btn btn-info" onClick={this.showAll}>
                Show All
              </btn>
            </CentDiv>
            <br />
            <br />
            <table className="table table-striped">
              <tbody>
                {transactions.map(({ name, value, type, id }) => {
                  console.log(id);
                  return (
                    <Transaction
                      key={id}
                      id={id}
                      name={name}
                      value={value}
                      type={type}
                      deleteMethod={this.deleteTransaction}
                    />
                  );
                })}
                {/* <Transaction key="hola" name="asdf" value={100} type="income"/> */}
              </tbody>
            </table>
          </div>
        </CentTableDiv>
      </div>
    );
  }
}

export default Transactions;
