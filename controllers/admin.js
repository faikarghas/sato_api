const db = require('../db')

module.exports = {
    editProject : (req,res) => {
        let sql = `select * from project where idProject = ${req.params.id}`

        db.query(sql,(err,result)=>{

            res.json({ project: result })
        })
    },
    getProject : (req,res) => {
        let sql = `select * from project`

        db.query(sql,(err,result)=>{

            res.json({ project: result })
        })
    },
    getProjectTitle : (req,res) => {
        let sql = `select * from global where type = 'project_title'`

        db.query(sql,(err,result)=>{

            res.json({ projectTitle: result })
        })
    },
    getCategory : (req,res) => {
        let sql = `select * from category `

        db.query(sql,(err,result)=>{

            res.json({ category: result })
        })
    },
}

