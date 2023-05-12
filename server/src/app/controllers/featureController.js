import asyncHandler from "express-async-handler";
import YoutubeMovie from "../models/YoutubeMovie.js";
import UserModel from "../models/User.js";

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

const favouriteMovie = asyncHandler(async (req, res) => {
  const { email, idMovie } = req.body;
  const user = await UserModel.findOne({ email: email });

  if (!user) {
    res.statusCode = 401;
    throw Error("Không tìm thấy tài khoản " + email);
  }

  const checked = user.favouriteMovie.includes(idMovie);

  if (checked) {
    res.statusCode = 402;
    throw Error("Phim đã có trong danh sách yêu thích của bạn");
  }

  user.favouriteMovie = [...user.favouriteMovie, idMovie];
  user.save();

  res.status(200).json({
    status: "ok",
    message: "Add favouriteMovie success",
    data: user,
  });
});

const getFavourite = asyncHandler(async (req, res) => {
  const email = req.params.email;
  const favourite = await UserModel.find({ email: email }).populate(
    "favouriteMovie"
  );

  if(!favourite){
    res.statusCode = 401;
    throw Error("Tài khoản "+email+" không tồn tại")
  }
  res.status(200).json({
    status: "ok",
    message: "Get data favourite success",
    data: favourite
  })
});

export { searchBox, paginationPage, favouriteMovie, getFavourite };
