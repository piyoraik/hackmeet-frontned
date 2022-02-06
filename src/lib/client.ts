import {
  ApolloClient,
  ApolloLink,
  concat,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND || "http://localhost:9000";

// const httpLink = createHttpLink({
//   uri: "http://localhost:9000/graphql",
// });

// const authMiddleware = new ApolloLink((operation, forward) => {
//   // add the authorization to the headers
//   const token = localStorage.getItem("token");
//   operation.setContext(({ headers = {} }) => ({
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   }));

//   return forward(operation);
// });

// const token = localStorage.getItem("appSession");
const httpLink = createHttpLink({
  uri: `${BACKEND}/graphql`,
  // headers: {
  //   authorization: token
  //     ? `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`
  //     : null,
  // },
});

export const client = new ApolloClient({
  uri: `${BACKEND}/graphql`,
  cache: new InMemoryCache(),
});
