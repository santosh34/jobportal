const mongoose=require('mongoose')
const User= require('../../model/user')
const PostJob= require('../../model/postjob');



  
  /* ==========================================================================
                        Employee Auth Page
     ========================================================================== */
module.exports.getEmployeeRegisterPage =(req,res,next)=>{
    var errors = req.flash('error');
    res.render('auth/register',{title:' Employee register', messages:errors,
    hasErrors:errors.length>0,user:req.user,isauth:req.session.isLoggedIn});
}

module.exports.postEmployeeRegisterPage =(req,res,next)=>{
    var errors = req.flash('error');
    res.render('auth/login',{title:'Employee Register', messages:errors,
    hasErrors:errors.length>0,user:req.user,isauth:req.session.isLoggedIn});
}



module.exports.getEmployeeLoginPage =(req,res,next)=>{
   var errors = req.flash('error');
    res.render('auth/login',{title:'Employee Login', messages:errors,
    hasErrors:errors.length>0,user:req.user,isauth:req.session.isLoggedIn});
}


module.exports.postEmployeeLoginPage =(req,res,next)=>{
    User.findOne({_id:req.user._id}).select('id')
    .then(user=>{
       console.log(user)
       const pipeline=[
          {$match:{postuserid:new mongoose.Types.ObjectId(req.user._id)}},
          {$group:{_id:"$jobexperiencelevel",count:{$sum:1}}}]
          return PostJob.aggregate(pipeline)
          .then(result=>{
             PostJob.countDocuments({postuserid:req.user._id})
             .then(count=>{
                console.log(count)
                console.log(result)
                res.render('employer/homepage',{title:'Employee Dashboard',user:req.user,isauth:req.session.isLoggedIn,count:count,result:result, path: '/employee/dashboard'});
             })
            })
          })
        }



module.exports.getEmployeeLogoutPage =(req,res,next)=>{
    req.session.isLoggedIn = false;
    req.session.user = null;
    res.redirect("/");
}



  
  /* ==========================================================================
                         JobSeeker Auth
     ========================================================================== */

module.exports.getJobSeekerRegisterPage =(req,res,next)=>{
    var errors = req.flash('error');
     res.render('auth/jobseekerregister',{title:'JobSeeker Register', messages:errors,
     hasErrors:errors.length>0,user:req.user,isjobseekerauth:req.session.isjobseekerLoggedIn});
 }
 
 module.exports.postJobSeekerRegisterPage =(req,res,next)=>{
     var errors = req.flash('error');
     res.render('auth/jobseekerlogin',{title:'JobSeeker Register', messages:errors,
     hasErrors:errors.length>0,user:req.user,isjobseekerauth:req.session.isjobseekerLoggedIn});
 }
 
 module.exports.getJobSeekerLoginPage =(req,res,next)=>{
    var errors = req.flash('error');
     res.render('auth/jobseekerlogin',{title:'JobSeeker login',messages:errors,
     hasErrors:errors.length>0,user:req.user,isjobseekerauth:req.session.isjobseekerLoggedIn});
 }
 
 module.exports.postJobSeekerLoginPage =(req,res,next)=>{
     var errors = req.flash('error');
    res.render('jobseeker/homepage',{title:'Jobseeker Login',user:req.user,isjobseekerauth:req.session.isjobseekerLoggedIn,messages:errors,
    hasErrors:errors.length>0});
 }
 
 module.exports.getJobSeekerLogoutPage =(req,res,next)=>{
     req.session.isjobseekerLoggedIn = false;
     res.redirect("/landingpage");
 }


