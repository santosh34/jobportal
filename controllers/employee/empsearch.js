var User = require('../../model/user');
const moment=require('moment')
var PostJob = require('../../model/postjob');




module.exports.getSearchJobPage =(req,res,next)=>{
 
   PostJob.find
      ({postuserid:req.user._id})
       .then(getpostjob=>{
      console.log(getpostjob)
       res.render('search/search',{title:'Search Job Post',user:req.user,isauth:req.session.isLoggedIn,getpostjob:getpostjob,path:'/employer/searchjob',moment:moment});
   })
.catch(err=>{
       console.error(err,'Get User profile error')
   })
}

module.exports.getEditJobPage=(req,res,next) => {
  const editjob=req.params.editjob
   PostJob.findOne({_id:editjob})
   .then(editpost=>{
       var errors = req.flash('error');
       res.render('search/editpostjob',{title:'Edit Post Job',editpost:editpost, messages:errors,
        hasErrors:errors.length>0,success:'',user:req.user,isauth:req.session.isLoggedIn,moment:moment,path:'/employer/searchjob'});
   
   })
}

module.exports.postUpdateJobPage=(req,res,next) => {
  const update=req.params.updatejob
  PostJob.findOne({_id:update})
  .then(updatejob =>{
      updatejob.jobtitle= req.body.jobtitle
      updatejob.jobskills=req.body.jobskills
      updatejob.jobtype=req.body.jobtype
      updatejob.jobexperiencelevel
      updatejob.educationlevel=req.body.educationlevel
      updatejob.jobexperience=req.body.jobexperience
      updatejob.gender=req.body.gender
      updatejob.jobexpire=req.body.jobexpire
      updatejob.location=req.body.location
      updatejob.jobdescription=req.body.description
      updatejob.save()
      .then(editpost=>{
          console.log(editpost)
          var errors = req.flash('error');
          var success = "New Job Has been Posted Successfully";
          res.render('search/editpostjob',{title:' Update Edit Post Job', editpost:editpost,messages:errors,
          hasErrors:errors.length>0,success:success,user:req.user,isauth:req.session.isLoggedIn,moment:moment,path:'/employer/searchjob'});
      })
      .catch(err =>{
          console.log(err)
      })
  })
}



module.exports.deleteJobPage=(req, res, next)=>{

  var id=req.params.postjob;
  PostJob.findByIdAndDelete({_id:id})
  .then(jobdelete=>{
    console.log('jobdelete')
    res.redirect('/employer/searchjob')
  })
}

module.exports.postFilterSearchJobPage=(req,res,next) =>{
  var filterjobtitle= req.body.title;
  var filterexperiencelevel = req.body.experiencelevel
  var filterjobtype = req.body.jobtype;


if(filterjobtitle !='' && filterjobtype!='' && filterexperiencelevel !=''){
    var filterparameter={ $and: [{jobtitle: filterjobtitle},
    {$and:[{jobtype: filterjobtype},{jobexperiencelevel:filterexperiencelevel}]}
  ]}

  }else if(filterjobtitle !='' && filterjobtype =='' && filterexperiencelevel !=''){
    var filterparameter={ $and:[{ jobtitle:filterjobtitle},{jobexperiencelevel:fltrerexperiencelevel}]
       }
  }else if(filterjobtitle =='' && filterjobtype !='' && filterexperiencelevel !=''){
    var filterparameter={ $and:[{ jobtype:filterjobtype},{jobexperiencelevel:filterexperiencelevel}]
       }
  }else if(filterjobtitle =='' && filterjobtype =='' && filterexperiencelevel !=''){

    var filterparameter={jobexperiencelevel:filterexperiencelevel
       }
  }else{
    var filterparameter={}
  }
var jobfiltercategory = PostJob.find(filterparameter);
jobfiltercategory.exec(function(err,getpostjob){
  if(err){
    console.log(err)
  }else{
    console.log(getpostjob,'res')
    res.render('search/search',{title:'search result',user:req.user,isauth:req.session.isLoggedIn,getpostjob:getpostjob,path:'/employer/searchjob'});
  
  }
})}



module.exports.getAutoSearchJobPage=(req,res,next)=>{
  var regex= new RegExp(req.query["term"],'i');
 var postjobFilter =PostJob.find({jobtitle:regex},{'jobtitle':1}).sort({"updated_at":-1}).sort({"created_at":-1}).limit(20);
 postjobFilter.exec(function(err,data){
        console.log(data)
  var result=[];
  if(err){
  console.log(err)
 }else{
if(data && data.length && data.length>0){
data.forEach(data=>{
       console.log(data)
     let obj={
     id:data._id,
     label: data.jobtitle
   }
  result.push(obj);
 });
}
res.jsonp(result);
}}
);
}





