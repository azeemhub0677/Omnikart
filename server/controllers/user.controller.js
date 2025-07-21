import sendEmail from '../config/sendEmail.js';
import UserModel from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';
import generatedAccessToken from '../utils/generatedAccessToken.js';
import generatedRefreshToken from '../utils/generatedRefreshToken.js';

//USER REGISTER CONTROLLER

export async function registerUserConroller(request, response) {
    try {
        const {name ,email ,password} = request.body ?? {};

        if(!name || !email || !password){
            return response.status(400).json({
                message :"Provide email, name, password",
                error : true,
                success : false
            })
        }

        const user = await UserModel.findOne({ email })

        if(user){
            return response.json({
                message : "Already register email",
                error : true,
                success : false
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password,salt)

        const payload = {
            name,
            email,
            password : hashPassword
        }

        const newUser = new UserModel(payload)
        const save = await newUser.save()

        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verfiy-email?code=${save?._id}`

        const verifyEmail = await sendEmail({
            sendTo : email,
            subject : "Verify email from Omnikart",
            html : verifyEmailTemplate({
                name,
                url : verifyEmailUrl
            })
        })

        return response.json({
            message : "User register successfully",
            error : false,
            success : true,
            data : save
        })

    } catch (error) {
         return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
         })
         

    }
}

//EMAIL VERIFY CONTROLLER

export async function verfiyEmailController(request,response) {
    try {
        const { code } = request.body;

        const user = await UserModel.findOne({_id : code})

        if(!user){
            return response.status(400).json({
            message : 'Invalid code',
            error :true,
            success :false
        })
        }

        const updateUser = UserModel.updateOne({_id : code},{
            verify_email : true
        })

        return response.json({
            message : 'Verify email done',
            error :false,
            success :true
        })
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error :true,
            success :true
        })
    }
}

//LOGIN CONTROLLER
export async function loginController(request,response) {
    try {
        
        const { email, password } = request.body;

        if(!email || !password){
            return response.status(400).json({
            message : "Provide email and password",
            error :true,
            success :false
        })
        }

        const user = await UserModel.findOne({email});

        if(!user){
            return response.status(400).json({
            message : "User not register",
            error :true,
            success :false
        })
        }

        if(user.status !== "Active"){
            return response.status(400).json({
            message : "Connect to Admin",
            error :true,
            success :false
        })
        }

        const checkPassword = await  bcryptjs.compare(password,user.password);

        if(!checkPassword){
            return response.status(400).json({
            message : "Check your password",
            error :true,
            success :false
        })
        }


        const accesstoken = await generatedAccessToken(user._id);
        const refreshtoken = await generatedRefreshToken(user._id); 

        const cookiesOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }

        response.cookie('accesstoken',accesstoken,cookiesOption);
        response.cookie('refreshtoken',refreshtoken,cookiesOption);

        return response.json({
            message : "Login successfully",
            error :false,
            success :true,
            data : {
                accesstoken,
                refreshtoken
            }
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error :true,
            success :false
        })
    }
}