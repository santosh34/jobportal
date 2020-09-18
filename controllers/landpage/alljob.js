var moment = require('moment'); 
var PostJob = require('../../model/postjob');



//Get all jobpost
module.exports.getAllJobPage =(req,res,next)=>{
   PostJob.find({})
   .populate('postuserid')
   .then(alljob=>{
       //console.log(alljob)
       res.render('landpage/alljob',{title:'login',user:req.user,isauth:req.session.isLoggedIn,alljob:alljob,moment:moment});
   })
   .catch(err =>{
       console.log(err)
   })
}


module.exports.getFilterSearchJobPage=(req,res,next) =>{
  var filterjobtitle= req.body.title;
  var filterjobtype = req.body.jobtype;
  var filterexperiencelevel = req.body.experiencelevel

if(filterjobtitle !='' && filterjobtype!='' && filterexperiencelevel !=''){
    
    var filterparameter={ $and: [{jobtitle: filterjobtitle},
    {$and:[{jobtype: filterjobtype},{jobexperiencelevel:filterexperiencelevel}]}
    ]}

  }else{
    var filterparameter={}
  }
var jobfiltercategory = PostJob.find(filterparameter).populate('postuserid');
jobfiltercategory.exec(function(err,getpostjob){
  if(err){
    console.log(err)
  }else{
    console.log(getpostjob)
    res.render('landpage/searchresult',{title:'search result',user:req.user,isauth:req.session.isLoggedIn,getpostjob:getpostjob,moment:moment});
  
  }
})

 
}
module.exports.getSearchJobPage=(req,res,next)=>{
var regex= new RegExp(req.query["term"],'i');
   var postjobFilter=PostJob.find({jobtitle:regex}).sort({"updated_at":-1}).sort({"created_at":-1}).limit(20);
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
  }});
}





