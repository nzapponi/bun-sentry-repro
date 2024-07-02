import "./sentry";

import express from "express";
import { createServer } from "node:http";
import { PORT } from "./const";
import config from "./config";

function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

const app = express();
const server = createServer(app);
const port = normalizePort(PORT);

server.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

config(app);
