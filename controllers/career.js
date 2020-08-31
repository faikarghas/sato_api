const db = require('../db')

module.exports = {
    insertCareer : (req,res) => {
        let sql = `insert into career set ?`
        let slug = req.body.name.toLowerCase().replace(/\s/g, '-');

        let data ={
            name: req.body.name,
            slug: slug,
            description_en: req.body.desc_en,
            description_id: req.body.desc_id
        }

        db.query(sql,data,(err,result)=>{
            console.log(result);
            res.send(result)
        })
    },
    editCareer : (req,res) => {
        let sql = `update career set ? where idcareer = ${req.body.idCareer}`;
        let data ={
            name: req.body.name,
            description_en: req.body.desc_en,
            description_id: req.body.desc_id
        }
        db.query(sql, data, (err, result) => {
            if(err) {
                console.log(err);
            } else {
                res.status(201).send(result)
            }
        })

    },
    deleteCareer : (req,res) => {
        let sql = `delete from career where idcareer = ${req.body.id}`

        db.query(sql,(err,result)=>{
            if(err) {
                console.log(err);
            } else {
                return res.status(200).send({success:true,message:result});
            }

        })
    },
}