import express from 'express';
import * as youtubeMovieController from '../app/controllers/youtubeMovieController.js';
import viewCount from '../middlewares/viewCount.js';

const youtubeMovieRouter =  express.Router();

// youtubeMovieRouter.get('/hotMovies', youtubeMovieController.getHotMovies);
youtubeMovieRouter.get('/hotMovies', youtubeMovieController.getHotMovies);
youtubeMovieRouter.get('/newSingleMoive', youtubeMovieController.getNewSingleMovie);
youtubeMovieRouter.get('/newSeriesMoive', youtubeMovieController.getNewSeriesMovie);
youtubeMovieRouter.put('/{id}/edit', youtubeMovieController.editOneEpisode);
youtubeMovieRouter.post('/', youtubeMovieController.createMovie);
youtubeMovieRouter.get('/getOneMovie/:slug',viewCount,youtubeMovieController.getOneMovie);
youtubeMovieRouter.get('/getActionMovie',youtubeMovieController.getActionMovie);
youtubeMovieRouter.get('/getFilmViet',youtubeMovieController.getFilmViet);
youtubeMovieRouter.get('/getCartonMovie',youtubeMovieController.getCartonMovie);
youtubeMovieRouter.get('/getComedyMovie',youtubeMovieController.getComedyMovie);
youtubeMovieRouter.get('/getSingleMovie',youtubeMovieController.getSingleMovie);
youtubeMovieRouter.get('/getTrendingMovie',youtubeMovieController.getTrendingMovie)

export default youtubeMovieRouter;