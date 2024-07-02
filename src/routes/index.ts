import express, { RequestHandler } from "express";

const router = express.Router();

const myTestMiddleware: RequestHandler = (_req, _res, next) => {
  console.log("Hello middleware!");
  next();
};

router.use(myTestMiddleware);

router.get("/v1/healthcheck", (_req, res, next) => {
  try {
    console.log("Handling route");
    res.json({
      hello: "world"
    });
  } catch (err) {
    next(err);
  }
});

export default router;
