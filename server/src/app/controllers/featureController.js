import asyncHandler from "express-async-handler";
import YoutubeMovie from "../models/YoutubeMovie.js";

const searchBox = asyncHandler(async (req, res) => {
  let key = req.query.q;
  if (!key || key === "") {
    res.status(402).json({ data: null, message: "Query is not found" });
  }
  
  // let searchName = {};
  // searchName.name = new RegExp(key, "i");

  let data = await YoutubeMovie.find({
    $and: [{ $text: { $search: key } }],
  });
  res.status(200).json({
    status: "ok",
    data: data,
  });
});

const paginationPage = asyncHandler(async (req, res) => {
  let page = req.query.page;

  const PAGE_SIZE = 16;

  if (page) {
    page = parseInt(page);
    const skip = (page - 1) * PAGE_SIZE;
    const data = await YoutubeMovie.find({}).skip(skip).limit(PAGE_SIZE);
    res.status(200).json({
      status: "ok",
      data: data,
    });
  } else {
    const data = await YoutubeMovie.find({});
    res.status(200).json({
      status: "ok",
      data: data,
    });
  }
});

export { searchBox,paginationPage };
