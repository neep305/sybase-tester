var express = require('express');
var router = express.Router();
var db = require('../lib/sybase-conn');

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    console.log('req.params', req.params);

    const data = await db.getAllSrData(req.params);
    console.log('data : ', data);
    
    var result = new Object();
    result.result = 'bad';
    res.status(200).json(JSON.stringify(result));  
  } catch (error) {
    res.status(500).json()
  }
  
});

module.exports = router;
