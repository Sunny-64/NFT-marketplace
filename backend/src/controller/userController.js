const {createUser, getAllUsers} = require("./../services/user-services"); 
const {loginWithEmailAndPassword} = require("./../services/auth-services");

const register = async (req, res) => {
    const {username, email, password, mobile} = req.body; 
    if(!(username && email && password && mobile)){
        return res.json({
            status : 400, 
            success : false, 
            message : "Invalid inputs"
        }); 
    }
    try{
        await createUser({username, email, password, mobile});  
        return res.json({
            status : 200, 
            success : true, 
            message : "User Registered Successfully"
        }); 
    }
    catch(err){ 
        if(err.message.includes("email")){
            return res.json({
                status : 500, 
                success : false, 
                message : "Invalid Email"
            }); 
        }

        console.log(err);
        return res.json({
            status : 500, 
            success : false, 
            message : "Internal server error"
        }); 
    }
    
}

const login = async (req, res) => {
    try{
        const {email, password} = req.body; 
        const token = await loginWithEmailAndPassword(email, password); 
        return res.status(200).json({success : true, message : "Logged In", token : token});
    }
    catch(err){
        if(err.message.includes("Password Does not match")){
            return res.json({
                status : 500, 
                success : false, 
                message : "Incorrect password"
            });
        }

        if(err.message.includes("User not found")){
            return res.json({
                status : 500, 
                success : false, 
                message : "Invalid User"
            });
        }
        
        console.log(err);
        return res.status(500).json({success : false, message : "Internal error", error : err.message}); 

    }
}

const getUsers = async (req, res) => {
    try{
        return res.status(200).json({success : true, data : await getAllUsers()}); 
    }   
    catch(err){
        return res.status(500).json({success : false, message : "internal error"}); 
    }
}

module.exports = {
    register,
    getUsers, 
    login
}

