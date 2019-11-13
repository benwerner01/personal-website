import React from "react";

import "./App.scss";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// Layout
import Header from "./components/layout/Header";
// Pages
import HomePage from "./pages/HomePage";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/blog" component={Blog} />
          <Route path="/contact" component={Contact} />
          <Route render={() => <Redirect to={{ pathname: "/" }} />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
