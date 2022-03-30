//TODO: COMPONENT THAT HOUSES ALL OTHER COMPONENTS 
//! Import Dependencies
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ApolloProvider, //? React component that provides data to other components
  ApolloClient, //? Constructor function that helps initialize the GraphQL API server connection
  InMemoryCache, //? Enables Apollo Client to cache API response data
  createHttpLink, //? Control how Apollo Client makes a request
} from '@apollo/client';

import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Home from './pages/Home';

//! Establish link to the GraphQL server
const httpLink = createHttpLink({
  uri: '/graphql',
});

//! Initiate the ApolloClient instance and create connection to the API endpoint
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(), // initiate a new cache
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router> {/* makes child components aware of client-side routing */}
        <div className='flex-column justify-flex-start min-100-vh'>
          <Header />
          <div className='container'>
            <Switch> {/* sets the catch-all route */}
              <Route exact path='/' component={Home} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/profile' component={Profile} />
              <Route exact path='/thought' component={SingleThought} />

              <Route component={NoMatch} /> {/* if route doesnt match any other path, users will see a 404 error */}
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}
export default App;
