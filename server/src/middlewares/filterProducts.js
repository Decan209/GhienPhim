import asyncHandler from "express-async-handler";

const filterProducts = asyncHandler((req, res, next) => {
  const view = req.query.view;
  const filterNew = req.query.filterNew;
  
  if(view){
    const filter = {view: -view}
    req.filter = filter;
    next();
    return;
  }
  if(filterNew){
    const filter = {_id: -filterNew}
    req.filter = filter;
    next();
    return;
  }
  req.filter={}
  next()

});

export default filterProducts;
