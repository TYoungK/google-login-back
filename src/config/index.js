'use strict'

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port : process.env.PORT,
  mysql:{
    host : process.env.MYSQL_HOST,
    user : process.env.MYSQL_USER,
    port : process.env.MYSQL_PORT,
    password : process.env.MYSQL_USER_PASSWORD,
    database : process.env.DATABASE
  },
  google:{
    CLIENT_ID : process.env.GOOGLE_CLIENT_ID,
    SECRET_ID : process.env.GOOGLE_SECRET_ID,
    AUTH_URL : "https://accounts.google.com/o/oauth2/v2/auth",
    AUTH_TOKEN_URL : "https://oauth2.googleapis.com/token",
    AUTH_REDIRECT_URL : "http://localhost:8000/user/auth/google/callback",
  }
}