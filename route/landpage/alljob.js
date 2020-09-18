const express = require('express');
const LandPageControllers = require('../../controllers/landpage/alljob');
const router= express.Router();


router.get('/findalljob', LandPageControllers.getAllJobPage);

router.post("/filtersearch",LandPageControllers.getFilterSearchJobPage);

router.get("/autocomplete/",LandPageControllers.getSearchJobPage);

module.exports =router;