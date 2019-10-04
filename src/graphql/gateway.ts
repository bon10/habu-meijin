import { ApolloGateway } from "@apollo/gateway";

// Apollo Federated Gateway
const gateway = new ApolloGateway({
  serviceList: [
    { name: "tasks", url: "http://localhost:4000/graphql" },
    // List of federation-capable GraphQL endpoints...
  ]
});

export default gateway;
