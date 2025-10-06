import jwt from 'jsonwebtoken'
function auth(req, res, next) {
    const token = req.headers.authorization;
    try {
        const response = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = response.id;
        next();
    } catch(e) {
      res.status(401).json({
        success: false,
        message: "You are not authorized!"
      })
      return;
    }
}

export default auth