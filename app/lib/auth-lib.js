import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import constants from './constants';
import jwt_decode from "jwt-decode";
import { AppError } from './error-handler/app-errors';
const { AUTH_METHOD, STATUS_CODES } = constants;
class AuthLib {
    constructor() {
        // You can initialize anything here if needed
    }

    GetVerificationCode() {
        return crypto.randomBytes(3).toString('hex');
    }

    GetToken() {
        return crypto.randomBytes(32).toString("hex");
    }

    async GenerateSalt() {
        return await bcrypt.genSalt();
    }

    async GeneratePassword(password, salt) {
        return await bcrypt.hash(password, salt);
    }

    async isPassword(userLoginPassword, userSignUpPassword) {
        let boolean = await bcrypt.compare(userLoginPassword, userSignUpPassword);
        return boolean;
    }

    async GenerateAccessToken(payload) {
        try {
            if (!process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET) throw new Error("Access Token Secret does not exist.")
            // 20m

            return await jwt.sign(payload, process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
        } catch (error) {
            throw new AppError('Access Token Secret does not exist.', STATUS_CODES.NOT_FOUND);
        }
    }
    async GenerateResetPassToken(payload) {
        try {
            if (!process.env.NEXT_PUBLIC_RESET_PASS_JWT) throw new Error("Access Token Secret does not exist.")
            // 20m
            return await jwt.sign(payload, process.env.NEXT_PUBLIC_RESET_PASS_JWT, { expiresIn: '3m' });
        } catch (error) {
            throw new AppError('Access Token Secret does not exist.', STATUS_CODES.NOT_FOUND);
        }
    }


    async GenerateRefreshToken(payload) {
        try {
            if (!process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET) throw new AppError('Refresh Token Secret does not exist');
            // 24h
            return await jwt.sign(payload, process.env.NEXT_PUBLIC_REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
        } catch (error) {
            throw new AppError('Refresh Token Secret does not exist.', STATUS_CODES.NOT_FOUND);
        }
    }

    async FormatGoogleUser(dbGoogleId, googleId, user) {
        let userData = {};
        if (dbGoogleId == googleId) {
            let userObject = { userId: user?.id }
            const accessToken = await this.GenerateAccessToken(userObject);
            const refreshToken = await this.GenerateRefreshToken(userObject);
            userData = {
                accessToken,
                refreshToken,
                userId: user?.id,
                firstName: user?.first_name,
                lastName: user?.last_name,
                email: user?.email,
                updated_at: user?.created_at
            }
            return userData;
        }
        return userData;
    }
    async ValidateResetPassSignature(signature) {
        try {

            const payload = await jwt.verify(signature, process.env.NEXT_PUBLIC_RESET_PASS_JWT);
            
            return {
                payload,
                isValid:true
            };
        } catch (error) {
            return {
               
                isValid: false
            }
        }
    }

    async ValidateSignature(req, signature) {
        try {

            const payload = await jwt.verify(signature.split(" ")[1], process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET);
            req.user = payload;
            return true;
        } catch (error) {
            return false;
        }
    }

    async VerifyToken(incomingToken, secretToken) {
        let user = await jwt.verify(incomingToken, secretToken);
        return user;
    }

    isObjectEmpty(objectName) {
        return JSON.stringify(objectName) === "{}";
    }

    async getGoogleUserInfo(googleToken) {
        const url = 'https://www.googleapis.com/oauth2/v3/userinfo';
        try {
            let userInfo = await axios.get(url, {
                headers: {
                    "Authorization": `Bearer ${googleToken}`
                }
            });
            return userInfo?.data;
        } catch (error) {
            throw Error(error.message);
        }
    }
    
  
}
export default  new AuthLib();
