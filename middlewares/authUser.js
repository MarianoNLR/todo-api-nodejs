import jwt, { decode } from 'jsonwebtoken'


const { JWT_SECRET } = process.env

export const authUser = (req, res, next) => {
  const authorization = req.get('authorization')
  let token = ''
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }
  const decodedToken = jwt.verify(token, JWT_SECRET)

  if (!token || !decodedToken.userId) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const { userId } = decodedToken
  req.userId = userId
  next()

}