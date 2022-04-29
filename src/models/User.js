'use strict'
const db = require('../config/db');

class User{
  
  constructor(user){
    this.email = user.email;
    this.name = user.name;
    this.sub = user.sub;
    this.type = user.type;
    this.profile_uri = user.profile_uri;
  }
  
  Login(){

  }

  SignUp(){

  }
  
}

module.exports = User;
