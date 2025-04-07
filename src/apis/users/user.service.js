import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = path.resolve(__dirname, 'users.json');
class UserService{
    getUsers() {  
        try {  
            const data = fs.readFileSync(filePath, 'utf-8');  
            const parsedData = JSON.parse(data);  
            if (!Array.isArray(parsedData)) {
                console.error("Error: File content is not an array");
                return [];
            }
            return parsedData;
        } catch (error) { 
            console.error("Error reading file: ", error);
            return [];  
        }  
    }     
    
    setUsers(data){
        if (!Array.isArray(data)){
            console.error("Error: Data to write is not any array!");
            return;
        }
        try {
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
        } catch (error) {
            console.error("Error writing to file:", error);
        }
    }
}
export default new UserService();