const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { mongooseToObject } = require('../../util/mongoose');

let refreshTokens = [];

class UserController {
    login(req, res, next) {
        res.render('user/login');
    }

    pass(req, res, next) {
        var email = req.body.email
        var password = req.body.password
        const user = new User(req.body);

        User.findOne({
            email: email,
            password: password
        })
        .then(user => {
            if(user) {
                const accessToken = jwt.sign({
                    id: user.id,
                    email: user.email
                },
                "secretkey", 
                {expiresIn: "365d"}
                );
                const refreshToken = jwt.sign({
                    id: user.id,
                    email: user.email
                },
                "secretkey1", 
                {expiresIn: "365d"}
                );
                refreshTokens.push(refreshToken);
                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                })
                res.json({accessToken});
                res.redirect('/');
            } else {
                res.status(300).json('Email hoac mat khau khong dung!');
            }
        })
        .catch(err=>{
            res.status(500).json('Dang nhap that bai!');
        })
    }

    register(req, res, next) {
        res.render('user/register');
    }

    store(req, res, next) {
        const user = new User(req.body);
        user.save()
        .then(data=>{
            res.render('user/login');
        })
        .catch(err=>{
            res.status(500).json('Email nay da duoc dung!');
        })
    }

    refresh(req, res, next) {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(401).json('Ban phai dang nhap!');
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(403).json('Refresh token is not valid!')
        }
        jwt.verify(refreshToken, "secretkey1", (err, user)=>{
            if(err){
                console.log(err);
            }
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
            const newAccessToken = jwt.sign({
                id: user.id,
                email: user.email
            },
            "secretkey", 
            {expiresIn: "365d"}
            );
            const newRefreshToken = jwt.sign({
                id: user.id,
                email: user.email
            },
            "secretkey1", 
            {expiresIn: "365d"}
            );
            refreshTokens.push(newRefreshToken)
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            })
            res.status(200).json({ accessToken: newAccessToken })
        })
    }

    logout(req, res, next) {
        res.clearCookie("refreshToken");
        refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken);
        res.redirect('/user/login');
    }
}

module.exports = new UserController();
