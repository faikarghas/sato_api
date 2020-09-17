const db = require('../db')

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
        let sql = `select * from project`

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
        let sql = `select * from testimonials`

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
                            subject: 'Leads', // Subject line
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
    getContact: (req,res) => {
        let sql = `select * from contact`
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
