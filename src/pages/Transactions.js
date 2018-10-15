import React, { Component } from "react";
import { Link } from "react-router-dom";

import data from "../data.json";
import Transaction from "../components/Transaction";

import Button from "../components/shared/Button";

class Transactions extends Component {
  state = {
    transactions: [],
    unFilteredTransactions: []
  };

  // is called after the compoment is rendered
  componentDidMount() {
    this.setState({
      transactions: data,
      unFilteredTransactions: data
    });
  }

  addTransaction = () => {
    console.log("function");
    var newTransaction = {
      name: "Moje",
      value: 10,
      type: "income"
    };
    this.setState(
      prevState => ({
        transactions: [
          // spread operator
          ...prevState.transactions,
          newTransaction
        ],
        unFilteredTransactions: [
          ...prevState.unFilteredTransactions,
          newTransaction
        ]
      }),
      () => console.log("finished")
    );
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

  render() {
    return (
      <div>
        <header>
          <h1>basic page for Wallet app</h1>
          <Link to="/overview">To overview</Link>
          <br />
          <form>
            <input type="text" />
            <br />
            <input type="number" />
            <br />
            <select>
              <option>Income</option>
              <br />
              <option>Expense</option>
            </select>
          </form>
          <Button onClick={this.addTransaction}>Add</Button>
          <Button onClick={() => this.filterType("income")}>Incoming</Button>
          <Button onClick={() => this.filterType("expense")}>Outgoing</Button>
          <Button onClick={this.showAll}>Show All</Button>
        </header>

        <table>
          <tbody>
            {this.state.transactions.map(({ name, value, type, id }) => (
              <Transaction key={id} name={name} value={value} type={type} />
            ))}
            {/* <Transaction key="hola" name="asdf" value={100} type="income"/> */}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Transactions;
