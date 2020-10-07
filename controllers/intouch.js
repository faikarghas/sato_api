const db = require('../db')
const nodemailer = require('nodemailer');

module.exports = {
    insertIntouch : (req,res) => {
        let check = 'select * from intouch'
        let create = `insert into intouch set ?`

        let data ={
            content: req.body.content,
            content_id: req.body.content_id
        }

        db.query(check,(err,result)=>{
            if(err) {
                console.log(err);
            } else {
                if (result.length === 1) {
                    let update = `update intouch set ? where idintouch = ${result[0].idintouch}`;
                    db.query(update, data, (err, result) => {
                        if(err) {
                            console.log(err);
                        } else {
                            res.status(201).send(result)
                        }
                    })
                } else {
                    db.query(create,data,(err,result)=>{
                        if(err) {
                            console.log(err);
                        } else {
                            return res.status(200).send({success:true,message:result});
                        }
                    })
                }
            }
        })
    },
    insertContactPromo : (req,res) => {
        let create = `insert into contact_promo set ?`
        let data ={
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            message: req.body.message
        }

        let sql = `select * from email_receivers`
        db.query(sql,(err,result)=>{
            if(err) {
                console.log(err);
            } else {
                let listEmail

                listEmail = result.map(item=>{
                    return item.email
                })

                console.log(listEmail);

                db.query(create,data,(err,result)=>{
                    if(err) {
                        console.log(err);
                    } else {
                        var transporter = nodemailer.createTransport({
                            host: 'mail.sato.id',
                            port: 465,
                            pool:true,
                            secure: true,
                            tls: {
                                rejectUnauthorized: false
                            },
                            user:'admin@sato.id',
                            pass:'satosato123!'
                        });
                        const mailOptions = {
                            from: 'admin@sato.id', // sender address
                            to: 'ghassanfaikar13@gmail.com', // list of receivers
                            subject: 'Leads Promo', // Subject line
                            html:   `
                                    <h3>Profile :</h3>
                                    <p style="margin:0;">${req.body.name}</p> <br/>
                                    <p style="margin:0;">${req.body.email}</p> <br/>
                                    <p style="margin:0;">${req.body.phoneNumber}</p> <br/>
                                    <h3>Message :</h3>
                                    <p>${req.body.message}</p>
                                    `,
                        };
                        transporter.sendMail(mailOptions, function (err, info) {
                            if(err){
                                console.log(err)
                                res.send(err)
                            }else {
                                console.log(info);
                                res.send(info)
                            }
                            res.status(201).send(err,info)
                        });
                    }
                })
            }
        })

    },
    getContactPromo : (req,res) => {
        let sql = `select * from contact_promo`
        db.query(sql,(err,result)=>{
            if(err) {
                console.log(err);
            } else {
                return res.status(200).send({success:true,message:result});
            }
        })
    },
    insertIntouchSlider : (req,res) => {
        let sql = `insert into intouch_slider set ?`
        let imageFile = req.files.file;
        let filename = imageFile.name
        let fileNameWithoutSpace = filename.replace(/\s/g, '');

        let data ={
            name: req.body.name,
            images: fileNameWithoutSpace
        }

        console.log(data);

        if (req.files !== null) {
            imageFile.mv(`${__dirname}/../images/intouch/${fileNameWithoutSpace}`, function (err) {
                if (err) {
                    console.log(err);
                    return res.status(500).send({success:false,file:req.files,body:req.body});
                } else{
                    db.query(sql, data, (err, result) => {
                        if(err) {
                            console.log(err);
                        } else {
                            console.log(result);
                            res.status(201).send(result)
                        }
                    })
                }
            });
        } else {
            return res.status(200).send({success:false,message:'File tidak ada'});
        }
    },
    editIntouchSlider : (req,res) => {
        let sql = `update intouch_slider set ? where idintouchslider = ${req.body.idintouchslider}`;

        if (req.files !== null) {
            let imageFile = req.files.file;
            let filename = imageFile.name
            let fileNameWithoutSpace = filename.replace(/\s/g, '');

            let data ={
                name: req.body.name,
                images: fileNameWithoutSpace
            }

            imageFile.mv(`${__dirname}/../images/intouch/${fileNameWithoutSpace}`, function (err) {
                if (err) {
                    console.log('err');
                    return res.status(500).send({success:false,file:req.files,body:req.body});
                } else{
                    db.query(sql, data, (err, result) => {
                        if(err) {
                            console.log(err);
                        } else {
                            console.log(result);
                            res.status(201).send(result)
                        }
                    })
                }
            });
        } else {
            let data ={
                name: req.body.name
            }

            db.query(sql, data, (err, result) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log(result);
                    res.status(201).send(result)
                }
            })
        }
    },
    deleteIntouchSlider: (req,res) => {
        let sql = `delete from intouch_slider where idintouchslider = ${req.body.idintouchslider}`

        db.query(sql,(err,result)=>{
            if(err) {
                console.log(err);
            } else {
                return res.status(200).send({success:true,message:result});
            }

        })
    }

}