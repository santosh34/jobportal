const express = require('express');
const EmployeeControllers = require('../../controllers/employee/emphomepage');
const router= express.Router();


router.get('/dashboard', EmployeeControllers.getEmployeeHomepage)

module.exports =router;