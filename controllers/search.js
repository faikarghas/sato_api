module.exports = {
    search: (req,res) => {
        let sql = `
        select name, client, architect,description_en,description_id  from project where
            name LIKE '%${req.params.search}%' OR
            client LIKE '%${req.params.search}%' OR
            architect LIKE '%${req.params.search}%' OR
            location LIKE '%${req.params.search}%' OR
            description_en LIKE '%${req.params.search}%' OR
            description_id LIKE '%${req.params.search}%' union select title_en from studies where
            title_en LIKE '%${req.params.search}%' OR
            title_id LIKE '%${req.params.search}%' OR
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


