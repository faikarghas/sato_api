const db = require('../db')

module.exports = {
    editProject : (req,res) => {
        let sql = `select * from project where idProject = ${req.params.id}`

        db.query(sql,(err,result)=>{

            res.json({ project: result })
        })
    },
}
