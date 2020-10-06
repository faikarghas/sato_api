const db = require('../db')
const nodemailer = require('nodemailer')
const fs = require('fs');

module.exports = {
    insertCategory : (req,res) => {
        let sql = `insert into category set ?`

        let data ={
            name: req.body.category,
        }

        db.query(sql,data,(err,result)=>{
            console.log(result);
            res.send(result)
        })
    },
    deleteCategory : (req,res) => {
        let sql = `delete from category where idcategory = ${req.body.id}`
        let id = req.body.id

        db.query(sql,(err,result)=>{
            if(err) {
                console.log(err);
            } else {
                return res.status(200).send({success:true,message:result});
            }

        })
    },
    insertProject : (req,res) => {
        let sql = `insert into project set ?`
        let slug = req.body.name.toLowerCase().replace(/\s/g, '-');
        let imageFile = req.files.file;
        let filename = imageFile.name
        let fileNameWithoutSpace = filename.replace(/\s/g, '');

        let data ={
            name: req.body.name,
            client: req.body.client,
            duration: req.body.duration,
            location: req.body.location,
            architect: req.body.architect,
            area: req.body.area,
            year: req.body.year,
            category: req.body.category,
            description_en: req.body.desc_en,
            description_id: req.body.desc_id,
            slug: slug,
            thumbnail: fileNameWithoutSpace
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
    editProject : (req,res) => {
        let sql = `update project set ? where idProject = ${req.body.idProject}`

        if (req.files !== null) {
            let imageFile = req.files.file;
            let filename = imageFile.name
            let fileNameWithoutSpace = filename.replace(/\s/g, '');

            let data ={
                name: req.body.name,
                client: req.body.client,
                duration: req.body.duration,
                location: req.body.location,
                architect: req.body.architect,
                area: req.body.area,
                year: req.body.year,
                category: req.body.category,
                description_en: req.body.desc_en,
                description_id: req.body.desc_id,
                thumbnail: fileNameWithoutSpace
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
                name: req.body.name,
                client: req.body.client,
                duration: req.body.duration,
                location: req.body.location,
                architect: req.body.architect,
                area: req.body.area,
                year: req.body.year,
                category: req.body.category,
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
    deleteProject : (req,res) => {
        let sql = `delete from project where idProject = ${req.body.id}`
        let id = req.body.id

        db.query(sql,(err,result)=>{
            if(err) {
                console.log(err);
            } else {
                return res.status(200).send({success:true,message:result});
            }

        })
    },
    getImageProject : (req, res) => {
        let sql = `select * from images_project where idProject = ${req.params.id} order by idImages DESC`

        db.query(sql, (err, result) => {
            if(err) {
                console.log(err);
            } else {
                return res.status(200).send({result});
            }
        })
    },
    insertImageProject : (req, res) => {
        let sql = `insert into images_project set ? `
        let fileNameWithoutSpace = req.body.name.replace(/\s/g, '');

        let data = {
            name : fileNameWithoutSpace,
            idProject : req.body.id,
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
    deleteImage : (req, res) => {
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
    insertProjectTitle : (req,res) => {
        let create = `insert into global set ?`
        let check = 'select * from global'

        let data ={
            description_en: req.body.description_en,
            description_id: req.body.description_id,
            type: 'project_title'
        }

        db.query(check,(err,result)=>{
            if(err) {
                console.log(err);
            } else {
                if (result.length === 1) {
                    let update = `update global set ? where type = 'project_title'`;
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
    insertOtherProjects : (req,res) => {
        let create = `insert into other_projects set ?`
        let check = 'select * from other_projects'

        let data ={
            listproject: req.body.listproject,
        }

        let dataArray = []

        let a = data.listproject.map((item,i)=>{
            dataArray.push(item.idProject)
        })

        let finaldata = {listproject : dataArray.join(',')}

        console.log(finaldata);

        db.query(check,(err,result)=>{
            if(err) {
                console.log(err);
            } else {
                if (result.length === 1) {
                    let update = `update other_projects set ? where idotherproject = ${result[0].idotherproject}`;
                    db.query(update, finaldata, (err, result) => {
                        if(err) {
                            console.log(err);
                        } else {
                            res.status(201).send(result)
                        }
                    })
                } else {
                    db.query(create,finaldata,(err,result)=>{
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
    getOtherProjects : (req,res) => {
        let sql = `select * from other_projects`

        db.query(sql,(err,result)=>{
            res.json({ other_projects: result })
        })
    },
    reorder : (req,res) => {
        let sql = `update project set ? where idProject = ${req.body.idProject}`

        let data = {
            reorder: req.body.reorder,
        }

        db.query(sql,data,(err,result)=>{
            if(err) {
                console.log(err);
            } else {
                return res.status(200).send({success:true,message:result});
            }
        })
    },
}