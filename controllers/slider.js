const db = require('../db')

module.exports = {
    insertHomeSlider : (req,res) => {
        let sql = `insert into home_slider set ?`
        let imageFile = req.files.file;
        let filename = imageFile.name
        let fileNameWithoutSpace = filename.replace(/\s/g, '');

        let data ={
            imageName: fileNameWithoutSpace,
            description_en: req.body.desc_en,
            description_id: req.body.desc_id
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
    editHomeSlider : (req,res) => {
        let sql = `update home_slider set ? where idhomeslider = ${req.body.id}`;
        let imageFile = req.files.file;
        let filename = imageFile.name
        let fileNameWithoutSpace = filename.replace(/\s/g, '');

        let data ={
            imageName: fileNameWithoutSpace,
            description_en: req.body.desc_en,
            description_id: req.body.desc_id
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
    deleteHomeSlider : (req,res) => {
        let sql = `delete from home_slider where idhomeslider = ${req.body.id}`

        db.query(sql,(err,result)=>{
            if(err) {
                console.log(err);
            } else {
                return res.status(200).send({success:true,message:result});
            }

        })
    },
}