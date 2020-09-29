const db = require('../db')

module.exports = {
    insertOurTeam : (req,res) => {
        let sql = `insert into our_team set ?`
        let slug = req.body.name.toLowerCase().replace(/\s/g, '-');

        let data ={
            name: req.body.name,
            jobTitle: req.body.jobTitle,
        }

        db.query(sql,data,(err,result)=>{
            console.log(result);
            res.send(result)
        })
    },
    editOurTeam : (req,res) => {
        let sql = `update our_team set ? where idourteam = ${req.body.id}`;
        let data ={
            name: req.body.name,
            jobTitle: req.body.jobTitle,
        }
        db.query(sql, data, (err, result) => {
            if(err) {
                console.log(err);
            } else {
                res.status(201).send(result)
            }
        })

    },
    deleteOurTeam : (req,res) => {
        let sql = `delete from our_team where idourteam = ${req.body.id}`

        db.query(sql,(err,result)=>{
            if(err) {
                console.log(err);
            } else {
                return res.status(200).send({success:true,message:result});
            }

        })
    },
    insertPartnership : (req,res) => {
        let check = 'select * from partnership'
        let create = `insert into partnership set ?`

        let data ={
            content: req.body.content,
            content_id: req.body.content_id
        }

        db.query(check,(err,result)=>{
            if(err) {
                console.log(err);
            } else {
                if (result.length === 1) {
                    let update = `update partnership set ? where idpartnership = ${result[0].idpartnership}`;
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

    }
}