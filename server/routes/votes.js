import express from 'express';

import Votes from '../controllers/votes';
import Auth from '../middlewares/auth';

const { voteCandidate } = Votes;
const router = express.Router();

// User vote for a candidate
router.post('/', Auth.verifyToken, voteCandidate);

export default router;