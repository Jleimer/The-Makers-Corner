import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import Blueprints from './pages/Blueprints';
import Course from './pages/Courses';
import Dashboard from './pages/Dashboard';
import OrderHistory from './pages/OrderHistory';
// import Detail from './pages/Detail';
// - Check to see if Blueprints & classes stay separate or if they turn into products??
import Login from './pages/Login';
import MessageBoard from './pages/MessageBoard';
import Signup from './pages/Signup';

// IMPORT COMPONENTS
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { Provider } from 'react-redux';
import store from './utils/store';
import './index.css';
import Detail from './pages/Detail';
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
        <Provider store={store}>
          <Navigation/>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/blueprints" component={Blueprints}/>
              <Route exact path="/courses" component={Course}/>
              <Route exact path="/products:id" component={Detail}/>
              <Route exact path="/dashboard" component={Dashboard}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/orderhistory" component={OrderHistory}/>
              <Route exact path="/signup" component={Signup}/>
              <Route exact path="/messageboard" component={MessageBoard}/>
              <Route component={NoMatch}/>
            </Switch>
          </div>
          </Provider>
          <footer>
            <Footer/>
          </footer>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;