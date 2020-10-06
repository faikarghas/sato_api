const db = require('../db')

module.exports = {
    insertStudies : (req,res) => {
        let sql = `insert into studies set ?`
        let imageFile = req.files.file;
        let filename = imageFile.name
        let fileNameWithoutSpace = filename.replace(/\s/g, '');

        let data ={
            title_en: req.body.title_en,
            title_id: req.body.title_id,
            description_en: req.body.desc_en,
            description_id: req.body.desc_id,
            imageName: fileNameWithoutSpace,
        }

        if (req.files !== null) {
            imageFile.mv(`${__dirname}/../images/${fileNameWithoutSpace}`, function (err) {
                if (err) {
                    return res.status(500).send({success:false,file:req.files,body:req.body});
                } else{
                    db.query(sql, data, (err, result) => {
                        if(err) {
                            console.log(err);
                        } else {
                            console.log(result);
                            res.status(201).send(result)
                        }
                    })
                }
            });
        } else {
            return res.status(200).send({success:false,message:'File tidak ada'});
        }
    },
    editStudies : (req,res) => {
        let sql = `update studies set ? where idstudies = ${req.body.idstudies}`;
        

        if (req.files !== null) {
            let imageFile = req.files.file;
            let filename = imageFile.name
            let fileNameWithoutSpace = filename.replace(/\s/g, '');

            let data ={
                title_en: req.body.title_en,
                title_id: req.body.title_id,
                description_en: req.body.desc_en,
                description_id: req.body.desc_id,
                imageName: fileNameWithoutSpace
            }
            imageFile.mv(`${__dirname}/../images/${fileNameWithoutSpace}`, function (err) {
                if (err) {
                    return res.status(500).send({success:false,file:req.files,body:req.body});
                } else{
                    db.query(sql, data, (err, result) => {
                        if(err) {
                            console.log(err);
                        } else {
                            console.log(result);
                            res.status(201).send(result)
                        }
                    })
                }
            });
        } else {
            let data ={
                title_en: req.body.title_en,
                title_id: req.body.title_id,
                description_en: req.body.desc_en,
                description_id: req.body.desc_id
            }
            db.query(sql, data, (err, result) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log(result);
                    res.status(201).send(result)
                }
            })
        }

    },
    deleteStudies : (req,res) => {
        let sql = `delete from studies where idstudies = ${req.body.id}`

        db.query(sql,(err,result)=>{
            if(err) {
                console.log(err);
            } else {
                console.log(result);
                return res.status(200).send({success:true,message:result});
            }

        })
    },
}