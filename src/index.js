import express from 'express';
import graphqlHTTP from 'express-graphql';

import { resolvers }  from './graphql/resolvers.js'
import schema from './graphql/schema.js';
import { api } from '../config.js';
import { connect } from './database';





const PORT = api.port;
const app = express();

app.get('/', (req, res) =>{
    res.json({
        message: 'Hello World'
    })
  });

  app.use('/gra', graphqlHTTP({
    graphiql: true,
    schema: schema,
    rootValue: resolvers,
    customFormatErrorFn(err) {
        if (!err.originalError) {
          return err;
        }
        const data = err.originalError.data;
        const message = err.message || 'An error occurred.';
        const code = err.originalError.code || 500;
        return { message: message, status: code, data: data };
      }
    })
  );

  connect();


  app.listen(PORT, () => {
    console.log(`App running ${PORT}`);
})