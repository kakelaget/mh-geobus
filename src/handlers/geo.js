const fetch = require('node-fetch');
const xml2js = require('xml2js');

const API_URL = "https://api.entur.org/anshar/1.0/rest/et";

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

async function getGeoPosition(lineName) {
    const response = await fetch(
        API_URL,
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
            .EstimatedTimetableDelivery[0]
            .EstimatedJourneyVersionFrame[0]
            .EstimatedVehicleJourney[0]
        );
    } catch (err) {
        return Promise.reject(err);
    }
}

module.exports = {
    getGeoPosition,
}
