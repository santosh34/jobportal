const express = require('express');
const ProfileControllers = require('../../controllers/employee/empprofile');
const multer = require('multer')
const router= express.Router();

//multer middleware for images
const fileStorage = multer.diskStorage({
    destination: (req,file,callback) =>{
        callback(null, 'images');
    },
    filename: function (req, file, cb) {
     
      cb(null, new Date().toDateString()+ "-" + file.originalname)
    }
  })
  
  const fileFilter = (req,file,callback) =>{
    if(
        file.mimetype == 'image/png' ||
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'image/jpeg'
    ){
        callback(null, true);
    }
    else {
        callback(null, flase);
    }
  };
  var upload=(multer({storage: fileStorage,fileFilter: fileFilter,limits:{
    fileSize :1024 *1024*5
  }}));



//Get =>Home Page
router.get('/userprofile/:userid',ProfileControllers.getUserProfilePage)

router.post('/userprofile/:userid',userprofilevalidate,ProfileControllers.postUserProfilePage)

router.get('/companyprofile/:userid',ProfileControllers.getCompanyProfilePage)

router.post('/companyprofile',upload.single('file'),companyprofilevalidate,ProfileControllers.postCompanyProfilePage)


module.exports =router;



function userprofilevalidate(req, res, next){
  req.checkBody('username', 'Username is Required').notEmpty();
  req.checkBody('userphone', 'Phone numer is not valid').isNumeric();

  var userErrors = req.validationErrors();
   if(userErrors){
      var messages = [];
      userErrors.forEach((error) => {
          messages.push(error.msg);
    });
     req.flash('error', messages);
     var errors = req.flash('error');
     res.render('employer/userprofile',{title:'Company profile',messages:errors,
     hasErrors:errors.length>0,success:'',isauth:req.session.isLoggedIn,user:req.user
});
  }
  else{
      return next();
  }
}


function companyprofilevalidate(req, res, next){
    req.checkBody('companyaddress', 'Company Address is Required').notEmpty();
    req.checkBody('companyemail', 'Company Email is Invalid').isEmail();
    req.checkBody('companyphone', 'Company Phone is Required').notEmpty();

  
  
   
    var companyErrors = req.validationErrors();
  
    if(companyErrors){
        var messages = [];
        companyErrors.forEach((error) => {
            messages.push(error.msg);
        });
  
        req.flash('error', messages);
        var errors = req.flash('error');
        console.log(errors);
        res.render('employer/companyprofile',{title:'Company profile',messages:errors,
        hasErrors:errors.length>0,success:'',company:'',isauth:req.session.isLoggedIn,user:req.user});
    }else{
        return next();
    }
  }