var JobSeeker = require('../../model/jobseeker');

module.exports.getJobSeekerProfilepage =(req,res,next)=>{
  JobSeeker.findOne({_id: req.session.jobseeker})
   .then(profile =>{
      var errors = req.flash('error');
      res.render('jobseeker/profile',{title:'Candidate profile', messages:errors,
       hasErrors:errors.length>0,user:req.jobseeker,success:'',profile:profile,
       isjobseekerauth:req.session.isjobseekerLoggedIn,path:'/jobseeker/profile',});
      })
   .catch(err => {
      console.log(err);
      
   })
}


module.exports.postJobSeekerProfilepage =(req,res,next)=>{
   const userid =req.session.jobseeker
   JobSeeker.findOne({_id:userid})
   .then(jobseekerprofile=>{
       if(req.file){
           jobseekerprofile.jobseekerusername=req.body.username;
           jobseekerprofile.preferredcategories=req.body.preferredcategories;
           jobseekerprofile.jobexperience=req.body.jobexperience;
           jobseekerprofile.phonenumber=req.body.phonenumber;
           jobseekerprofile.temporaryaddress=req.body.temporaryaddress;
           jobseekerprofile.aboutyou=req.body.aboutyou;
           jobseekerprofile.avtar=req.file.filename
         }else{
           console.log('Profile Image not uploaded !!')
          var errors = " Profile must  be imgage and Should uploaded !!";
         return res.render('jobseeker/profile',{title:'JobSeeker profile', messages:errors,
           hasErrors:errors.length>0,success:'',user:req.session.jobseeker,
           isjobseekerauth:req.session.isjobseekerLoggedIn,company:'',path:'/jobseeker/profile',profile:''});
         }
       jobseekerprofile.save()
       .then(profile=>{
       console.log(profile)
       var errors = req.flash('error');
      var success = "Candidate Profile updated succssfully";
      res.render('jobseeker/profile',{title:'Candidate profile',profile:profile, messages:errors,
      hasErrors:errors.length>0,success:success,user:req.session.jobseeker,isjobseekerauth:req.session.isjobseekerLoggedIn,path:'/jobseeker/profile'});
   })
})
   .catch(err=>{
   console.error(err,'Get JobSeeker Candidate profile error')
})}

