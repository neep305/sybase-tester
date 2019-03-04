var express = require('express');
var router = express.Router();
var db = require('../lib/sybase-conn');

/* GET home page. */
router.get('/result', async function(req, res, next) {
  try {
    console.log('req.params', req.params);

    const data = await db.getAllSrData(req.params);

    //console.log(data);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(data);
  }
  
});

module.exports = router;
