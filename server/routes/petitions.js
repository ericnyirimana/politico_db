import express from 'express';

import Petition from '../controllers/petitions';
import Auth from '../middlewares/auth';

const { addPetition } = Petition;
const router = express.Router();

// Create a petition record
router.post('/', Auth.verifyToken, addPetition);

export default router;