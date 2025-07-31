import bcrypt from "bcryptjs";

class HashProvides{
    async generateHash(plainText){
        const salt = await bcrypt.genSalt(8);
        const hashString = await bcrypt.hash(plainText, salt);
        return { hashString, salt};
    }

    async compareHash(plainText, hashString){
        console.log(hashString);
        
        const isMatch = await bcrypt.compare(plainText, hashString);
        console.log(isMatch);
        
        return isMatch;
    }
}
export default new HashProvides();
