import jwt from 'jsonwebtoken';
import { AppError } from './error-handler/app-errors';

class JwtHelpers {
    async ValidateSignature(accessTokenSecret, signature) {
        let payload = null;
        try {
            payload = await jwt.verify(signature, accessTokenSecret);
        } catch (error) {
        }
        return payload;
    }
    async GenerateAccessToken(payload, secretAccessToken, expiration) {
        try {
            if (!secretAccessToken) throw new Error("Access Token Secret does not exist.")
            // 20m
            return await jwt.sign(payload, secretAccessToken, { expiresIn: expiration });
        } catch (error) {
            throw new AppError('Access Token Secret does not exist.', 404);
        }
    }
}
export default new JwtHelpers();
