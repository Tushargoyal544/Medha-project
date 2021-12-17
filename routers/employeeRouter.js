const employeeRouter = require("express").Router();
const employeeController = require("../controllers/employeeController");
const auth = require("../middleware/auth");

/** User SignUp Api's Routing */

/**
   * @swagger
   * /employee/signUp:
   *   post:
   *     tags:
   *       - EMPLOYEE
   *     description: signup api for user
   *     produces:
   *       - application/json
   *     parameters:
   *      
   *       - name: name
   *         description: name is required.
   *         in: formData
   *         required: true
   *       - name: phoneNumber
   *         description: phoneNumber is required
   *         in: formData
   *         required: true
   *       - name: email
   *         description: email is required
   *         in: formData
   *         required: true
   *       - name: password
   *         description: password is required
   *         in: formData
   *         required: true
   *       - name: companyName
   *         description: companyName is required
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: signup  successfully
   *       404:
   *         description: Invalid credentials
   *       500:
   *         description: Internal Server Error
   */
employeeRouter.post("/signUp", employeeController.signUp);

/**
   * @swagger
   * /employee/logIn:
   *   post:
   *     tags:
   *       - EMPLOYEE
   *     description: logIn api for user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: email
   *         description: email is required
   *         in: formData
   *         required: true
   *       - name: password
   *         description: password is required
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: logIn  successfully
   *       404:
   *         description: Invalid credentials
   *       500:
   *         description: Internal Server Error
   */
employeeRouter.post("/logIn", employeeController.logIn);

/**
   * @swagger
   * /employee/listEmployee:
   *   get:
   *     tags:
   *       - EMPLOYEE
   *     description: listEmployee api for user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: companyName
   *         description: companyName is required
   *         in: query
   *         required: true
   *      
   *     responses:
   *       200:
   *         description: listEmployee  successfully
   *       404:
   *         description: Invalid credentials
   *       500:
   *         description: Internal Server Error
   */
employeeRouter.get("/listEmployee", employeeController.listEmployee);

module.exports = employeeRouter;