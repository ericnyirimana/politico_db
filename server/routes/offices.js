import express from 'express';

import Offices from '../controllers/offices';
import Auth from '../middlewares/auth';

const { addOffice, getOffices, specificOffices, addCandidate, getVotes } = Offices;
const router = express.Router();

// Create a political office record
router.post('/', Auth.verifyToken, addOffice);
// // Get all political offices record
router.get('/', Auth.verifyToken, getOffices);
// // Get specific political offices record
router.get('/:id', Auth.verifyToken, specificOffices);
// // Add a candidate record
router.post('/:id/register', Auth.verifyToken, addCandidate);
// // View votes result
router.get('/:id/result', Auth.verifyToken, getVotes);

export default router;