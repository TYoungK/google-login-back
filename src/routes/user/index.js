const express = require('express');
const router = express.Router();
const config = require('../../config');
const User = require('../../services/user');
const google = require('../../services/google');

router.get("/", async (req, res, next) =>{
    return res.json(await User.getUsers());
});

router.get("/:user_id", async (req, res, next) =>{
    return res.json(await User.getUser(req.params.user_id));
});

router.put("/", async (req, res, next) =>{
    return res.json(await User.Update(req.body.user_id, req.body.name, req.body.profile_uri));
});

router.get("/auth/google", (req, res, next) => {
    return res.redirect(`${config.google.AUTH_URL}?client_id=${config.google.CLIENT_ID}&redirect_uri=${config.google.AUTH_REDIRECT_URL}&response_type=code&include_granted_scopes=true&scope=https://www.googleapis.com/auth/userinfo.email`);
})

router.get("/auth/google/callback", async (req, res, next) => {
    return google.CollBackProcess(req, res);
});

router.post("/auth/silent-refresh", (req, res, next) =>{
    return google.Silent_Refresh(req,res);
});



module.exports = router;