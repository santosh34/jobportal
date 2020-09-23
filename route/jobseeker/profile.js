const express = require('express');
const multer = require('multer')
const JobSeekerControllers = require('../../controllers/jobseeker/profile');
const router= express.Router();
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


router.get('/profile',JobSeekerControllers.getJobSeekerProfilepage)


router.post('/profile', upload.single('file'),jobseekerprofilevalidate,JobSeekerControllers.postJobSeekerProfilepage)



module.exports =router;



function jobseekerprofilevalidate(req, res, next){
    req.checkBody('username', 'Username is Required').notEmpty();
    req.checkBody('phonenumber', 'Phone numer is not valid').isNumeric();
    req.checkBody('temporaryaddress', 'Username is Required').notEmpty();
  
   
  
    var jobseekerprofileErrors = req.validationErrors();
     if(jobseekerprofileErrors){
        var messages = [];
        jobseekerprofileErrors.forEach((error) => {
            messages.push(error.msg);
      });
       req.flash('error', messages);
       var errors = req.flash('error');
      
       return res.render('jobseeker/profile',{title:'JobSeeker profile', messages:errors,
       hasErrors:errors.length>0,success:'',user:req.session.jobseeker,isjobseekerauth:req.session.isjobseekerLoggedIn,profile:''});
    }
    else{
        return next();
    }
  }