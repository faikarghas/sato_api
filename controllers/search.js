module.exports = {
    search: (req,res) => {
        let sql = `
        select *  from project where
            name LIKE '%${req.params.search}%' OR
            client LIKE '%${req.params.search}%' OR
            architect LIKE '%${req.params.search}%' OR
            location LIKE '%${req.params.search}%' OR
            description_en LIKE '%${req.params.search}%' OR
            description_id LIKE '%${req.params.search}%'
        `
        const db = require('../db');
        db.query(sql, (err, result) => {
            if(err){
                console.log(err);
                res.json({success:false,message:'gagal'})
            } else {
                res.send(result)
            }
        })
    }

}


