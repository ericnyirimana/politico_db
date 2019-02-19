import express from 'express';

import Parties from '../controllers/offices';
import Auth from '../middlewares/auth';

const { addOffice, getOffices } = Parties;
const router = express.Router();

// Create a political office record
router.post('/', Auth.verifyToken, addOffice);
// // Get all political offices record
router.get('/', Auth.verifyToken, getOffices);
// // Get specific political offices record
// router.get('/:id', specificOffices);

export default router;