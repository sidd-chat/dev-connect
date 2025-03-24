const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if(!token) {
    return res.status(401).json({
      error: true,
      message: 'Token Invalid. Access Denied!!'
    });
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    console.log(req.user)
    req.user = { _id: verified.userId };
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