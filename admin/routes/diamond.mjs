import { Router } from "express";
import { Diamond } from "../constants/index.mjs";

const router = Router();

router.get("/diamond", (req, res) => {
  // res.send(blogsData);
  res.send(Diamond);
});

export default router;
