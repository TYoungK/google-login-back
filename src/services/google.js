'use strict'

const axios = require('axios');
const config = require('../config');
const UserService = require('./user');
const {verifyToken, makeAccessToken, makeRefreshToken} = require('./jwt');


exports.Silent_Refresh = (req, res) => {
    const {refreshToken} = req.cookies;
    console.log(req.cookies);
    const verifyAccessToken = verifyToken(refreshToken);
  
    if(verifyAccessToken.id){
      // refresh Token 갱신 
      const accessToken = makeAccessToken(verifyAccessToken.id);
      const refreshToken = makeRefreshToken(verifyAccessToken.id);
  
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true
      });
      return res.json({accessToken, user_id: req.cookies.user_id});
      
    }
    
    return res.json({test:"Test"})
}

exports.CollBackProcess = async (req, res) => {
    //console.log(req.query);
    const {code} = req.query;
    try{
        const {data} = await axios({
            method: 'POST',
            url: `${config.google.AUTH_TOKEN_URL}`,
            headers:{
                'content-type':'application/x-www-form-urlencoded;charset=utf-8'
            },
            params:{
                grant_type: 'authorization_code',
                client_id:config.google.CLIENT_ID,
                client_secret:config.google.SECRET_ID,
                redirectUri:config.google.AUTH_REDIRECT_URL,
                code:code,
            }
        });

        const access_token = data['access_token'];
    
        const {data:me} = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
        const {sub, email, name} = me;
        const userInfo = {
            email: email,
            name:name,
            sub : sub,
            profile_uri : "",
            type:'google',
        };
        
        const user = await UserService.getUserbySub(userInfo.sub,userInfo.type);
        if(user){
            console.log("로그인");
            const refreshToken = makeRefreshToken(user.id);
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true
            });
            res.cookie('user_id', user.id, {
                httpOnly: true
            });
        }else{
            const signUpUserId= await await UserService.Create(userInfo);
            // 가입 완료 후 바로 로그인 로직으로 넘겨서 로그인 되게끔 진행한다 
            const refreshToken = makeRefreshToken(signUpUserId);
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true
            });
            res.cookie('user_id', user.id, {
                httpOnly: true
            });
        }
    }
    catch (err){
        console.log(err);
    }
    res.redirect("http://localhost:3000");
}

