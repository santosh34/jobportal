const JobSeeker=require('../../model/jobseeker')
const moment =require('moment');

module.exports.getJobSeekerAllAppliedJobpage=(req,res,next)=>{
    JobSeeker.findOne({_id:req.session.jobseeker}).populate('appliedjob')
    .then(job=>{
      console.log(job)
      res.render('jobseeker/appliedjob',{title:'applied job',job:job,
      isjobseekerauth:req.session.isjobseekerLoggedIn,user:req.session.jobseeker,moment:moment,path:'/jobseeker/appliedjob'});
        
    })
      
    .catch(err =>{
      console.log(err)
    })
  }
  
  module.exports.getJobSeekerlistAppliedJobpage=(req,res,next)=>{
    res.render('jobseeker/appliedjob',{title:'applied job',job:job,
    isjobseekerauth:req.session.isjobseekerLoggedIn,user:req.session.jobseeker,moment:moment,path:'/jobseeker/appliedjob'});
  }
  

  module.exports.getJobSeekerCancelAppliedJobpage =(req,res,next)=>{
   const postjobid =req.params.postjobid
   JobSeeker.findOne({_id:req.session.jobseeker})
  .then(result=>{
    if(result){
        JobSeeker.findOneAndUpdate({_id:result},
        {$pull:{appliedjob:postjobid}})
        .then(done=>{
          console.log('applied job deleted ')
         return  res.redirect('/jobseeker/appliedjob')
        })
      }else{
      console.log('job not deleted')
      return res.redirect('/jobseeker/appliedjob')
    }
  })
  .catch(err=>{
    console.log(err)
  })
  }
  
  