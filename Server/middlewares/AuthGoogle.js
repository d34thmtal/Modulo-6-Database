var passport = require('passport');
var GoogleStrategy = require('passport-google-oidc');

const UserModel = require("../models/Users")


const googleObj = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://www.example.com/oauth2/redirect/google'
}



let googleCallback = async function (issuer, profile, cb) {
    const userGoogle = await UserModel.findOne({ email: profile.email });
    if (!userGoogle) {

        const saveUserDb = new UserModel({
            ...profile
        })
        saveUserDb.save();
        return cb(null, saveUserDb);
    }
    return cb(null, userGoogle);
}

passport.use(new GoogleStrategy(googleObj, googleCallback))

