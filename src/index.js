import express from 'express';

import router from './routes/app.js';
import errorHandler from './middleware/errorHandler.middleware.js';

const app = express();
const port = 4000;

app.use(express.json());

app.use('/', router);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});