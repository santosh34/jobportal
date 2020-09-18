const express = require('express');
const JobSeekerControllers = require('../../controllers/jobseeker/profile');
const router= express.Router();


router.get('/profile/:id', JobSeekerControllers.getJobSeekerProfilepage)

module.exports =router;