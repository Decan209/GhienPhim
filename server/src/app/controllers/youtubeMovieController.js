import asyncHandler from "express-async-handler";
import YoutubeMovie from "../models/YoutubeMovie.js";
import SeriesMovie from "../models/SeriesMovie.js";

// admin tạo phim mới
const createMovie = asyncHandler(async (req, res) => {
  let data = {
    ...req.body,
  };
  const newMovie = new YoutubeMovie(data);
  await newMovie.save();
  if (data.type === "single")
    data = {
      ...data,
      thumbnail: `https://img.youtube.com/vi/${data.videoId}/default.jpg`,
      videoSrc: `https://www.youtube.com/watch?v=${data.videoId}`,
    };
  else if (data.type === "series") {
    let episodes = [];
    for (let i = 0; i < data.episodes; i++) {
      episodes = [
        ...episodes,
        {
          episodeNumber: i + 1,
        },
      ];
    }
    let newSeriesMovie = new SeriesMovie({
      movieId: newMovie._id,
      episodes,
    });
    await newSeriesMovie.save();
  }
  res.status(201).json({
    status: "ok",
    message: "create new movie successfully!",
    data,
  });
});

// sửa + thêm một bộ phim
const editOneEpisode = asyncHandler(async (req, res) => {
  const idMovie = req.params;
});

// get các phim hot
const getHotMovies = asyncHandler(async (req, res) => {
  const data = await YoutubeMovie.find({ isHot: true });
  res.status(200).json({
    status: "ok",
    message: "get hot movies success fully",
    data,
  });
});

// get  8 phim lẻ mới nhất
const getNewSingleMovie = asyncHandler(async (req, res) => {
  const data = await YoutubeMovie.find({ type: "single" })
    .sort({ _id: -1 })
    .limit(8);
  res.status(200).json({
    status: "ok",
    message: "get new single movie successfully",
    data,
  });
});

// get 8 phim bộ mới nhất
const getNewSeriesMovie = asyncHandler(async (req, res) => {
  const data = await YoutubeMovie.find({ type: "series" })
    .sort({ _id: -1 })
    .limit(8);
  res.status(200).json({
    status: "ok",
    message: "get new series movie successfully",
    data,
  });
});
const getOneMovie = asyncHandler(async (req, res) => {
  const slug = req.params.slug;
  const data = await YoutubeMovie.find({ slug: slug });
  res.status(200).json({
    status: "ok",
    message: "Get movie detail success",
    data: data,
  });
});

const getFilmVietLimit = asyncHandler(async (req, res) => {
  const data = await YoutubeMovie.find({ country: "Viet Nam" }).limit(8);
  res.status(200).json({
    status: "ok",
    message: "Get Film Viet Limit successfully",
    data,
  });
});

const getActionMovieLimit = asyncHandler(async (req, res) => {
  const data = await YoutubeMovie.find({ category: "Hanh dong" }).limit(8);
  res.status(200).json({
    status: "ok",
    message: "Get action movie successfully",
    data,
  });
});

const getActionMovie = asyncHandler(async (req, res) => {
  let page = req.query.page;
  const filter = Object.keys(req.filter).length===0?{}:req.filter;
  const PAGE_SIZE = 8;

  if (page) {
    page = parseInt(page);
    const skip = (page - 1) * PAGE_SIZE;
    const data = await YoutubeMovie.find({ category: "Hanh dong" })
      .sort(filter)
      .skip(skip)
      .limit(PAGE_SIZE);
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

const getFilmViet = asyncHandler(async (req, res) => {
  let page = req.query.page;
  const filter = Object.keys(req.filter).length===0?{}:req.filter;

  const PAGE_SIZE = 8;

  if (page) {
    page = parseInt(page);
    const skip = (page - 1) * PAGE_SIZE;
    const data = await YoutubeMovie.find({ country: "Viet Nam" })
      .sort(filter)
      .skip(skip)
      .limit(PAGE_SIZE);
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
const getCartonMovie = asyncHandler(async (req, res) => {
  let page = req.query.page;
  const filter = Object.keys(req.filter).length===0?{}:req.filter;
  const PAGE_SIZE = 8;

  if (page) {
    page = parseInt(page);
    const skip = (page - 1) * PAGE_SIZE;
    const data = await YoutubeMovie.find({ category: "Hoat hinh" })
      .sort(filter)
      .skip(skip)
      .limit(PAGE_SIZE);
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
const getComedyMovie = asyncHandler(async (req, res) => {
  let page = req.query.page;
  const filter = Object.keys(req.filter).length===0?{}:req.filter;

  const PAGE_SIZE = 8;

  if (page) {
    page = parseInt(page);
    const skip = (page - 1) * PAGE_SIZE;
    const data = await YoutubeMovie.find({ category: "Hai" })
      .sort(filter)
      .skip(skip)
      .limit(PAGE_SIZE);
    res.status(200).json({
      status: "ok",
      data: data,
    });
  } else {
    const data = await YoutubeMovie.find({ category: "Hai" });
    res.status(200).json({
      status: "ok",
      data: data,
    });
  }
});

const getSingleMovie = asyncHandler(async (req, res) => {
  let page = req.query.page;
  const filter = Object.keys(req.filter).length===0?{}:req.filter;
  const PAGE_SIZE = 8;
  if (page) {
    page = parseInt(page);
    const skip = (page - 1) * PAGE_SIZE;
    const data = await YoutubeMovie.find({ type: "single" })
      .sort(filter)
      .skip(skip)
      .limit(PAGE_SIZE);
    res.status(200).json({
      status: "ok",
      data: data,
    });
  } else {
    const data = await YoutubeMovie.find({ type: "single" });
    res.status(200).json({
      status: "ok",
      data: data,
    });
  }
});

const getTrendingMovie = asyncHandler(async (req, res) => {
  const data = await YoutubeMovie.find().sort({ view: -1 }).limit(10);
  res.status(200).json({
    status: "ok",
    message: "Get Trendding Movie successfully",
    data,
  });
});

export {
  createMovie,
  editOneEpisode,
  getHotMovies,
  getNewSingleMovie,
  getNewSeriesMovie,
  getOneMovie,
  getActionMovie,
  getFilmViet,
  getCartonMovie,
  getComedyMovie,
  getSingleMovie,
  getTrendingMovie,
  getFilmVietLimit,
};
