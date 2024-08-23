const response = (statusCode, data, message, res) => {
    res.status(statusCode).json({
        status_code: statusCode,
        message: message,
        docs: data,
    });
}

module.exports = response;