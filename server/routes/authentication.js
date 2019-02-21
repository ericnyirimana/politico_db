import express from 'express';

import Users from '../controllers/users';

const { userSignup, userLogin } = Users;

const router = express.Router();

// Create a user record
router.post('/signup', userSignup);

// Login into the account
router.post('/login', userLogin);

export default router;