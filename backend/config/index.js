// module.exports = {
//     environment: process.env.NODE_ENV || 'development',
//     port: process.env.PORT || 8000,
//     dbFile: process.env.DB_FILE,
//     jwtConfig: {
//       secret: process.env.JWT_SECRET,
//       expiresIn: process.env.JWT_EXPIRES_IN
//     }
//   };


module.exports = {
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8000,
  dbFile: process.env.DB_FILE || 'backend/db/dev.db',
  jwtConfig: {
    secret: process.env.JWT_SECRET || "wKcdLRgJ+Xe8wg==",
    expiresIn: process.env.JWT_EXPIRES_IN || 604800
  }
}
