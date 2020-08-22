const bcrypt = require('bcryptjs')
const {sign,verify,decode} = require('../lib/jwt')

hashPassword = pass => {

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(pass, salt);
    return hash
    // return typeof pass
}

module.exports = {
    register : (req,res) => {
        const db = require('../db');

        let email = req.body.email
        let password = req.body.password

        let data = {email, hashPassword: hashPassword(password)};

        console.log(data);

        // cek email sudah terdaftar / belum
        let checkEmailQuery = `select * from users where email = ?`
        db.query(checkEmailQuery,email,(err,result)=>{
            if (result.length > 0) {
                res.send({
                    status: true,
                    notif: 'email sudah terdaftar'
                })
            } else {
                let sql = 'insert into users set ?';
                db.query(sql, data, (err, result) => {
                    if(err) {
                        console.log(err);
                    } else {
                        res.status(201).send(result)
                    }
                })
            }
        })


    },
    login : (req, res) => {

        var email   = req.body.email
        var password    = req.body.password

        var checkEmailQuery     = `SELECT hashPassword FROM users where email = ? ` ;
        const db    = require('../db')
        db.query(checkEmailQuery,email, (err, resp) => {
            // cek email ada atau tidak
            if(resp.length > 0){
                let newpass = resp;
                let hash = newpass[0].hashPassword.toString()
                //  jika ada cek pass nya match atau tidak
                bcrypt.compare(password,hash).then( passMatch =>{
                    let getUsersInformation = `SELECT * FROM users where hashPassword = ?`;
                    // ambil informasi dari user
                    db.query(getUsersInformation,hash, (err2,resp2)=>{
                        // cek jika pass match dan informasi dr user ada / tidak
                        if(passMatch && resp2.length > 0){
                            // do stuff
                            let payload = {clientId : resp2[0].idusers}
                            let options = {
                                issuer:  'dignite store',
                                subject:  `${resp2[0].email}`,
                                audience: `${resp2[0].idusers}`
                            }
                            let idusers = resp2[0].idusers
                            let token = sign(payload,options)

                            return res.json({success:true,code:'auth_success',message:'authentication successful',idusers,token})
                          } else {
                            // do other stuff
                            return res.json({success:false,code:'pass_wrong',message:"authentication failed. Password doesn't match"})
                          }
                    })
                  })
                  .catch((err)=>console.error(err))
            } else {
                return res.json({success:false,code:'email_wrong',message:'email anda tidak terdaftar'})
            }
        })
    },
}