const express = require('express');
const JobSeekerControllers = require('../../controllers/jobseeker/matchingjob');
const router= express.Router();


router.get('/matchingjob',JobSeekerControllers.getJobSeekerMatchingJobpage)


router.get('/appllyforjob/:postjobid',JobSeekerControllers.getJobSeekerAppliedJobpage)





module.exports =router;


