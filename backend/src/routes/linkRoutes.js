import express from "express";
import { createLink, deleteLink, getAllLinks, getLink } from "../controllers/linkController.js";

const router = express.Router();

router.post("/", createLink);
router.get("/", getAllLinks);
router.get("/:code", getLink);
router.delete("/:code", deleteLink);

export default router;
