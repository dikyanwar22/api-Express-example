var express = require('express');
var router = express.Router();
//Membuat notifikasi disini
const notification = require('../../response');
const { sequelize } = require('../../models');
const { QueryTypes } = require('sequelize');
const { response } = require('express');

 //sesuai nama pada model
const { M_buah } = require('../../models');

//view data
router.get('/', async(req, res) => {
    let query = "SELECT * FROM buah";
    const data = await sequelize.query(query,{type: QueryTypes.SELECT});
    notification(200, data, "Data berhasil ditampilkan", res);
});


module.exports = router;
