import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import Transactions from "./pages/Transactions";
import OverviewPage from "./pages/OverviewPage";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Transactions} />
          <Route path="/overview" exact component={OverviewPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
