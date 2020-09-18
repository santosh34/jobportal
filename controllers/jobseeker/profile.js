module.exports.getJobSeekerProfilepage =(req,res,next)=>{
   const userid=req.params.id
 
   res.render('jobseeker/profile',{title:' jOBSEEKER PROFILE PAGE',user:req.session.jobseeker,isjobseekerauth:req.session.isjobseekerLoggedIn});
}