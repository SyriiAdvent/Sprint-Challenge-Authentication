const sessionConfig = {
  name: 'sessionAuth',
  secret: process.env.SESSION_SECRET || 'Pneumonoultramicroscopicsilicovolcanoconiosis',
  resave: false,
  saveUninitialized: process.env.SEND_COOKIES || true,
  cookie: {
    maxAge: 1000 * 30,
    secure: process.env.USE_COOKIE_SECURE || false,
    httpOnly: true
  },
};

module.exports = sessionConfig;