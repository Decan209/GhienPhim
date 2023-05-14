import express from 'express';
import * as youtubeMovieController from '../app/controllers/youtubeMovieController.js';
import viewCount from '../middlewares/viewCount.js';
import filterProducts from '../middlewares/filterProducts.js';

const youtubeMovieRouter =  express.Router();

// youtubeMovieRouter.get('/hotMovies', youtubeMovieController.getHotMovies);
youtubeMovieRouter.get('/hotMovies', youtubeMovieController.getHotMovies);
youtubeMovieRouter.get('/newSingleMoive', youtubeMovieController.getNewSingleMovie);
youtubeMovieRouter.get('/newSeriesMoive', youtubeMovieController.getNewSeriesMovie);
youtubeMovieRouter.put('/{id}/edit', youtubeMovieController.editOneEpisode);
youtubeMovieRouter.post('/', youtubeMovieController.createMovie);
youtubeMovieRouter.get('/getOneMovie/:slug',viewCount,youtubeMovieController.getOneMovie);
youtubeMovieRouter.get('/getActionMovie',filterProducts,youtubeMovieController.getActionMovie);
youtubeMovieRouter.get('/getFilmViet',filterProducts,youtubeMovieController.getFilmViet);
youtubeMovieRouter.get('/getCartonMovie',filterProducts,youtubeMovieController.getCartonMovie);
youtubeMovieRouter.get('/getComedyMovie',filterProducts,youtubeMovieController.getComedyMovie);
youtubeMovieRouter.get('/getSingleMovie',filterProducts,youtubeMovieController.getSingleMovie);
youtubeMovieRouter.get('/getTrendingMovie',youtubeMovieController.getTrendingMovie)
youtubeMovieRouter.get('/getFilmVietLimit',youtubeMovieController.getFilmVietLimit)

export default youtubeMovieRouter;