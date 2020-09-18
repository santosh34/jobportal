const express = require('express');
const EmployeeControllers = require('../../controllers/employee/empchangepassword');
const router= express.Router();


router.get('/changepassword', EmployeeControllers.getEmployeeChangePassword)

router.post('/changepassword',passwordvalidate,EmployeeControllers.postEmployeeChangePassword)
module.exports =router;



function passwordvalidate(req, res, next){
    req.checkBody('oldpassword', 'Oldpw is Required').notEmpty();
    req.checkBody('newpassword', 'new pw is required').notEmpty();
    req.checkBody('newpassword', 'New Password Must Not Be Less Than 5 Characters').isLength({min:5});
    req.checkBody('confirmpassword', 'confirm passwor is Required').notEmpty();
    req.checkBody('confirmpassword', 'Passwords do not match').equals(req.body.newpassword)
    
  
    
  
    var passwordErrors = req.validationErrors();
  
    if(passwordErrors){
        var messages = [];
        passwordErrors.forEach((error) => {
            messages.push(error.msg);
        });
  
        req.flash('error', messages);
        var errors = req.flash('error');
        console.log(errors);
        res.render('employer/changepassword',{title:'ejs',user:req.user,success:'', messages:errors,isauth:req.session.isLoggedIn,
        hasErrors:errors.length>0});
    }else{
        return next();
    }
  }