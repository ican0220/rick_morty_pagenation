import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',  // Rick and Morty GraphQL API
  cache: new InMemoryCache(),
});

export default client;