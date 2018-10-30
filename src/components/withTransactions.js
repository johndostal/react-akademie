import React, { Component } from "react";
import axios from "../utils/axios";

const withTransactions = WrappedComponent => {
  class Wrapper extends Component {
    state = {
      transactions: [],
      filterCategory: "all",
      editedTransaction: {
        name: "",
        value: 0,
        type: ""
      }
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
      axios.post("/transactions", newTrans).then(resp => {
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

    setEditedTransaction = id => {
      axios.get(`/transactions/${id}`).then(response => {
        this.setState({ editedTransaction: response.data });
      });
    };

    getFilteredTransactions = () => {
      const { filterCategory, transactions } = this.state;
      switch (filterCategory) {
        case "all":
        default:
          return transactions;
        case "income":
          return transactions.filter(
            transaction => transaction.type === "income"
          );
        case "expense":
          return transactions.filter(
            transaction => transaction.type === "expense"
          );
      }
    };

    changeFilterCategory = newfilterCategory => {
      this.setState({ filterCategory: newfilterCategory });
    };

    render() {
      return (
        <WrappedComponent
          {...this.state}
          {...this.props}
          addIncome={this.addIncome}
          addExpense={this.addExpense}
          deleteTransaction={this.deleteTransaction}
          getFilteredTransactions={this.getFilteredTransactions}
          changeFilterCategory={this.changeFilterCategory}
          setEditedTransaction={this.setEditedTransaction}
        />
      );
    }
  }

  return Wrapper;
};

export default withTransactions;
