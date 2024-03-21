const { getAllEmployees, getSingleEmployee, addEmployeeDetail, deleteEmployee, updateEmployeeDetail } = require( "../controllers/Employee.Controller.js")

const express = require("express")
const router = express.Router()

router.get("/all-employees", getAllEmployees)
router.get("/employee-detail/:id", getSingleEmployee)
router.post("/add-employee", addEmployeeDetail)
router.delete("/delete-employee/:id", deleteEmployee)
router.put("/update-employee/:id", updateEmployeeDetail)

module.exports = router;