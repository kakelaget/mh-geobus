const fetch = require('node-fetch');
const xml2js = require('xml2js');

const API_URL = "https://api.entur.org/anshar/1.0/rest/vm";

function parseXml(xmlString) {
    return new Promise((resolve, reject) => {
        xml2js.parseString(xmlString, (err, result) => {
            if (err) {
                reject(err);
            }

            resolve(result);
        })
    });
}

async function getGeoPosition(lineRef) {
    let url = API_URL;
    if (lineRef !== undefined &&
        lineRef !== null &&
        typeof lineRef === "string" &&
        lineRef.length > 0) {
        url += `?lineRef=${lineRef}`;
    }

    const response = await fetch(
        url,
        {
            headers: {
                "ET-ClientName": "mhgeobus-miljohackknowit"
            },
        }
    );

    const resp = await response.text();
    let data;
    try {
        data = await parseXml(resp);
    } catch (err) {
        return Promise.reject(err);
    }

    try {
        return Promise.resolve(data
            .Siri
            .ServiceDelivery[0]
            .VehicleMonitoringDelivery[0]
            .VehicleActivity[0]
        );
    } catch (err) {
        return Promise.reject(err);
    }
}

async function getGeoPositionTest() {
    const søttentrikken = "RUT:Line:17";
    return getGeoPosition(søttentrikken);
}

module.exports = {
    getGeoPosition,
    getGeoPositionTest,
}
