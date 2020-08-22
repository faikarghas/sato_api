const fs = require('fs')
const jwt = require('jsonwebtoken')


var privateKEY = fs.readFileSync('./key/private.key','utf8')
var publicKEY = fs.readFileSync('./key/public.key','utf8')



module.exports = {
    sign: (payload, options) => {
        // sOptions = {
        //   issuer: "Authorizaxtion/Resource/This server",
        //   subject: "iam@user.me", 
        //   audience: "Client_Identity" // this should be provided by client
        // }

        var signOptions = { 
            issuer:  options.issuer,
            subject:  options.subject,
            audience: options.audience, // this should be provided by client
            expiresIn:  "60000",    // 30 days validity // 1m for dev
            algorithm:  "RS256"
        }
        return jwt.sign(payload, privateKEY, signOptions);

    },
    verify: (token, options) => {
        var verifyOptions = {
            issuer:  options.issuer,
            subject:  options.subject,
            audience: options.audience, // this should be provided by client
            expiresIn:  "60000",
            algorithm:  ["RS256"]
        };
         try{
           return jwt.verify(token, publicKEY, verifyOptions);
         }catch (err){
           return false;
         }
      },
      decode: (token) => {
        return jwt.decode(token, {complete: true});
        //returns null if token is invalid
      }
}