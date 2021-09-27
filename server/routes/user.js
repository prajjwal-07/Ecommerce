const express = require('express');
const router = express.Router();
const {signup, login, logout, refreshToken} = require('../controllers/user');


router.post('/signup',signup);
router.post('/login',login);
router.get('/logout',logout);
router.get('/refresh_token',refreshToken);



module.exports = router;