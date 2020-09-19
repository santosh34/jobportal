var JobSeeker = require('../../model/jobseeker');

module.exports.getJobSeekerProfilepage =(req,res,next)=>{
   const userid=req.params.id
   JobSeeker.findOne({_id: userid})
   .then(profile =>{
      var errors = req.flash('error');
      res.render('jobseeker/profile',{title:'Candidate profile', messages:errors,
       hasErrors:errors.length>0,user:req.session.jobseeker,success:'',profile:profile,isjobseekerauth:req.session.isjobseekerLoggedIn});


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
           jobseekerprofile.jobseekeremail=req.body.jobseekeremail;
           jobseekerprofile.avtar=req.file.filename
         }else{
           console.log('Profile Image not uploaded !!')
          var errors = " Profile Image not uploaded !!";
           return res.render('jobseeker/profile',{title:'JobSeeker profile', messages:errors,
           hasErrors:errors.length>0,success:'',user:req.session.jobseeker,isjobseekerauth:req.session.isjobseekerLoggedIn,company:''});}
       jobseekerprofile.save()
       .then(profile=>{
       console.log(profile)
       var errors = req.flash('error');
      var success = "Candidate Profile updated succssfully";
      res.render('jobseeker/profile',{title:'Candidate profile',profile:profile, messages:errors,
      hasErrors:errors.length>0,success:success,user:req.session.jobseeker,isjobseekerauth:req.session.isjobseekerLoggedIn});
   })
})
   .catch(err=>{
   console.error(err,'Get JobSeeker Candidate profile error')
})}

