import express from 'express';  
import routers from './apis/index.js';

const app = express();  
const port = 3000;  

app.use(express.json());  
app.use(express.urlencoded());
app.use('/',routers);

app.listen(port, () => {  
    console.log(`Example app listening on port ${port}`);  
});  
