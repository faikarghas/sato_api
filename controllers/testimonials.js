const db = require('../db')
const fs = require('fs');

module.exports = {
    insertTestimonials : (req,res) => {
        let sql = `insert into testimonials set ?`
        let imageFile = req.files.file;
        let filename = imageFile.name
        let fileNameWithoutSpace = filename.replace(/\s/g, '');

        let data ={
            name: req.body.name,
            jobTitle: req.body.jobTitle,
            title_en: req.body.title_en,
            title_id: req.body.title_id,
            description_en: req.body.desc_en,
            description_id: req.body.desc_id,
            imageName: fileNameWithoutSpace
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
    editTestimonials : (req,res) => {
        let sql = `update testimonials set ? where idtestimonials = ${req.body.idTestimonials}`;
        let imageFile = req.files.file;
        let filename = imageFile.name
        let fileNameWithoutSpace = filename.replace(/\s/g, '');

        let data ={
            name: req.body.name,
            jobTitle: req.body.jobTitle,
            title_en: req.body.title_en,
            title_id: req.body.title_id,
            description_en: req.body.desc_en,
            description_id: req.body.desc_id,
            imageName: fileNameWithoutSpace

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
    deleteTestimonials : (req,res) => {
        let sql = `delete from testimonials where idtestimonials = ${req.body.id}`

        db.query(sql,(err,result)=>{
            if(err) {
                console.log(err);
            } else {
                return res.status(200).send({success:true,message:result});
            }

        })
    },
    getImageTestimonials : (req, res) => {
        let sql = `select * from images_testimonials where idtestimonials = ${req.params.id} order by idImages DESC`

        db.query(sql, (err, result) => {
            if(err) {
                console.log(err);
            } else {
                return res.status(200).send({result});
            }
        })
    },
    insertImageTestimonials : (req, res) => {
        let sql = `insert into images_testimonials set ? `
        let fileNameWithoutSpace = req.body.name.replace(/\s/g, '');

        let data = {
            name : fileNameWithoutSpace,
            idTestimonials : req.body.id,
        }

        if (req.files !== null) {
            let imageFile = req.files.files;
            let filename = imageFile.name
            let fileNameWithoutSpace = filename.replace(/\s/g, '');
            imageFile.mv(`${__dirname}/../images/${fileNameWithoutSpace}`, function (err) {
                if (err) {
                    return res.status(500).send({success:false,file:req.files,body:req.body});
                } else{
                    db.query(sql, data, (err, result) => {
                        if(err) {
                            console.log(err);
                        } else {
                            return res.status(200).send({success:true,message:result});
                        }
                    })
                }
            });
        } else {
            return res.status(200).send({success:false,message:'File tidak ada'});
        }
    },
    deleteImageTestimonials : (req, res) => {
        let name = req.body.name
        let id = req.body.id


        fs.unlink(`${__dirname}/../images/${name}`, function (err) {
            if (err) throw err;
            // if no error, file has been deleted successfully
            console.log('File deleted!');
            let sql = `DELETE FROM images_project
            WHERE idImages = ${id}`

            db.query(sql, (err, result) => {
                if(err) {
                    console.log(err);
                } else {
                    return res.status(200).send({result,success:true,message:'File deleted!'});
                }
            })
        });
    },
}