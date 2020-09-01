const db = require('../db')

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
    insertContact : (req,res) => {
        let create = `insert into contact set ?`

        let data ={
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            message: req.body.message
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