const express = require('express');
const PostJobControllers = require('../../controllers/employee/emppostjob')
const router= express.Router();


//Get =>Home Page
router.get('/postjob',PostJobControllers.getPostJobPage)

router.post('/postjob', postjobvalidate,PostJobControllers.postPostJobPage)




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