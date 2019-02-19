import express from 'express';

import Offices from '../controllers/offices';
import Auth from '../middlewares/auth';

const { addOffice, getOffices, specificOffices, addCandidate } = Offices;
const router = express.Router();

// Create a political office record
router.post('/', Auth.verifyToken, addOffice);
// // Get all political offices record
router.get('/', Auth.verifyToken, getOffices);
// // Get specific political offices record
router.get('/:id', Auth.verifyToken, specificOffices);
// // Add a candidate record
router.post('/:id/register', Auth.verifyToken, addCandidate);

export default router;