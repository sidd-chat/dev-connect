const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if(!token) {
    return res.status(401).json({
      error: true,
      message: 'Token Invalid. Access Denied!'
    });
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    next();
  } catch(err) {
    console.log('Verification Error:', err);
    return res.status(400).json({
      error: true,
      message: 'Token Invalid. Access Denied!'
    })
  }
}

module.exports = authMiddleware;