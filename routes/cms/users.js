var express = require('express');
var router = express.Router();
//Membuat notifikasi disini
const notification = require('../../response');
const verifyToken = require('../../verifyToken');

const { sequelize } = require('../../models');
const { QueryTypes } = require('sequelize');

const { M_users } = require('../../models'); //sesuai nama pada model
const { response } = require('express');

const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';

//view data
router.get('/', verifyToken, async (req, res) => {
    try {
        const query = "SELECT * FROM users";
        const data = await sequelize.query(query, { type: QueryTypes.SELECT });
        notification(200, data, "Data berhasil ditampilkan", res);
    } catch (error) {
        notification(500, null, "Terjadi kesalahan", res);
    }
});

// Login and generate JWT token
router.post('/login', async (req, res) => {
    const { username, password } = req.body; // Changed from req.query to req.body

    // Hash the provided password
    const hashedPassword = password;

    // Replace this with your actual logic for fetching the user from the database
    const storedUser = await M_users.findOne({ where: { username } });

    if (storedUser && hashedPassword === storedUser.password) {
        // Data to be saved in the token
        const payload = {
            username: storedUser.username,
            role: storedUser.role // Assuming you have a role field in your user table
        };

        // Generate JWT token
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

        res.json({
            data: storedUser,
            message: 'Login successful',
            token: token
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});





















//view data by id
router.get('/barang/:id', async(req, res) => {
    const id = req.params.id;

    let query = "SELECT * FROM barang WHERE id = "+id+" GROUP BY id ";
    const data = await sequelize.query(query,{type: QueryTypes.SELECT});
    notification(200, data, "Data berhasil ditampilkan", res);
});


//DIBAWAH INI CONTOH JANGAN DIHAPUS
// router.get('/barang/:id', async (req, res) => {
//     const id = req.params.id;
//
//     const query = `
//         SELECT
//             (@row_number := @row_number + 1) AS row_num,
//             t1.*,
//             CONCAT(t3.m_datalocmaxbin_location,
//                     CASE WHEN ISNULL(t3.m_datalocmaxbin_subloc) THEN ''
//                     ELSE CONCAT(' / ', t3.m_datalocmaxbin_subloc)
//                     END) AS source_location_name,
//             t3.id AS source_location_id,
//             CONCAT(t1.startnumbering, ' - ', t1.endnumbering) AS numbering
//         FROM m_tspread_cutting_output t1
//         CROSS JOIN (SELECT @row_number := 0) AS rn
//         LEFT JOIN m_tspread_cutting t2 ON t2.id = t1.m_tspread_cutting_id
//         LEFT JOIN m_datalocmaxbin t3 ON t3.id = t2.stored_location_id
//         WHERE t1.is_splited = 0
//             AND t1.is_sendto_dc = 0
//             AND t1.is_sendto_outsource = 0
//             AND t1.has_request_to_gbs = 0
//             AND t1.is_reject = 1
//     `;
//
//     try {
//         const data = await sequelize.query(query, { type: QueryTypes.SELECT });
//         notification(200, data, "Data berhasil ditampilkan", res);
//     } catch (error) {
//         notification(500, null, "Terjadi kesalahan", res);
//     }
// });


//insert data
router.post('/tambah',async(req, res) => {
    const data = await Barang.create(req.body);
    notification(200, data, "Data berhasil dimasukkan", res);
});

//update data
router.put('/update/:id', async(req, res) => {
    const id = req.params.id;
    let model_barang = await Barang.findByPk(id);
    const barangmuwoy = await model_barang.update(req.body);
    notification(200, barangmuwoy, "Data berhasil ditampilkan", res);
});

//deleted data
router.delete('/hapus/:id', async(req, res) => {
    const id = req.params.id;
    const data = await Barang.findByPk(id);
    await data.destroy();
    notification(200, data, "Data berhasil dihapus", res);
});

module.exports = router;
