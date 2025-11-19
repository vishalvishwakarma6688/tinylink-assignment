import { Link } from "../models/Link.js";

export const getAnalytics = async (req, res) => {
  try {
    const links = await Link.find();

    const totalLinks = links.length;
    const totalClicks = links.reduce((sum, link) => sum + link.totalClicks, 0);
    const daily = {};
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      const key = date.toISOString().split("T")[0];
      daily[key] = 0;
    }

    links.forEach((link) => {
      if (link.lastClicked) {
        const date = link.lastClicked.toISOString().split("T")[0];
        if (daily[date] !== undefined) {
          daily[date] += 1;
        }
      }
    });
    const topLinks = links
      .sort((a, b) => b.totalClicks - a.totalClicks)
      .slice(0, 5);

    res.json({
      totalLinks,
      totalClicks,
      dailyClicks: daily,
      topLinks,
    });
  } catch (err) {
    console.error("Analytics error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
