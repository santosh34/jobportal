const express = require('express');
const AuthControllers = require('../../controllers/auth/auth');
var passport = require('passport');
const router= express.Router();


//Get =>Home Page
router.get("/register",AuthControllers.getEmployeeRegisterPage);

router.post('/register',employeeregistervalidate,passport.authenticate('employee.signup',{
    failureRedirect:'/register',
    failureFlash:true
}),AuthControllers.postEmployeeRegisterPage);

router.get("/login",AuthControllers.getEmployeeLoginPage);


router.post("/employeehomepage",employeeloginvalidate,passport.authenticate('employee.login',{ 
    failureRedirect:'/login',
   failureFlash:true
}),AuthControllers.postEmployeeLoginPage);

router.get("/employeelogout", AuthControllers.getEmployeeLogoutPage);




//Get =>Home Page
router.get("/jobseekerregister",AuthControllers.getJobSeekerRegisterPage);

router.post('/jobseekerregister',jobseekerregistervalidate,passport.authenticate('jobseeker.signup',{
    failureRedirect:'/jobseeker/jobseekerregister',
    failureFlash:true
}),AuthControllers.postJobSeekerRegisterPage);

router.get("/jobseekerlogin",AuthControllers.getJobSeekerLoginPage);


router.post("/jobseekerhomepage",jobseekerloginvalidate,passport.authenticate('jobseeker.login',{ 
    failureRedirect:'/jobseekerlogin',
   failureFlash:true
}),AuthControllers.postJobSeekerLoginPage);


router.get("/jobseekerlogout", AuthControllers.getJobSeekerLogoutPage);

module.exports =router;





/* ==========================================================================
                      signup validation
   ========================================================================== */

   function employeeregistervalidate(req, res, next){
    req.checkBody('email', 'Email is Required').notEmpty();
    req.checkBody('email', 'Email is Invalid').isEmail();
    req.checkBody('password', 'Pssword is Required').notEmpty();
    req.checkBody('confirmpassword', 'Pssword is Required').notEmpty();
    req.checkBody('confirmpassword', ' Confirm Passwords do not match').equals(req.body.password);
    req.checkBody('ownership', 'Ownership is Required').notEmpty();
    req.checkBody('companytype', 'Company Type is Required').notEmpty();

  
    var registerErrors = req.validationErrors();
  
    if(registerErrors){
        var messages = [];
        registerErrors.forEach((error) => {
            messages.push(error.msg);
        });
  
        req.flash('error', messages);
        res.redirect('/register');
    }else{
        return next();
    }
  }
  
  
  
  
  /* ==========================================================================
                         Login  validation
     ========================================================================== */
  function employeeloginvalidate(req, res, next){
    req.checkBody('email', 'Email is Required').notEmpty();
    req.checkBody('email', 'Email is Invalid').isEmail();
    req.checkBody('password', 'Password is Required').notEmpty();
  
    
  
    var loginErrors = req.validationErrors();
  
    if(loginErrors){
        var messages = [];
        loginErrors.forEach((error) => {
            messages.push(error.msg);
        });
  
        req.flash('error', messages);
        res.redirect('/login');
    }else{
        return next();
    }
  }


  
  function jobseekerregistervalidate(req, res, next){
    req.checkBody('jobseekeremail', 'Email is Required').notEmpty();
    req.checkBody('jobseekeremail', 'Email is Invalid').isEmail();
    req.checkBody('jobseekerpassword', 'Pssword is Required').notEmpty();
    req.checkBody('jobseekerconfirmpassword', ' Confirm Passwords do not match').equals(req.body.jobseekerpassword);

  
    var registerErrors = req.validationErrors();
  
    if(registerErrors){
        var messages = [];
        registerErrors.forEach((error) => {
            messages.push(error.msg);
        });
  
        req.flash('error', messages);
        res.redirect('/jobseeker/jobseekerregister');
    }else{
        return next();
    }
  }
  
  
  
  
  /* ==========================================================================
                         Login  validation
     ========================================================================== */
  function jobseekerloginvalidate(req, res, next){
    req.checkBody('jobseekeremail', 'Email is Required').notEmpty();
    req.checkBody('jobseekeremail', 'Email is Invalid').isEmail();
    req.checkBody('jobseekerpassword', 'Password is Required').notEmpty();
  
    
  
    var loginErrors = req.validationErrors();
  
    if(loginErrors){
        var messages = [];
        loginErrors.forEach((error) => {
            messages.push(error.msg);
        });
  
        req.flash('error', messages);
        res.redirect('/jobseekerlogin');
    }else{
        return next();
    }
  }