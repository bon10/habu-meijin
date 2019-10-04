import errorHandler from "errorhandler";
import { ApolloServer } from "apollo-server-express";
import app from "./app";
import gateway from "./graphql/gateway";


/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
const server = new ApolloServer({
  gateway,
  subscriptions: false
});
server.applyMiddleware({ app });

app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});

export default server;

