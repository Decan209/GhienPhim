import asyncHandler from "express-async-handler";
import YoutubeMovie from "../app/models/YoutubeMovie.js";

const viewCount = asyncHandler(async (req, res, next) => {
  const slug = req.params.slug;
  const data = await YoutubeMovie.findOne({ slug: slug });
  if(!data){
        res.statusCode = 401;
        throw new Error('Unauthorized');
  }
  data.view++;
  data.save();
  next()
});

export default viewCount;
