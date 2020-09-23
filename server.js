const express = require('express');
const path = require('path');
var cookieParser= require('cookie-parser');
const bodyParser = require('body-parser');
var validator = require('express-validator');
const mongoose = require('mongoose');
const session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var flash = require('connect-flash');



//employeePage router
const homePageRouter = require("./route/homepage");
const EmployeeAuthRouter = require("./route/auth/auth");
const EmpHomePageRouter=require("./route/employee/emphomepage");
const EmpProfilePageRouter=require("./route/employee/empprofile");
const EmpPostJobPageRouter=require("./route/employee/postjob");
const EmpChangePasswordPageRouter=require("./route/employee/emppassword");
const EmpSearchPageRouter=require("./route/employee/empsearchjob")


//LandingPage page
const FrontPageRouter=require("./route/landpage/alljob")
const AllCompanyPageRouter=require("./route/landpage/allcompany")
const AllCategoryPageRouter=require("./route/landpage/allcategory")
const ALLJobLevelPageRouter=require("./route/landpage/joblevel")

//jobseeker router
const JobSeekerProfilePageRouter=require("./route/jobseeker/profile");
const JobSeekerMatchingJobPageRouter=require("./route/jobseeker/matchingjob")
const JobSeekerAppliedJobPageRouter=require("./route/jobseeker/appliedjob")


const app=express();







//db connection
const mongodb=mongoose.connect('mongodb://localhost:27017/portal', { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true,useFindAndModify:false})
require('./auth/passport');


//app middleware
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"));
app.use('/images',express.static(path.join(__dirname,"images")));
app.use('/public',express.static(path.join(__dirname,"public")));

// initialize cookie-parser to allow us access the cookies stored in the browser
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(validator());
// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
  secret:'secretekeyforsessionid',
  resave:false,
  saveUninitialized:false,
  cookie:{
    maxage:1000 *60 * 60 *24
  },
  store : new MongoStore({mongooseConnection: mongoose.connection,collection:'sessionstore'})
}))


app.use(flash());
app.use(passport.initialize());
app.use(passport.session());



//route middlewares
app.use('/',homePageRouter);
app.use('/',EmployeeAuthRouter)
app.use('/employer',EmpHomePageRouter)
app.use('/employer',EmpProfilePageRouter)
app.use('/employer',EmpPostJobPageRouter)
app.use('/employer',EmpChangePasswordPageRouter)
app.use('/employer',EmpSearchPageRouter)


//front page router
app.use('/',FrontPageRouter)
app.use('/',AllCompanyPageRouter)
app.use('/',AllCategoryPageRouter)
app.use('/',ALLJobLevelPageRouter)

//jobseeker page routers
app.use('/jobseeker',JobSeekerProfilePageRouter)
app.use('/jobseeker',JobSeekerMatchingJobPageRouter)
app.use('/jobseeker',JobSeekerAppliedJobPageRouter)


//404 error server
app.use("*", (req,res,next)=>{
  res.render("404");
})

//listen to serverEEEEEE
const PORT=process.env.PORT||3000;
app.listen(PORT,console.log('server started on port 3000'))