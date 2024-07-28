export function customResponse (req, res, next){
    res.customResponse = function (statusCode, message, data={}){
        res.status(statusCode).json({
            message,
            data,
            success:statusCode < 400,
        })
    };
    next();
}