import express from 'express';
import router from './routes/app.js';
import errorHandler from './middleware/errorHandler.middleware.js';
import templateEngineConfis from './config/templateEngine.config.js';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';
import {connectDB} from './config/db.config.js'
import 'dotenv/config';

const startApp = () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const app = express();
    const port = 3000;

    app.use(express.json());

    app.use('/', router);
    templateEngineConfis(app);
    app.use(errorHandler);
    app.use(express.static(path.join(__dirname, 'public')));
    app.listen(port, () => {
        console.log(`Example app listening on port http://localhost:${port}`);
    });
}

(async () => {
    try{
        await connectDB();
        console.log('Connected to MongoDB');
        startApp();
    } catch(err){
        console.log('Error connecting to MongoDB: ', err);
        process.exit(1);
    }
})();
