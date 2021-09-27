const express = require('express');
const { getCategory ,createCategory, updateCategory, deleteCategory} = require('../controllers/category');
const router = express.Router();
const userAuth = require("../middleware/userAuth");
const adminAuth = require("../middleware/adminAuth");

router.get("/getCategory",userAuth, getCategory);
router.post("/createCategory",userAuth, adminAuth, createCategory);

router.put("/updateCategory/:id",userAuth, adminAuth, updateCategory);
router.delete("/deleteCategory/:id",userAuth,adminAuth,deleteCategory);

module.exports = router;