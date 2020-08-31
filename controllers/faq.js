const db = require('../db')

module.exports = {
    insertFaq : (req,res) => {
        let sql = `insert into faq set ?`

        let data ={
            question_en: req.body.question_en,
            question_id: req.body.question_id,
            answer_en: req.body.answer_en,
            answer_id: req.body.answer_id
        }

        db.query(sql,data,(err,result)=>{
            console.log(result);
            res.send(result)
        })
    },
    editFaq : (req,res) => {
        let sql = `update faq set ? where idfaq = ${req.body.id}`;
        let data ={
            question_en: req.body.question_en,
            question_id: req.body.question_id,
            answer_en: req.body.answer_en,
            answer_id: req.body.answer_id
        }

        db.query(sql, data, (err, result) => {
            if(err) {
                console.log(err);
            } else {
                res.status(201).send(result)
            }
        })

    },
    deleteFaq : (req,res) => {
        let sql = `delete from faq where idfaq = ${req.body.id}`

        db.query(sql,(err,result)=>{
            if(err) {
                console.log(err);
            } else {
                return res.status(200).send({success:true,message:result});
            }

        })
    },
}