var passport = require('passport');
const bcrypt = require('bcrypt-nodejs');
var LocalStrategy= require('passport-local').Strategy;
var User = require('../model/user');
const JobSeeker = require('../model/jobseeker');

// used to serialize the user for the session
passport.serializeUser((user,done)=>{
    if(user){
        done(null,user.id);
}
  
});

// retrieve the whole object via the deserializeUser function  
passport.deserializeUser((id,done)=>{
    User.findById(id, function(err, user) {
            done(err, user);
    });
});


  
  /* ==========================================================================
                      Employee using passport
     ========================================================================== */

passport.use('employee.signup',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password', 
    passReqToCallback: true
},(req,email,password,done) => {
    
    User.findOne({'email':email},(err,user) => {
        if(err){
            return done(err);
        }
        if(user){
           return done(null,false,{message:'Already exists : '+email});
        }
            var newUser = new User();
            newUser.email = req.body.email;
            newUser.password = newUser.encryptPassword(req.body.password);
            newUser.username = req.body.username;
            newUser.companyname = req.body.companyname;
            newUser.companytype = req.body.companytype;email;
            newUser.ownership = req.body.ownership;email;
            //save the user
            newUser.save((err,user)=>{
                if(err)
                throw err;
                
                console.log(user)
                return done(null, newUser);
            });
          
    });
}));

   passport.use('employee.login',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password', 
    passReqToCallback: true
},(req,email,password,done) => {
  //check email exist or not
    User.findOne({'email':email},(err,user) => {
        if(err){
            return done(err);
        }
        var messages=[]
        //checking user name exists or not
        if(!user){
            console.log('email does not exists in database')
            messages.push('Email does not exists')
            return done(null,false,{message:'Email do not exists : '+email});
        }
        //checking password valid or not
        if(!user.validPassword(password)){
            messages.push(' Invalid password')
            return done(null,false, {message:'Password do not match : '+email});
        }
        if(user){
            //saving the user in session
            req.session.isLoggedIn = true;
            req.session.user=user._id;
            req.session.save();
            console.log(user)
        }
        return done(null,user)
        });
}));


/* ==========================================================================
                    JobSeeker  usign passport
   ========================================================================== */
passport.use('jobseeker.signup',new LocalStrategy({
    usernameField: 'jobseekeremail',
    passwordField: 'jobseekerpassword', 
    passReqToCallback: true
},(req,jobseekeremail,jobseekerpassword,done) => {

    JobSeeker.findOne({'jobseekeremail':jobseekeremail},(err,jobseekeruser) => {
        if(err){
            return done(err);
        }
      //if user exists
        if(jobseekeruser){
           return done(null,false,{message:'Already exists : '+jobseekeremail});
        }
            var newJobSeeker = new JobSeeker();
            newJobSeeker.jobseekerusername = req.body.jobseekerusername;
            newJobSeeker.jobseekeremail = req.body.jobseekeremail;
            newJobSeeker.jobseekerpassword = newJobSeeker.encryptPassword(req.body.jobseekerpassword);
           
            //save the user
            newJobSeeker.save((err,jobseeker)=>{
                if(err)
                throw err;
                
               
                console.log(jobseeker)
                return done(null, jobseeker);
            });
          
    });
}));



   passport.use('jobseeker.login',new LocalStrategy({
    usernameField: 'jobseekeremail',
    passwordField: 'jobseekerpassword', 
    passReqToCallback: true
},(req,jobseekeremail,jobseekerpassword,done) => {
    JobSeeker.findOne({'jobseekeremail':jobseekeremail},(err,jobseeker) => {
        if(err){
            return done(err);
        }
      var messages=[]
        if(!jobseeker){
            messages.push('Email does not exists')
            return done(null,false,{message:'Email do not exists : '+jobseekeremail});
        }
        if(!jobseeker.validPassword(jobseekerpassword)){
            messages.push(' Invalid password')
            return done(null,false, {message:'Password do not match : '+jobseekeremail});
        }
        if(jobseeker){
            req.session.isjobseekerLoggedIn = true;
            req.session.jobseeker=jobseeker._id;
            req.session.save();
        }
        return done(null,jobseeker)
        })
    }));



