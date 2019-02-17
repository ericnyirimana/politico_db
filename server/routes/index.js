import express from 'express';

import parties from './parties';
import offices from './offices';
import authentication from './authentication';

const app = express();


app.use('/parties', parties);
app.use('/offices', offices);
app.use('/auth', authentication);

export default app;