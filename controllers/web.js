const db = require('../db')
const nodemailer = require('nodemailer');

module.exports = {
    career : (req,res) => {
        let sql = `select * from career`

        db.query(sql,(err,result)=>{

            res.json({ career: result })
        })
    },
    category : (req,res) => {
        let sql = `select * from category`

        db.query(sql,(err,result)=>{

            res.json({ category: result })
        })
    },
    faq : (req,res) => {
        let sql = `select * from faq`

        db.query(sql,(err,result)=>{

            res.json({ faq: result })
        })
    },
    intouch : (req,res) => {
        let sql = `select * from intouch`

        db.query(sql,(err,result)=>{

            res.json({ intouch: result })
        })
    },
    intouchSlider : (req,res) => {
        let sql = `select * from intouch_slider order by idintouchslider DESC`

        db.query(sql,(err,result)=>{

            res.json({ intouch: result })
        })
    },
    projectAccom : (req,res) => {
        let sql = ` SELECT
        category,
        COUNT(*) as total
        FROM
            project
        GROUP BY category;`

        db.query(sql,(err,result)=>{

            res.json({ projectAccom: result })
        })
    },
    latestProject : (req,res) => {
        let sql = `select * from project order by date DESC limit 2`

        db.query(sql,(err,result)=>{

            res.json({ project: result })
        })
    },
    project : (req,res) => {
        let sql = `select * from project order by reorder ASC`

        db.query(sql,(err,result)=>{

            res.json({ project: result })
        })
    },
    projectTitle : (req,res) => {
        let sql = `select * from global where type = "project_title"`

        db.query(sql,(err,result)=>{

            res.json({ projectTitle: result })
        })
    },
    slider : (req,res) => {
        let sql = `select * from home_slider`

        db.query(sql,(err,result)=>{

            res.json({ slider: result })
        })
    },
    studies : (req,res) => {
        let sql = `select * from studies`

        db.query(sql,(err,result)=>{

            res.json({ studies: result })
        })
    },
    testimonials : (req,res) => {
        let sql = `select * from testimonials ORDER BY idtestimonials DESC`

        db.query(sql,(err,result)=>{

            res.json({ testimonials: result })
        })
    },
    our_team : (req,res) => {
        let sql = `select * from our_team`

        db.query(sql,(err,result)=>{

            res.json({ our_team: result })
        })
    },
    partnership : (req,res) => {
        let sql = `select * from partnership`

        db.query(sql,(err,result)=>{

            res.json({ partnership: result })
        })
    },
    insertWhatsapp: (req,res) => {
        let create = `insert into whatsapp set ?`

        let data ={
            phone: req.body.phone
        }

        db.query(create,data,(err,result)=>{
            if(err) {
                console.log(err);
            } else {
                return res.status(200).send({success:true,message:result});
            }
        })
    },
    insertContact : (req,res) => {
        let create = `insert into contact set ?`
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
                            host: 'smtp-relay.sendinblue.com',
                            port: 587,
                            secure: false,
                            pool:true,
                            auth: {
                                user:'sato.id',
                                pass: 'zrT8ihIsUkih'
                            }
                        });
                        const mailOptions = {
                            from: 'admin@sato.id', // sender address
                            to: [...listEmail], // list of receivers
                            subject: 'Leads', // Subject line
                            html:  `
                            <h3>Hi, good news team </h3>
                            <p>Ada yang baru saja mengisi inquiry form dari website, berikut datanya:</p>
                            <p style="margin:0;">Nama : ${req.body.name}</p> <br/>
                            <p style="margin:0;">Email : ${req.body.email}</p> <br/>
                            <p style="margin:0;">No. Telp : ${req.body.phoneNumber}</p> <br/>
                            <p>Mohon segera menghubunginya.</p>
                            <p>Terimakasih</p>
                            `,
                        };
                        transporter.verify(function(error, success) {
                            if (error) {
                              console.log(error);
                            } else {
                              console.log("Server is ready to take our messages");
                            }
                          });
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
    getContact: (req,res) => {
        let sql = `select * from contact order by date DESC`
        db.query(sql,(err,result)=>{
            if(err) {
                console.log(err);
            } else {
                return res.status(200).send({success:true,message:result});
            }
        })
    },
    getEmailReceiver: (req,res) => {
        let sql = `select * from email_receivers`
        db.query(sql,(err,result)=>{
            if(err) {
                console.log(err);
            } else {
                return res.status(200).send({success:true,message:result});
            }
        })
    },
    insertEmail : (req,res) => {
        let sql = `insert into email_receivers set ?`

        let data ={
            email: req.body.email,
        }

        db.query(sql,data,(err,result)=>{
            console.log(result);
            res.send(result)
        })
    },
    deleteEmail : (req,res) => {
        let sql = `delete from email_receivers where idemail_receivers = ${req.body.id}`
        let id = req.body.id

        db.query(sql,(err,result)=>{
            if(err) {
                console.log(err);
            } else {
                return res.status(200).send({success:true,message:result});
            }

        })
    },
}
