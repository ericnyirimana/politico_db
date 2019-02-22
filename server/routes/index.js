import express from 'express';

import parties from './parties';
import offices from './offices';
import votes from './votes';
import authentication from './authentication';
import petition from './petitions';

const app = express();


app.use('/parties', parties);
app.use('/offices', offices);
app.use('/auth', authentication);
app.use('/votes', votes);
app.use('/petition', petition);

export default app;