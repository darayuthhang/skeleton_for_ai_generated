import { AppError, ApiError, OpenAIServiceNotFoundError } from "./app-errors"
import constants from "../constants"
export const centralError = (res, error) => {
    const {STATUS_CODES} = constants;
    console.log(error);
  
    if(error instanceof AppError){
        return res.json(
            { error: error?.message, success: false },
            { status: error?.statusCode })
    }
    if (error instanceof ApiError) {
        return res.json(
            { error: error?.message, success: false },
            { status: error?.statusCode })
    }
    // if(error instanceof OpenAIServiceNotFoundError){
    //     return res.json(
    //         { error: error?.message, success: false },
    //         { status: error?.status || STATUS_CODES.NOT_FOUND })
    // }
    if(error?.issues){
        /**
         * @statuscode 422
         */
        return res.json(
            { error: error?.issues[0]?.message, success: false },
            { status: STATUS_CODES.ZOD_ERROR_CODE })
    }
    /**
      * @statuscode 404
      */
    return res.json(
        { error: error?.message, success: false },
        { status: error?.statusCode || STATUS_CODES.NOT_FOUND })
}
