import jwtHelpers from "@/app/lib/jwt-helpers";
import jwt_decode from "jwt-decode";
export async function isAuthorization(request){
    const accessToken = request.headers.get("authorization")?.split(' ')[1];
    if (!accessToken || await !jwtHelpers.ValidateSignature(process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET, accessToken)) {
        return false;
    }
    return true;
}
export function getUserIdAfterAuthorize(request){
    try {
        const accessToken = request.headers.get("authorization")?.split(' ')[1];
        if (!accessToken) throw new Error(`getUserIdAfterAuthorize accessToken does not exist`);
        let userId = jwt_decode(accessToken);
        return userId?.userId 
    } catch (error) {
        throw new Error(`getUserIdAfterAuthorize ${error}`);
    }
    
}
