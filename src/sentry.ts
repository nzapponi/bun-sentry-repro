import * as Sentry from "@sentry/bun";
import data from "../package.json";
import { SENTRY_DSN, SENTRY_ENVIRONMENT } from "./const";

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: SENTRY_ENVIRONMENT,
  release: data.version,
});
