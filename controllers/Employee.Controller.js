var config = require('../database/dbconfig.js');
const sql = require('mssql');


const getAllEmployees = async (request, response) => {
  try {
      let pool = await sql.connect(config);
      let employees = await pool.request().query("exec proc_allempDetails");
        
      return response.status(201).json({
        success: true,
        message: "Employee info fetched successfully",
        employees: employees.recordsets[0]
      });
      
  } catch (error) {
      console.error(error);
      response.status(500).json({ 
        success : false,
        message: error.message
       });
  }
}

const getSingleEmployee = async(req, res) =>{
    try {
        let pool = await sql.connect(config);
        let employee = await pool.request()
            .input('empId', sql.Int, req.params.id)
            .query("SELECT * from employee_info WHERE empId = @empId");
        return res.status(202).json({
          success: true,
          message: "Employee detail fetched successfully",
          employee:employee.recordsets
        })
    }
    catch (error) {
      console.error(error);
      response.status(500).json({ 
        success : false,
        message: error.message
       });
  }
}

const addEmployeeDetail = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    console.log("empId", req.body.empId);

    // Check if the empId already exists
    const existingEmployee = await pool.request()
      .input('empId', sql.Int, req.body.empId)
      .query('SELECT empId FROM employee_info WHERE empId = @empId');

    if (existingEmployee.recordset.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Employee with the given empId already exists.",
      });
    }

    // If empId does not exist, proceed with the insertion
    let addedEmployee = await pool.request()
      .input('empId',  req.body.empId)
      .input('empName', req.body.empName)
      .input('empSalary',req.body.empSalary)
      .input('deptId',  req.body.deptId)
      .input('job',  req.body.job)
      .input('phone',  req.body.phone)
      .query('INSERT INTO employee_info (empId, empName, empSalary, deptId, job, phone) VALUES (@empId, @empName, @empSalary, @deptId, @job, @phone)');
      console.log("body", req.body)
      console.log("addedemployee", addedEmployee)

    return res.status(201).json({
      success: true,
      message: "Employee detail added successfully",
      addedEmployee: addedEmployee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    sql.close();
  }
};

const deleteEmployee = async(req, res) =>{
  try {
      let pool = await sql.connect(config);
      let employee = await pool.request()
          .input('empId', sql.Int, req.params.id)
          .query("DELETE from employee_info WHERE empId = @empId");
      return res.status(202).json({
        success: true,
        message: "Employee detail deleted successfully",
        employee:employee.recordsets
      })
  }
  catch (error) {
    console.error(error);
    response.status(500).json({ 
      success : false,
      message: error.message
     });
}
}

const updateEmployeeDetail = async (req, res) => {
  try {
    let pool = await sql.connect(config);
   
    let addedEmployee = await pool.request()
      .input('empId',  req.params.id)
      .input('empName', req.body.empName)
      .input('empSalary',req.body.empSalary)
      .input('deptId',  req.body.deptId)
      .input('job',  req.body.job)
      .input('phone',  req.body.phone)
      .query('UPDATE employee_info SET phone = @phone, empSalary = @empSalary WHERE empId = @empId');

    return res.status(201).json({
      success: true,
      message: "Employee detail Updated successfully",
      addedEmployee: addedEmployee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    sql.close();
  }
};




module.exports = {getAllEmployees, getSingleEmployee, addEmployeeDetail, deleteEmployee, updateEmployeeDetail}