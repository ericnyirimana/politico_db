import express from 'express';

import Parties from '../controllers/parties';
import Auth from '../middlewares/auth';

const { addParty, getParties, specificParty, updateParty, deleteParty } = Parties;
const router = express.Router();

// Create a political party record
router.post('/', Auth.verifyToken, addParty);
// // Get all political parties record
router.get('/', Auth.verifyToken, getParties);
// // Get specific political party record
router.get('/:id', Auth.verifyToken, specificParty);
// // Update political party name
router.patch('/:id', Auth.verifyToken, updateParty);
// // Update political party name
router.delete('/:id', Auth.verifyToken, deleteParty);

export default router;