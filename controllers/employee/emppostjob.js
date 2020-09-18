var moment = require('moment');
var PostJob = require('../../model/postjob');


module.exports.getPostJobPage=(req,res,next)=>{
    var errors = req.flash('error');
    res.render('employer/postjob',{title:'Post New Job', messages:errors,
    hasErrors:errors.length>0,success:'',user:req.user,isauth:req.session.isLoggedIn,});
}


module.exports.postPostJobPage =(req,res,next)=>{
  const cjobtitle = req.body.jobtitle
    const cjobskills=req.body.jobskills
    const cjobtype=req.body.jobtype
    const ceducationlevel=req.body.educationlevel
    const cexperiencelevel=req.body.experiencelevel
    const cjobexperience=req.body.jobexperience
    const cjobcategory=req.body.jobbycategory
    const cgender=req.body.gender
    const clocation=req.body.location
    const cjobexpire=req.body.jobexpire
    const cjobdescription=req.body.description
    const postuser= req.user._id

    
    const postnewjob = new PostJob({
    jobtitle:cjobtitle,
    jobskills:cjobskills,
    jobtype:cjobtype,
    jobexperiencelevel:cexperiencelevel,
    educationlevel:ceducationlevel,
    jobexperience:cjobexperience,
    jobbycategory:cjobcategory,
    gender:cgender,
    jobexpire:cjobexpire,
    location:clocation,
    jobdescription:cjobdescription,
    jobpostdate:  moment(Date.now()).format("dddd, MMMM Do YYYY, h:mm:ss a"),
    postuserid:postuser
    })
    postnewjob.save(function(err,postjob){
        if(err) {
            console.log(err)
        }else{
            console.log(postjob)
            var errors = req.flash('error');
            var success = "New Job Has been Posted Successfully";
            res.render('employer/postjob',{title:'Post New Job', messages:errors,
            hasErrors:errors.length>0,success:success,user:req.user,isauth:req.session.isLoggedIn});
        }
    })
}
