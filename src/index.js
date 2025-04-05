import express from 'express';  
import fs from 'fs';  

const app = express();  
const port = 3000;  
const filePath = 'users.json';  

app.use(express.json());  

const readUsersFromFile = () => {  
    try {  
        const data = fs.readFileSync(filePath, 'utf-8');  
        const parsedData = JSON.parse(data);  
        if (Array.isArray(parsedData)){
            console.error("Error: File content is not any array");
            return [];
        }
        return parsedData;
    } catch (error) { 
        console.error("Error reading file: ", error);
        return [];  
    }  
};  

const writeUsersToFile = (data) => {
    if (!Array.isArray(data)){
        console.error("Error: Data to write is not any array!");
        return;
    }
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error("Error writing to file:", error);
    }
};

let mockUser = readUsersFromFile();  

app.get('/users', (req, res) => {  
    res.json(mockUser);  
});  
 
app.get('/users/:id', (req, res) => {
    const user = mockUser.find((u) => u.id === Number(req.params.id));
    if (!user){
        return res.status(404).json({message: "User not found"});
    }
    res.json(user);
});

app.post('/users', (req, res) => {
    const { name } = req.body;
    if (!name){
        return res.status(400).json({message: "Name is required"});
    }
    const id = mockUser.length > 0 ? mockUser[mockUser.length - 1].id + 1 : 1;
    const newUser = { id, name };
    
    mockUser.push(newUser);
    writeUsersToFile(mockUser);
    res.status(201).json({message: "User add successfully", newUser});
});

app.put('/users/:id', (req, res) => {
    const userId = Number(req.params.id);
    const { name } = req.body;
    const user = mockUser.find((u) => u.id === userId);
    if (!user){
        return res.status(400).json({message: "User not found"});
    }
    if (!name){
        return res.status(400).json({message: "Name is required"});
    }
    user.name = name;
    writeUsersToFile(mockUser);
    res.json(user);
});

app.delete('/users/:id', (req, res) => {
    const idUser = Number(req.params.id);
    const userIndex = mockUser.findIndex((u) => u.id === idUser);
    if (userIndex == -1){
        return res.status(404).json({message: "User not found"});
    }
    mockUser.splice(userIndex, 1);
    writeUsersToFile(mockUser);
});

app.listen(port, () => {  
    console.log(`Example app listening on port ${port}`);  
});  
