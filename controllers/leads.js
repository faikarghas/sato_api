const db = require('../db')
const nodemailer = require('nodemailer')

module.exports = {
    post : (req, res) => {
        let data = {
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            category: req.body.category,
            utmSource: req.body.utmSource,
            utmMedium: req.body.utmMedium,
            utmCampaign: req.body.utmCampaign,
            page: req.body.page
        }

        console.log(data);

        let sql = 'insert into leads_form set ?'
        db.query(sql, data, (err, result)=>{
            if (err) {
                res.json({success:false,message:'gagal post',error:err})
                console.log(err);
            } else {
                res.json({success:true,message:'post'})
                console.log(result);
            }
        })
    },

    get : (req,res) => {
        let sql = `select name,email,phoneNumber,category,utmSource,utmMedium,utmCampaign,page, DATE_FORMAT(timestamp, '%d-%m-20%y   %H:%i:%S') AS timestamp from leads_form order by idleads DESC`

        db.query(sql,(err,result)=>{
            console.log(result);
            res.send(result)
        })
    },
    
    getp : (req,res) => {
        let sql = `select * from project`

        db.query(sql,(err,result)=>{
            console.log(result);
            res.send(result)
        })
    },
    
    postwa: (req,res) => {
        let data = {
            phoneNumber: req.body.phoneNumber,
            source: req.body.source,
            utmSource: req.body.utmSource,
            utmMedium: req.body.utmMedium,
            utmCampaign: req.body.utmCampaign,
        }

        let sql = 'insert into wa set ?'

        db.query(sql, data, (err, result)=>{
            if (err) {
                res.json({success:false,message:'gagal post'})
                console.log(err);
            } else {
                res.json({success:true,message:'post'})
                console.log(result);

            }
        })
    },

    getwa : (req,res) => {
        let sql = `select * from wa order by idwa DESC`

        db.query(sql,(err,result)=>{
            console.log(result);
            res.send(result)
        })
    }
}