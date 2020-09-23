const express = require('express');
const JobSeekerControllers = require('../../controllers/jobseeker/appliedjob');
const router= express.Router();





router.get('/applliedjob',JobSeekerControllers.getJobSeekerAllAppliedJobpage)


router.get('/listappliedjob',JobSeekerControllers.getJobSeekerlistAppliedJobpage)


router.get('/cancelappliedjob/:postjobid',JobSeekerControllers.getJobSeekerCancelAppliedJobpage)



module.exports =router;


