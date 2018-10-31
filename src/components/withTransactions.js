import React, { Component } from "react";
import axios from "../utils/axios";

const withTransactions = WrappedComponent => {
  class Wrapper extends Component {
    state = {
      transactions: []
    };

    componentDidMount() {
      axios.get("/transactions").then(response => {
        this.refreshData(response);
      });
    }

    refreshData = response => {
      this.setState({ transactions: response.data });
    };

    addIncome = newTrans => {
      newTrans.type = "income";
      this.addTransaction(newTrans);
    };

    addExpense = newTrans => {
      newTrans.type = "expense";
      this.addTransaction(newTrans);
    };

    addTransaction = newTrans => {
      if (newTrans.value === 0 || newTrans.name === "") {
        return;
      }
      let transWithDate = { ...newTrans };
      transWithDate.created = new Date().getTime();
      axios.post("/transactions", transWithDate).then(resp => {
        axios.get("/transactions").then(response => {
          this.refreshData(response);
        });
      });
    };

    deleteTransaction = id => {
      axios.delete(`/transactions/${id}`).then(resp => {
        axios.get("/transactions").then(response => {
          this.refreshData(response);
        });
      });
    };

    render() {
      return (
        <WrappedComponent
          {...this.state}
          {...this.props}
          addIncome={this.addIncome}
          addExpense={this.addExpense}
          deleteTransaction={this.deleteTransaction}
        />
      );
    }
  }

  return Wrapper;
};

export default withTransactions;
