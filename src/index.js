import express from 'express';
import router from './routes/app.js';
import errorHandler from './middleware/errorHandler.middleware.js';
import templateEngineConfis from './config/templateEngine.config.js';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';
import {connectDB} from './config/db.config.js'
import 'dotenv/config';
import bodyParser from 'body-parser';
import multer from 'multer';
import { MongoClient } from 'mongodb';

const startApp = () => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const app = express();
    const port = 3000;
    const myurl = 'mongodb://localhost:27017';
    app.use(express.json());
    //create express app
    app.use(bodyParser.urlencoded({extended: true}))

    app.get('/', function(req, res) {
        res.json({ message: 'WELCOME' });   
    });

    // ROUTES
    app.get('/',function(req,res){
        res.sendFile(__dirname + '/index.html');
    })
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
            const ext = path.extname(file.originalname)
          cb(null, file.fieldname + '-' + Date.now() + ext)
        }
      })
       
      var upload = multer({ storage: storage })
      app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
        const file = req.file
        if (!file) {
          const error = new Error('Please upload a file')
          error.httpStatusCode = 400
          return next(error)
        }
        res.send(file)
      })
      
        //Uploading multiple files
    app.post('/uploadmultiple', upload.array('myFiles', 12), (req, res, next) => {
        const files = req.files
        if (!files) {
        const error = new Error('Please choose files')
        error.httpStatusCode = 400
        return next(error)
        }
        res.send(files)
    })
     

    MongoClient.connect(myurl, (err, client) => {
        if (err) return console.log(err)
        db = client.db('test') 
        app.listen(3000, () => {
          console.log('listening on 3000')
        })
      })
      // chuc nang cua db 
      app.post('/uploadphoto', upload.single('picture'), (req, res) => {
        var img = fs.readFileSync(req.file.path);
        var encode_image = img.toString('base64');
        // Define a JSONobject for the image attributes for saving to database
      
        var finalImg = {
          contentType: req.file.mimetype,
          image:  new Buffer(encode_image, 'base64')
        };
        db.collection('quotes').insertOne(finalImg, (err, result) => {
          console.log(result)
      
          if (err) return console.log(err)
      
          console.log('saved to database')
          res.redirect('/')
        })
      })

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
