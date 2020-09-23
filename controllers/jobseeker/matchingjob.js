var PostJob= require('../../model/postjob');
const JobSeeker=require('../../model/jobseeker')
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
  const editingmode=req.query.edit
 const postjobid =req.params.postjobid
 JobSeeker.findOne({_id:req.session.jobseeker})
.then(result=>{
  if(result){
      JobSeeker.findOneAndUpdate({_id:result},
      {$addToSet:{appliedjob:postjobid}}).populate('appliedjob')
      .then(done=>{
        console.log('Job That Has Been applied successfully ',done)
        res.redirect('/jobseeker/matchingjob')
      })
    }else{
    console.log('jot session id match')
    res.redirect('/jobseeker/matchingjob')
  }
})
.catch(err=>{
  console.log(err)
})
}

