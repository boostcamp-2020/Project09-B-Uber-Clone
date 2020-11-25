import { ApolloClient, NormalizedCacheObject, InMemoryCache, split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

const httpLink = new HttpLink({
  uri: `http://${process.env.REACT_APP_SERVER_HOST}/graphql`,
});

const wsLink = new WebSocketLink({
  uri: `ws://${process.env.REACT_APP_SERVER_HOST}/graphql`,
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
  connectToDevTools: true,
  headers: {
    authorization: window.localStorage.getItem('token') || '',
  },
});

export default client;
