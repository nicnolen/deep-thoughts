import React from 'react';
import {
  ApolloProvider, // React component that provides data to other components
  ApolloClient, // Constructor function that helps initialize the GraphQL API server connection
  InMemoryCache, // Enables Apollo Client to cache API response data
  createHttpLink, // Control how Apollo Client makes a request
} from '@apollo/client';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';

// Establish link to the GraphQL server
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Initiate the ApolloClient instance and create connection to the API endpoint
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(), // initiate a new cache
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className='flex-column justify-flex-start min-100-vh'>
        <Header />
        <div className='container'>
          <Home />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}
export default App;
