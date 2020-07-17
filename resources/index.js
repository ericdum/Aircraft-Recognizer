const csv = require("csv-parser")
const path = require('path');
const fs = require('fs')

const aircrafts = {};

const getICAODoc8643 = async () => new Promise(function(resolve, reject){
  fs.createReadStream(path.join(__dirname, 'ICAO-doc8643-2019.csv'))
  .pipe(csv())
  .on('data', (data) => {
    aircrafts[data.ManufacturerCode+' '+data.ModelFullName] = {
      manufacturer: data.ManufacturerCode,
      abbr: data.Designator,
      type: data.AircraftDescription,
      raw: data
    }
  })
  .on('end', () => {
    resolve()
  });
})

const getFAA = async () => new Promise(function(resolve, reject){
  fs.createReadStream(path.join(__dirname, 'FAA-201810.csv'))
  .pipe(csv())
  .on('data', (data) => {
    aircrafts[data.Manufacturer +' '+ data.Model] = {
      manufacturer: data.Manufacturer,
      abbr: data["ICAO Code"],
      type: undefined,
      raw: data
    }
  })
  .on('end', () => {
    resolve()
  });
})

module.exports = {
  inited: false,
  aircrafts: aircrafts,
  init: async function get(){
    if (module.exports.inited) return aircrafts

    await getICAODoc8643();
    await getFAA();

    module.exports.inited = true;
    return aircrafts
  }
}

module.exports.init();
