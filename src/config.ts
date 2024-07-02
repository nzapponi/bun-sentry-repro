import * as Sentry from "@sentry/bun";
import compression from "compression";
import cookieParser from "cookie-parser";
import express, { Express, NextFunction, Request, Response } from "express";
import createError, { HttpError } from "http-errors";
import logger from "morgan";
import apiRouter from "./routes";

const config = (app: Express) => {
  // Express Configuration goes here

  app.use(compression());
  app.use(
    logger("dev", {
      stream: {
        write: (msg) => console.log(msg),
      },
    }),
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  // reset user
  app.use((_req, _res, next) => {
    Sentry.setUser(null);
    next();
  });

  app.use("/", apiRouter);

  // catch 404 and forward to error handler
  app.use((_req, _res, next) => {
    const err = new createError.NotFound();
    next(err);
  });

  Sentry.setupExpressErrorHandler(app);

  // error handler
  app.use(
    (err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || 500;
      const payload = {
        message: err.message,
        status,
      };
      if (status === 500) {
        Sentry.captureException(err);
      }

      res.status(status).json({
        error: payload,
      });
    },
  );
};

export default config;
