var Sybase = require('sybase');
var db = new Sybase('165.243.210.104',5638,'gshsdw','bs','bsuser');

db.connect((err) => {
    if (err) return console.log(err);

    db.query('select TOP 100 MD_ID from lghs.D_GOODS', (err, data) => {
        if (err) console.log(err);

        console.log(data);

        db.disconnect();
    });
});