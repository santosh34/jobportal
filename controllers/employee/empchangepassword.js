var bcrypt = require('bcryptjs');
var User = require('../../model/user');


module.exports.getEmployeeChangePassword =(req,res,next)=>{
    var errors = req.flash('error');
    res.render('employer/changepassword',{title:' Employee Change password',user:req.user,isauth:req.session.isLoggedIn,
    messages:errors,hasErrors:errors.length>0,success:''});
}

module.exports.postEmployeeChangePassword=(req,res,next)=>{
    if(req.session.isLoggedIn){
        var oldpw = req.body.oldpassword;
        var newpw = req.body.newpassword;
        var changepw = req.body.confirmpassword;
        User.findOne({_id:req.user.id})
        .then(user => {
            console.log(user)
            if(user!==null) {
                var hash = user.password
                bcrypt.compare(oldpw,hash,function(err,valid){
                    if(err)
                    console.log(err)
                   
                 //if password do not match
                    if(!valid){
                        console.log('password is not valid old')
                         var errors = "Old password is incorrect"
                         res.render('employer/changepassword',{title:'change password',isauth:req.session.isLoggedIn,user:req.user,
                         success:'', messages:errors,hasErrors:errors.length>0});
                         return;
                         
                    }else{
                     if(newpw==changepw){
                         bcrypt.hash(newpw,10)
                         .then(hashed=>{
                             user.password=hashed;
                             user.save();
                         })
                         
                         .then(newuser=>{
                          var success = "password updated succssfully";
                          var errors = req.flash('error');
                          //console.log('password changed')
                          res.render('employer/changepassword',{title:'Employee changepw',user:req.user,newuser:newuser,success:success,
                           isauth:req.session.isLoggedIn,messages:errors,hasErrors:errors.length>0});
                           return;
                         })
                         .catch((err) => {console.log(err)})
                     }
                 }
             })
         }
     })
 }



}