const express = require('express');
const SearchJobPageControllers = require('../../controllers/employee/empsearch')
const router= express.Router();


//Get =>Home Page
router.get("/searchjob",SearchJobPageControllers.getSearchJobPage);


router.get("/editjob/:editjob",SearchJobPageControllers.getEditJobPage);

router.post("/updatejobpost/:updatejob",postjobvalidate,SearchJobPageControllers.postUpdateJobPage);


router.get("/deletejob/:postjob",SearchJobPageControllers.deleteJobPage);


router.post("/filtersearch",SearchJobPageControllers.postFilterSearchJobPage)


router.get("/autocomplete/",SearchJobPageControllers.getAutoSearchJobPage);






module.exports =router;



function postjobvalidate(req, res, next){
    req.checkBody('jobtitle', 'Job Title is Required').notEmpty();
    req.checkBody('jobtype', 'Job Type is Required').notEmpty();
    req.checkBody('educationlevel', 'Education Level  is Required').notEmpty();
    req.checkBody('experiencelevel', 'Job Experience Level is Required').notEmpty();
    req.checkBody('jobexperience', 'JobExperience is Required').notEmpty();
    req.checkBody('location', 'Job location is Required').notEmpty();
  
  
   
    var postjobErrors = req.validationErrors();
  
    if(postjobErrors){
        var messages = [];
        postjobErrors.forEach((error) => {
            messages.push(error.msg);
        });
  
        req.flash('error', messages);
        var errors = req.flash('error');
        res.render('employer/postjob',{title:'Post Jobs',messages:errors,
     hasErrors:errors.length>0,success:'',isauth:req.session.isLoggedIn,user:req.user});
    }else{
        return next();
    }
  }