const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Log the request method and path for context
    console.log(`Request Method: ${req.method}, Request Path: ${req.path}`);

    // Get token from header and log it
    const token = req.header('x-auth-token');
    console.log('Token:', token ? token : 'No token provided');

    // If no token, return a 401 response
    if (!token) {
        console.log('Authorization failed: No token');
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Try to verify the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded);

        // Attach the decoded user to the request
        req.user = decoded.user;
        next();
    } catch (err) {
        // Log the error if token verification fails
        console.log('Token verification failed:', err.message);
        return res.status(401).json({ message: 'Token is not valid' });
    }
};
