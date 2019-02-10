import express from 'express';

import parties from './parties';

const app = express();


app.use('/parties', parties);

export default app;