import express from 'express';

import Users from '../controllers/users';

const { userSignup } = Users;

const router = express.Router();

// Create a user record
router.post('/signup', userSignup);

// End Create a user record

export default router;