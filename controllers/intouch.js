const db = require('../db')
const nodemailer = require('nodemailer');
const fs = require('fs');

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


                db.query(create,data,(err,result)=>{
                    if(err) {
                        console.log(err);
                    } else {
                        // var transporter = nodemailer.createTransport({
                        //     host: 'mail.smtp2go.com',
                        //     port: 587,
                        //     // secure: false,
                        //     pool:true,
                        //     auth: {
                        //             user:'sato.id',
                        //             pass: 'zrT8ihIsUkih'
                        //     }
                        // });
                        var transporter = nodemailer.createTransport({
                            host: 'smtp.gmail.com',
                            port: 465,
                            secure: true,
                            pool:true,
                            auth: {
                                    user:'sato.interior.mail@gmail.com',
                                    pass:'sato123!'
                            }
                        });
                        const mailOptions = {
                            from: 'Sato "admin@sato.id', // sender address
                            to: [...listEmail], // list of receivers
                            subject: 'Leads Promo', // Subject line
                            html:   `
                                    <h3>Hi, good news team </h3>
                                    <p>Ada yang baru saja mengisi inquiry form dari website, berikut datanya:</p>
                                    <p style="margin:0;">Nama : ${req.body.name}</p> <br/>
                                    <p style="margin:0;">Email : ${req.body.email}</p> <br/>
                                    <p style="margin:0;">No. Telp : ${req.body.phoneNumber}</p> <br/>
                                    <p>Mohon segera menghubunginya.</p>
                                    <p>Terimakasih</p>
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
        let sql = `select * from contact_promo order by date DESC`
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
        let imageFileDesktop = req.files.file[0];
        let imageFileMobile = req.files.file[1];
        let filename1 = imageFileDesktop.name
        let filename2 = imageFileMobile.name

        function fileNameWithoutSpace(filename) {
            return  filename.replace(/\s/g, '');
        }

        let data ={
            name: req.body.name,
            images: fileNameWithoutSpace(filename1),
            imageMobile: fileNameWithoutSpace(filename2),
        }


        if (req.files !== null) {
            imageFileDesktop.mv(`${__dirname}/../images/intouch/desktop/${fileNameWithoutSpace(filename1)}`, function (err) {
                if (err) {
                    console.log(err);
                    return res.status(500).send({success:false,file:req.files,body:req.body});
                } else{
                    imageFileMobile.mv(`${__dirname}/../images/intouch/mobile/${fileNameWithoutSpace(filename2)}`, function (err) {
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
                }
            });
        } else {
            return res.status(200).send({success:false,message:'File tidak ada'});
        }
    },
    editIntouchSlider : (req,res) => {
        let sql = `update intouch_slider set ? where idintouchslider = ${req.body.idintouchslider}`;

        if (req.files !== null) {
            let imageFileDesktop = req.files.file[0];
            let imageFileMobile = req.files.file[1];
            let filename1 = imageFileDesktop.name
            let filename2 = imageFileMobile.name

            function fileNameWithoutSpace(filename) {
                return  filename.replace(/\s/g, '');
            }

            let data ={
                name: req.body.name,
                images: fileNameWithoutSpace(filename1),
                imageMobile: fileNameWithoutSpace(filename2),
            }


            imageFileDesktop.mv(`${__dirname}/../images/intouch/desktop/${fileNameWithoutSpace(filename1)}`, function (err) {
                if (err) {
                    console.log(err);
                    return res.status(500).send({success:false,file:req.files,body:req.body});
                } else{
                    imageFileMobile.mv(`${__dirname}/../images/intouch/mobile/${fileNameWithoutSpace(filename2)}`, function (err) {
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
        let select = `select * from intouch_slider where idintouchslider = ${req.body.idintouchslider}`
        let deleteFile = `delete from intouch_slider where idintouchslider = ${req.body.idintouchslider}`


        db.query(select,(err,result)=>{
            if(err) {
                console.log(err);
            } else {
                let filePathDesktop = `${__dirname}/../images/intouch/desktop/${result[0].images}`;
                let filePathMobile = `${__dirname}/../images/intouch/mobile/${result[0].imageMobile}`;

                // fs.unlinkSync(filePathDesktop);
                // fs.unlinkSync(filePathMobile);

                db.query(deleteFile,(err,result)=>{
                    if(err) {
                        console.log(err);
                    } else {
                        return res.status(200).send({success:true,message:result});
                    }
                })
            }

        })
    },
    insertImageIntouch: (req,res) => {
        let sql = `insert into images_intouch set ?`
        let imageFile = req.files.file;
        let filename = imageFile.name

        function fileNameWithoutSpace(filename) {
            return  filename.replace(/\s/g, '');
        }

        let data ={
            imageName: fileNameWithoutSpace(filename),
        }

        console.log(filename);

        if (req.files !== null) {
            imageFile.mv(`${__dirname}/../images/intouch/${fileNameWithoutSpace(filename)}`, function (err) {
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
    deleteImageIntouch: (req,res) => {
        let select = `select * from images_intouch where idimages = ${req.body.id}`
        let deleteFile = `delete from images_intouch where idimages = ${req.body.id}`


        db.query(select,(err,result)=>{
            if(err) {
                console.log(err);
            } else {
                let filePath = `${__dirname}/../images/intouch/${result[0].imageName}`;

                fs.unlinkSync(filePath);

                db.query(deleteFile,(err,result)=>{
                    if(err) {
                        console.log(err);
                    } else {
                        return res.status(200).send({success:true,message:result});
                    }
                })
            }

        })
    },
    getImageIntouch: (req,res) => {
        let sql = 'select * from images_intouch'

        db.query(sql,(err,result)=>{
            if(err) {
                console.log(err);
            } else {
                return res.status(200).send({success:true,message:result});
            }
        })

    }
}