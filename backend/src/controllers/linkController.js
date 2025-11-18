import { Link } from "../models/Link.js";
import { isValidUrl } from "../utils/validateUrl.js";
import { generateCode } from "../utils/generateCode.js";

export const createLink = async (req, res) => {
  try {
    const { url, code } = req.body;
    if (!url) {
      return res.status(400).json({ message: "URL is required" });
    }
    if (!isValidUrl(url)) {
      return res.status(400).json({ message: "Invalid URL format" });
    }
    const finalCode = generateCode(code);
    const existing = await Link.findOne({ code: finalCode });
    if (existing) {
      return res.status(409).json({ message: "Short code already exists" });
    }
    const newLink = await Link.create({
      url,
      code: finalCode,
    });
    return res.status(201).json({
      message: "Short link created successfully",
      link: newLink,
    });
  } catch (err) {
    console.error("Error creating link:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


export const getAllLinks = async (req, res) => {
  try {
    const links = await Link.find().sort({ createdAt: -1 });
    return res.status(200).json(links);
  } catch (err) {
    console.error("Error fetching links:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


export const getLink = async (req, res) => {
  try {
    const { code } = req.params;
    const link = await Link.findOne({ code });
    if (!link) {
      return res.status(404).json({ message: "Link not found" });
    }
    return res.status(200).json(link);
  } catch (err) {
    console.error("Error fetching link:", err);
    return res.status(500).json({ message: "Server error" });
  }
};


export const deleteLink = async (req, res) => {
  try {
    const { code } = req.params;
    const deleted = await Link.findOneAndDelete({ code });
    if (!deleted) {
      return res.status(404).json({ message: "Link not found" });
    }
    return res.status(200).json({ message: "Link deleted successfully" });
  } catch (err) {
    console.error("Error deleting link:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
