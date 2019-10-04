import express from "express";

const router = express.Router();

/**
 *  app routes.
 */
router.get("/", (req: any, res: { send: (arg0: string) => void }) => {
  return res.send("Received a GET HTTP method");
});

export default router;
