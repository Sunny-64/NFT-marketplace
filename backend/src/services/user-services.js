const User = require("./../models/user-model"); 
const bcrypt = require("bcrypt"); 

const createUser = async (userInfo) => {
    const {username, email, password, mobile} = userInfo; 
    try{
        const newUser = new User({
            username, 
            email, 
            password : await bcrypt.hash(password, 10), 
            mobile
        }); 

        const user = await newUser.save(); 
        return user; 
    }
    catch(err){
        throw new Error(err.message); 
    }
}

const getAllUsers = async () => {
    try{
        return await User.find(); 
    }
    catch(err){
        throw new Error(err.message)
    }
}


module.exports = {
    createUser,
    getAllUsers
}; 