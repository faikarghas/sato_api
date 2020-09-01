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
}