import express from 'express';

import { addParty, getParties, specificParty, deleteParty, updateParty } from '../controllers/parties';

const router = express.Router();

// Create a political party record
router.post('/', addParty);
// Get all political parties record
router.get('/', getParties);
// Get specific political party record
router.get('/:id', specificParty);
// Delete specific political party record
router.delete('/:id', deleteParty);
// Update specific political party record
router.patch('/:id', updateParty);

export default router;