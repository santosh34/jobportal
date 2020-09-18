const mongoose=require('mongoose')
const User= require('../model/user')
const moment=require('moment')
const PostJob= require('../model/postjob');

module.exports.getHomePage =(req,res,next)=>{
   let isemployeeauth = req.session.isLoggedIn;
   let isjobseekerauth= req.session.isjobseekerLoggedIn;
   if(isemployeeauth){
      res.redirect('/employeehomepage')
    }
    if(isjobseekerauth){
      res.redirect('/jobseekerhomepage')
   }else{    
      res.redirect('/landingpage')
   }
   
}

  
  /* ==========================================================================
                         Employee HomePage
     ========================================================================== */

module.exports.getEmployeeHomePage=(req,res, next)=>{
   let isauth = req.session.isLoggedIn;
   if(isauth){
      User.findOne({'_id':req.user._id}).select('_id')
      .then(user=>{
         const pipeline=[
            {$match:{postuserid:new mongoose.Types.ObjectId(req.user._id)}},
            {$group:{_id:"$jobexperiencelevel",count:{$sum:1}}}]
            return PostJob.aggregate(pipeline)
            .then(result=>{
               PostJob.countDocuments({postuserid:req.user._id})
               .then(count=>{
                  res.render('employer/homepage',{title:'Home Page',user:req.user,isauth:isauth,count:count,result:result});
               })
              })
            })
         }
      }



        
  /* ==========================================================================
                         JobSeeker HomePage
     ========================================================================== */
   
module.exports.getJobseekerHomePage=(req,res, next)=>{
   let isjobseekerauth= req.session.isjobseekerLoggedIn;
   if(isjobseekerauth){
     
     console.log(req.session.jobseeker)
      res.render('jobseeker/homepage',{title:'JobSeeker Home Page',user:req.session.jobseeker,isjobseekerauth:isjobseekerauth
   });
   }else{
      res.redirect('/landingpage')

   }
}




  
  /* ==========================================================================
                         landing Page Front
     ========================================================================== */
module.exports.getLandingPage=(req,res, next)=>{
   User.countDocuments({})
   .then(countcompany=>{
      PostJob.countDocuments({})
      .then(countjob=>{
         console.log('total post job',countjob)
      const pipeline=[
         {$group:{_id:"$jobexperiencelevel",count:{$sum:1}}}]
          PostJob.aggregate(pipeline)
         .then(result=>{
            PostJob.find({}).sort({date:-1}).limit(6).populate('postuserid')
            .then(recent=>{
               res.render('homepage',{title:'Home Pages',user:req.user,isauth:req.session.isLoggedIn,
               countcompany:countcompany,
               countjob:countjob,
               result:result,
               recent:recent,
               moment:moment
            })
           
         });
         })
      })
       
   })
}
    
