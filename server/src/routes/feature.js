import express from "express";
import * as featureController from "../app/controllers/featureController.js";

const featureRouter = express.Router();

featureRouter.get("/search", featureController.searchBox);
featureRouter.get("/categories", featureController.paginationPage);
featureRouter.post("/favouriteMovie", featureController.favouriteMovie);
featureRouter.get("/getFavourite/:email",featureController.getFavourite);
featureRouter.post("/deleteFavouriteMovie",featureController.deleteFavouriteMovie);

export default featureRouter;
