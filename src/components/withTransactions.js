import React, { Component } from "react";
import axios from "../utils/axios";

const withTransactions = WrappedComponent => {
  class Wrapper extends Component {
    state = {
      transactions: [],
      unfilteredTransactions: []
    };

    componentDidMount() {
      axios.get("/transactions").then(response => {
        this.setState({ transactions: response.data });
        this.setState({ unfilteredTransactions: response.data });
      });
    }

    addTransaction(newTransaction) {
      axios
        .post(`https://jsonplaceholder.typicode.com/users`, { newTransaction })
        .then(res => {});
    }

    render() {
      return <WrappedComponent {...this.state} {...this.props} />;
    }
  }

  return Wrapper;
};

export default withTransactions;
