import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const templateEngineConfis = (app) =>{
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '../views') );// duong dan tuyet doi
    // app.set('views', '../views' ); //duong dan tuong doi
}

export default templateEngineConfis;