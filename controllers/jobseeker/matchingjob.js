var PostJob= require('../../model/postjob');
const JobSeeker=require('../../model/jobseeker')
const User=require('../../model/user')
const moment =require('moment');

module.exports.getJobSeekerMatchingJobpage =(req,res,next)=>{
  PostJob.find({})
  .then(job =>{
    //console.log(job)
    res.render('jobseeker/matchingjob',{title:'Matching Job',job:job,
    isjobseekerauth:req.session.isjobseekerLoggedIn,user:req.session.jobseeker,moment:moment,path:'/jobseeker/matchingjob',editingmode:false});

  })
  .catch(err =>{
    console.log(err)
  })
}


//applied jobposts
module.exports.getJobSeekerAppliedJobpage =(req,res,next)=>{
 const postjobid =req.params.postjobid
 JobSeeker.findOne({_id:req.session.jobseeker})
.then(result=>{
      JobSeeker.findOneAndUpdate({_id:result},
      {$addToSet:{appliedjob:postjobid}}).populate('appliedjob')
      .then(done=>{
      PostJob.findOne({_id:postjobid})
      .then(done=>{
        const postuserid=done.postuserid
        User.findOneAndUpdate({_id:postuserid},
        {$addToSet:{appliedjobseeker:req.session.jobseeker}})
        .then(appliedjob =>{
          res.redirect('/jobseeker/matchingjob')

        })
      })
    })
})
.catch(err=>{
  console.log(err)
})
}

