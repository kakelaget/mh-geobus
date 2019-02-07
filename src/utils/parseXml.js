const xml2js = require('xml2js');

/**
 * Parse XML asyncronously using xml2js
 */
module.exports = function parseXml(xmlString) {
    return new Promise((resolve, reject) => {
        xml2js.parseString(xmlString, (err, result) => {
            if (err) {
                reject(err);
            }

            resolve(result);
        });
    });
}
