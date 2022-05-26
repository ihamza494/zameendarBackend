module.exports = {
    Doctors: (req, res, next) => {
        // 401 Unauthorized
        // 403 Forbidden
        if (!(req.Doctors.userType.toString() == "Doctor"))
            return res.status(403).send('Access denied.');
        next();
    },
    patient: (req, res, next) => {
        if (!(req.patient.userType.toString() == "patient"))
            return res.status(403).send('Access denied.');
        next();
    }
}