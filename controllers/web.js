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
    }
}
