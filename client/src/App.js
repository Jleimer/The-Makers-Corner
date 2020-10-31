import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import Blueprints from './pages/Blueprints';
import Classes from './pages/Classes';
import Dashboard from './pages/Dashboard';
// import Detail from './pages/Detail';
// - Check to see if Blueprints & classes stay separate or if they turn into products??
import Login from './pages/Login';
import MessageBoard from './pages/MessageBoard';
import Signup from './pages/Signup';

// IMPORT COMPONENTS
// - Header
// - Footer

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem('id_token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
  uri: '/graphql',
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          {/* HEADER COMPONENT */}
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/blueprints" component={Blueprints}/>
              <Route exact path="/classes" component={Classes}/>
              {/* OR combine blueprints and classes into products.... '/products' */}
              {/* ... Detail page would then be '/products:id */}
              <Route exact path="/dashboard" component={Dashboard}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/signup" component={Signup}/>
              <Route exact path="/messageboard" component={MessageBoard}/>
              <Route component={NoMatch}/>
            </Switch>
          </div>
          {/* FOOTER COMPONENT */}
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;