var moment = require('moment'); 
const mongoose = require('mongoose')
var User = require('../../model/user');
var PostJob=require('../../model/postjob');

module.exports.getAllJobBeginners =(req,res,next)=>{
    const beginners= req.params.beginnersjob
    PostJob.find({jobexperiencelevel:beginners})
    .then(alljob=>{
        console.log(alljob)
        res.render('landpage/jobcategory',{title:'Beginners',user:req.user,isauth:req.session.isLoggedIn,alljob:alljob,moment:moment});
    })
    .catch(err=>{
        console.log(err)
    })
}

module.exports.getAllJobIntermediate =(req,res,next)=>{
    const intermediate= req.params.intermediatejob
    PostJob.find({jobexperiencelevel:intermediate})
    .then(alljob=>{
        console.log(alljob)
        res.render('landpage/jobcategory',{title:'Intermediate',user:req.user,isauth:req.session.isLoggedIn,alljob:alljob,moment:moment});
    })
    .catch(err=>{
        console.log(err)
    })
   
   
}


module.exports.getAllJobExpert =(req,res,next)=>{
   const expert= req.params.expertjob
    PostJob.find({jobexperiencelevel:expert})
    .then(alljob=>{
        console.log(alljob)
        res.render('landpage/jobcategory',{title:'Expert',user:req.user,isauth:req.session.isLoggedIn,alljob:alljob,moment:moment});
    })
    .catch(err=>{
        console.log(err)
    })

}
