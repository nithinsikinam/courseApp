const express = require('express');
const router = express.Router();
const users = require('./schemas/users');
const UserOTPVerification = require('./schemas/UserOTPVerification')

router.post('/login', async (req,res) => {
    console.log(req.body._id);
     console.log(req.body.Password);
    const search = await users.find({"_id":req.body._id})
    if(search.length==1){      
    if(await bcrypt.compare(req.body.Password,search[0]["Password"])){
    const id = req.body._id;
    const user = {"id":id} ;
    const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)   
    res.json({"value":"yes","access_token":accessToken})
    }else{
    res.json({"value":"no"})
   }}
    else{
    res.json({"value":"no"})
    }
})

router.post('/register', async (req,res) => { 

    const userid = req.body.emailid.split("@")[0]
    
    const search = await users.find({"userid":userid})
    if(search.length!==0){
        res.status(400).json({"status":"CHOOSE_ANOTHER_EMAIL"})
    }
else{
    const hashedPassword = await bcrypt.hash(req.body.password,10)

    const user = await users.create({
        userid:userid,
        emailid:req.body.emailid,
        password:hashedPassword,
        intrests:intrests,
        verified:false
    }
        )
await user.save()


    const otp = await UserOTPVerification.create({

    })
res.json({"status":"CREATED_TEMPORARY_ACCOUNT"})
    }
    })

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)
    
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user) =>{
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}  