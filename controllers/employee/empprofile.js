var mongoose = require('mongoose');
var User = require('../../model/user');


module.exports.getUserProfilePage =(req,res,next)=>{
    const userid=req.params.userid
    User.findOne({_id:userid})
    .then(user=>{
   // console.log(getuser)
   var errors = req.flash('error');
    res.render('employer/userprofile',{title:'User profile', messages:errors,
    hasErrors:errors.length>0,success:'', user:user,isauth:req.session.isLoggedIn,user:req.user});
    })
    .catch(err=>{
        console.error(err,'Get User profile error')
    })
    
}


module.exports.postUserProfilePage =(req,res,next)=>{
    const userid=req.params.userid;
   User.findOne({_id:userid})
   .then(getuser=>{
       getuser.username=req.body.username;
       getuser.email=req.body.email;
       getuser.fullname=req.body.fullname;
       getuser.userphone=req.body.userphone;
       getuser.useraddress=req.body.useraddress
       getuser.save()
       .then(user=>{
      //console.log(user)
      var errors = req.flash('error');
      var success = "User Profile has been Updated successfully" 
       res.render('employer/userprofile',{title:'User profile', messages:errors,
       hasErrors:errors.length>0,success:success,user:user,isauth:req.session.isLoggedIn,user:req.user,});
       })
    })
    .catch(err=>{
       console.error(err)
})}



module.exports.getCompanyProfilePage =(req,res,next)=>{
    const userid=req.params.userid
    User.findOne({_id:userid})
    .then(companies=>{
    //console.log(companies)
    var errors = req.flash('error');
    res.render('employer/companyprofile',{title:'User profile',company:companies, messages:errors,
    hasErrors:errors.length>0,success:'',isauth:req.session.isLoggedIn,user:req.user,});
})
    .catch(err=>{
        console.error(err,'Get User profile error')
})}



module.exports.postCompanyProfilePage =(req,res,next)=>{
    User.findOne({_id:req.user.id})
    .then(companyprofile=>{
        if(req.file){
            companyprofile.companyname=req.body.companyname;
            companyprofile.companytype=req.body.companytype;
            companyprofile.ownership=req.body.ownership;
            companyprofile.website=req.body.website;
            companyprofile.companyaddress=req.body.companyaddress;
            companyprofile.medialink=req.body.medialink;
            companyprofile.companyphone=req.body.companyphone;
            companyprofile.companyemail=req.body.companyemail;
            companyprofile.companydescription=req.body.companydescription;
            companyprofile.companylogo=req.file.file

        }else{
            console.log('image not uploaded plz upload')
           var errors = " Required Company Logo";
            var success = ""
            return res.render('employer/companyprofile',{title:'Company profile', messages:errors,
            hasErrors:errors.length>0,success:success,user:req.user,isauth:req.session.isLoggedIn,company:''});
        }
       
        companyprofile.save()
        .then(companies=>{
        console.log(companies)
        var errors = req.flash('error');
       var success = "Company Profile updated succssfully";
       res.render('employer/companyprofile',{title:'User profile',company:companies, messages:errors,
       hasErrors:errors.length>0,success:success,user:req.user,isauth:req.session.isLoggedIn,});
    })
})
    .catch(err=>{
    console.error(err,'Get User profile error')
})}
