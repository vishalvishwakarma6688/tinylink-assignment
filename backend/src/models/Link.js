import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    totalClicks: {
      type: Number,
      default: 0,
    },
    lastClicked: {
      type: Date,
      default: null,
    }
  },
  { timestamps: true }
);

export const Link = mongoose.model("Link", linkSchema);
