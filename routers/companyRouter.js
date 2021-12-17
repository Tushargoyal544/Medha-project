const companyRouter = require("express").Router();
const companyController = require("../controllers/companyController");
const auth = require("../middleware/auth");
/**
   * @swagger
   * /company/createCompany:
   *   post:
   *     tags:
   *       - COMPANY
   *     description: add company
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: token
   *         description: token is required.
   *         in: header
   *         required: true
   *       - name: companyName
   *         description: companyName is required.
   *         in: formData
   *         required: true
   *       - name: founder
   *         description: founder is required
   *         in: formData
   *         required: true
   *       - name: location
   *         description: location is required
   *         in: formData
   *         required: true
   *     responses:
   *       200:
   *         description: company add  successfully
   *       404:
   *         description: Invalid credentials
   *       500:
   *         description: Internal Server Error
   */
companyRouter.post("/createCompany", auth.tokenVerify, companyController.createCompany);

/**
   * @swagger
   * /company/getCompanies:
   *   get:
   *     tags:
   *       - COMPANY
   *     description: get company
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description:get company successfully
   *       404:
   *         description: Invalid credentials
   *       500:
   *         description: Internal Server Error
   */
companyRouter.get("/getCompanies", companyController.getCompanies);

/**
   * @swagger
   * /company/searchCompany:
   *   post:
   *     tags:
   *       - COMPANY
   *     description: searchCompany
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: search
   *         description: search bycompany Name.
   *         in: formData
   *         required: true
   *     
   *     responses:
   *       200:
   *         description: company found successfully
   *       404:
   *         description: Invalid credentials
   *       500:
   *         description: Internal Server Error
   */
companyRouter.post("/searchCompany", companyController.searchCompany);

module.exports = companyRouter;