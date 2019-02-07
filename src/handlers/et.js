const fetch = require('node-fetch');

const parseXml = require('../utils/parseXml');

const API_URL = "https://api.entur.org/anshar/1.0/rest/et";

async function getRealtimeRaw() {
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
            .EstimatedVehicleJourney
        );
    } catch (err) {
        return Promise.reject(err);
    }
}

async function getRealtime(lineRef) {
    let data;

    try {
        data = await getRealtimeRaw();
    } catch (err) {
        return Promise.reject(err);
    }

    // Not sure if there will ever be more than one child element in this list.
    return Promise.resolve(data.filter(journey => journey.LineRef[0] === lineRef));
}

module.exports = {
    getRealtime,
    getRealtimeRaw,
}
