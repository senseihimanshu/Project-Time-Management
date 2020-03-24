module.exports = function(req, res, next){
    return (req.employee.role !== 'admin'? res.status(403).send({
        success: false,
        payload: {
            message: 'You are not authorized to access this link'
        }
    }): next());
}