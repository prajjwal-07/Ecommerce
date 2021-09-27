const express =require('express');
const { createProduct, getProduct, deleteProduct } = require('../controllers/product');
const router =express.Router();
const multer = require('multer'); 

//middleware for file upload using multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
};
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
      },
    fileFilter: fileFilter
    
});
router.get('/getProduct',getProduct);
router.post('/createProduct',upload.single('image') ,createProduct);
router.delete('/deleteProduct/:id',deleteProduct);

module.exports = router;