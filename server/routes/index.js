import express from 'express';

import parties from './parties';
import offices from './offices';

const app = express();


app.use('/parties', parties);
app.use('/offices', offices);

export default app;