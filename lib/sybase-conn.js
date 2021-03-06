var Sybase = require('sybase');

function getSrType(params) {
    return new Promise(function(resolve,reject){
        var db = new Sybase('165.243.210.104',5638,'gshsdw','lghs','gsshopdw007');

        db.connect((err) => {
            if (err) {
                reject('db connection error');
            }
            const query = "SELECT D_SR_TYPE_L.SR_NAME FROM D_SR_TYPE_L";

            db.query(query, (err,data) => {
                if(err) {
                    console.log(err);
                    reject('query error');
                }

                resolve(data);
            });
        });
    });
}

function getAllSrData(params) {
    return new Promise(function(resolve,reject){
        
        console.log('params : ', params);
        var db = new Sybase('165.243.210.104',5638,'gshsdw','lghs','gsshopdw007');
        db.connect((err) => {

            if (err) {
                console.log('error');
                reject('connection error');
            }
            const query = `
            SELECT TOP 10
                D_SR_TYPE_L.SR_NAME AS SR_NAME_L,
                D_SR_TYPE_M.SR_NAME AS SR_NAME_M,
                D_SR_TYPE_S.SR_NAME AS SR_NAME_S,
                D_CUS.CUS_NUM,
                D_SR.SR_NUM,
                D_SR.SR_CONTENT,
                D_EMPL_NEW.CLASS_NAME,
                D_GOODS_STD.CLASS_4_DESC,
                D_ITEM.ITEM_CODE,
                D_ITEM.ITEM_NAME,
                D_GOODS_QUE.BROAD_DATE,
                D_GOODS.MD_ID,
                D_SR.SR_REC_DATE,
                D_SR.MEDIA,
                D_GOODS.GOODS_CODE,
                D_GOODS.GOODS_NAME
                FROM
                D_CUS RIGHT OUTER JOIN D_SR ON (D_SR.CUS_NUM=D_CUS.CUS_NUM)
                LEFT OUTER JOIN D_GOODS ON (D_GOODS.GOODS_CODE=D_SR.GOODS_CODE)
                INNER JOIN D_GOODS_STD ON (D_GOODS.CLASS_4=D_GOODS_STD.CLASS_4)
                INNER JOIN D_ITEM ON (D_ITEM.GOODS_CODE=D_GOODS.GOODS_CODE)
                INNER JOIN D_GOODS_QUE ON (D_GOODS.GOODS_CODE=D_GOODS_QUE.GOODS_CODE)
                INNER JOIN D_EMPL_NEW ON (D_EMPL_NEW.MEDIA=(CASE WHEN D_SR.MEDIA IN ('C','U') THEN 'C'  ELSE  D_SR.MEDIA END)
                and D_EMPL_NEW.EMPL_NUMB= (SELECT X.MD_ID FROM D_GOODS X WHERE D_SR.GOODS_CODE= X.GOODS_CODE))
                INNER JOIN D_SR_TYPE_L ON (D_SR_TYPE_L.SR_TYPE=D_SR.SR_TYPE_L)
                INNER JOIN D_SR_TYPE_M ON (D_SR_TYPE_M.SR_TYPE=D_SR.SR_TYPE_M)
                INNER JOIN D_SR_TYPE_S ON (D_SR_TYPE_S.SR_TYPE=D_SR.SR_TYPE_S)
                WHERE
                ( 
                D_SR_TYPE_L.SR_NAME  =  '소비자보호'
                AND  ( (D_SR.SR_TYPE_L NOT IN ('OL22', 'OL27','OL31'))  )
                AND  D_SR.SR_REC_DATE  BETWEEN  '20190120' AND '20190121'
                )
            `;

            db.query(query, (err,data) => {
                if(err) {
                    console.log(err);
                    reject('query error');
                }

                resolve(data);
            });
        });
    });
}

module.exports = {
    getAllSrData,
    getSrType
}