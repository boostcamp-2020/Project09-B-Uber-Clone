import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './utils/apolloClient';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div>hello world</div>
    </ApolloProvider>
  );
};

export default App;
