
import constants from './constants';
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs';

class Helper {
    formatDate(date){
        return dayjs(date).format('MM/DD/YYYY');
    }
    formatDateForSitemap(date){
        return dayjs(date).format('YYYY-MM-DD');
    }
    inputEmpty = (input) => {
        return input === '';
    }


    getUserId(session) {
        const refreshToken = session?.refreshToken;
        if (refreshToken) {
            var decoded = jwt_decode(refreshToken);
            return decoded?.userId;
        }
        return null;
    }
   
    mapStatusCodeToMessage(status) {
        switch (status) {
            case 400:
                return 'Invalid input. Please check your data.';
            case 401:
                return 'Unauthorized. Please log in.';
            case 413:
                return "Maximum tokens limit are 17745 characters."
            case 429:
                return "You have reached daily requests for today."
            case 404:
                return "Unable to fetch data at the moment. Please try again later. ";
            case 500:
                return 'An error occurred. Please try again later.';
            default:
                return 'An error occurred.';
        }
    }
    //signup
    mapUserStatusCodeToMessage(status) {
        switch (status) {
            case 404:
                return "Email already exist. ";
            case 400:
                return 'Please activate your account';
            case 500:
                return 'Unable to Find active user.';
            default:
                return 'An error occurred.';
        }
    }
    mapUserLoginStatusCodeToMessage(status) {
        switch (status) {
            case 400:
                return 'An error occurred.';
            case 404:
                return "Password not found ";
            case 409:
                return "User already exist in gmail user.";
            case 406:
                return "User does not exist ";
            case 500:
                return 'Unable to Find active user.';
            default:
                return 'An error occurred.';
        }
    }
    mapGoogleUserStatusCodeToMessage(status) {

        switch (status) {
            case 400:
                return 'Please activate your account';
            case 409:
                return 'User already exist in custom user';
            case 404:
                return "User signup with exist email. ";
            case 500:
                return 'An error occurred.';
            default:
                return 'An error occurred.';
        }
    }
    mapResentCodeStatusCodeToMessage(status) {
        switch (status) {
            case 400:
                return 'Please activate your account';
            case 404:
                return "Email already exist. ";
            case 429:
                return 'You can only send 5 request per hour.';
            default:
                return 'An error occurred.';
        }
    }
    mapUserVerifyUserStatusCodeToMessage(status) {
        switch (status) {
            case 404:
                return "Invalid verification code.";;
            default:
                return 'An error occurred.';
        }
    }
    mapUserStatusCodeDotaToMessage(status) {
        switch (status) {
            case 404:
                return "User is not found ";
            case 422:
                return 'Input cannot be empty';
            default:
                return 'An error occurred.';
        }
    }
    errorMessage = (statusCode, serverStatusCode, errorMessage) => {
        let message = '';
        if (statusCode === serverStatusCode) {
            message = errorMessage;
        }
        if (message) {
            return message;
        }
    }
    checkForPasswordError(value) {
        const regex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
        if (value) {
            if (value.length < 8 && value.length > 0) {
                return 'Password must be at least 8 characters'
            } else if (!regex.test(value) && value.length > 0) {
                return 'Password must contain at least one letter and one number'
            }
        }
        return null;
    }
    isAuth(status, accessToken) {
        return status === constants.NEXT_AUTHENTICATE && accessToken
    }
    isExpiredToken(token) {
        if (token) {
            var decoded = jwt_decode(token)
            const isToken = decoded?.exp * 1000 < Date.now();
            return isToken;
        }
        return null;
    }
    mapGetStoryListStatusCodeToMessage(status) {
        switch (status) {
            case 404:
                return "An error occured";
            default:
                return 'An error occurred.';
        }
    }

    mapSubNewsletterStatusCodeToMessage(status) {
        switch (status) {
            case 200:
                return "Subscription successful! Confirm via email to receive our stories."
            case 404:
                return "An error occured";
            case 422:
                return "Not valid email.";
            case 400:
                return "Email already exist";
            case 201:
                return "Please confirm your subscription via email to start receiving our stories.";
            default:
                return 'An error occurred.';
        }
    }

}
export default new Helper();
