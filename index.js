import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { createHandler } from "graphql-http/lib/use/express";
import { schema } from "./schema/index.js";
import { connect } from "./database/database.js";
import { verifyToken } from "./utils/jwt.js";

config({ path: "./config/config.env" });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(
  "/graphql",
  createHandler({
    schema,
    context: (req) => {
      return {
        sessionData: req.headers.authorization
          ? verifyToken(req.headers.authorization.split(" ")[1])
          : null,
      };
    },
  }),
);

// If you need GraphiQL, you can serve a simple HTML page here
app.get("/playground", (req, res) => {
  res.send(`<!DOCTYPE html>
<html>
  <head>
    <title>GraphiQL</title>
    <link href="https://unpkg.com/graphiql/graphiql.min.css" rel="stylesheet" />
  </head>
  <body style="margin: 0;">
    <div id="graphiql" style="height: 100vh;"></div>
    <script crossorigin src="https://unpkg.com/react/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/graphiql/graphiql.min.js"></script>
    <script>
      const fetcher = GraphiQL.makeFetcher({ url: '/graphql' });
      ReactDOM.render(
        React.createElement(GraphiQL, { fetcher: fetcher }),
        document.getElementById('graphiql'),
      );
    </script>
  </body>
</html>`);
});

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  await connect();
  console.log(`Server is running on port \${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:\${PORT}/graphql`);
  console.log(`GraphiQL Playground: http://localhost:\${PORT}/playground`);
});
