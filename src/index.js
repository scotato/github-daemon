const {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  gql,
} = require("@apollo/client");

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: "https://api.github.com/graphql" }),
});

const GET_VIEWER = gql`
  query {
    viewer {
      login
    }
  }
`;

const viewer = client.query({
  query: GET_VIEWER,
  fetchPolicy: "no-cache",
  errorPolicy: "all",
});

console.log(viewer);
