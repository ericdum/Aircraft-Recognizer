const ACRes = require('../resources');

module.exports = async function(aircraftName){
  await ACRes.init();
  var abbr;
  abbr = matchBoeing(aircraftName) 
  if(abbr) return {
    manufacturer: 'Boeing',
    abbr: abbr,
    family: abbr.substr(0,3)+'7'
  }
  abbr = matchAirbus(aircraftName) 
  if(abbr) return {
    manufacturer: 'Airbus',
    abbr: abbr,
    family: getAirbusFamily(abbr)
  }
  abbr = matchAntonov(aircraftName) 
  if(abbr) return {
    manufacturer: 'Antonov',
    abbr: abbr,
    family: abbr
  }
  abbr = matchTupolev(aircraftName) 
  if(abbr) return {
    manufacturer: 'Tuopolev',
    abbr: abbr,
    family: abbr
  }
  abbr = matchIlyushin(aircraftName) 
  if(abbr) return {
    manufacturer: 'Ilyushin',
    abbr: abbr,
    family: abbr
  }
  abbr = matchERJ(aircraftName) 
  if(abbr) return {
    manufacturer: 'Embraer',
    abbr: abbr,
    family: abbr
  }
  abbr = matchCRJ(aircraftName) 
  if(abbr) return {
    manufacturer: 'Bombardier',
    abbr: abbr,
    family: abbr
  }
  abbr = matchMD(aircraftName) 
  if(abbr) return {
    manufacturer: 'Boeing (McDonnell Douglas)',
    abbr: abbr,
    family:abbr 
  }
  abbr = matchComac(aircraftName) 
  if(abbr) return {
    manufacturer: 'Comac',
    abbr: abbr,
    family: "ARJ21"
  }
  console.error('unmatch', aircraftName)
  return {
    abbr: aircraftName
  }
}

function getAirbusFamily(abbr) {
  if (abbr.match(/318|319|20N|21N|19N|18N/)) return 'A320'
  else return abbr.substr(0,3)+'0'
}

function matchBoeing(name){
  if (name[0]=== 'A') return false;

  var matches = name.match(/(747).*domestic$/)
  if (matches) return 'B74D';

  var matches = name.match(/(747).*SCA$/)
  if (matches) return 'BSCA';

  var matches = name.match(/(747).*SP$/)
  if (matches) return 'B74S';

  var matches = name.match(/(747).*SR$/)
  if (matches) return 'B74R';

  var matches = name.match(/(777).*ER$/)
  if (matches) return 'B77E';

  var matches = name.match(/MAX ?(\d)$/)
  if (matches) return 'B3' + matches[1] + 'M';

  var matches = name.match(/MAX ?10$/)
  if (matches) return 'B3XM';

  if (name.match(/^B7\d{2}$/)) return name;
  
  var matches = name.match(/(7\d)\d-(\d+).*$/)
  if (matches) return 'B'+matches[1]+_suffix(matches[2])

  var matches = name.match(/^B(7\d\d)/)
  if (matches) return 'B'+matches[1];

  return false;
}

function matchAirbus(name){
  if (name[0]=== 'B') return false;

  var matches = name.match(/3(\d\d).*neo/)
  if (matches) return 'A'+matches[1]+"N";

  if (name.match(/^A-?300.*600/)) return 'A306';
  if (name.match(/^A-?300.*ST/)) return 'A3ST';
  if (name.match(/^A-?300/)) return 'A30B';
  if (name.match(/^A-?310/)) return 'A310';
  if (name.match(/^A-?318/)) return 'A318';
  if (name.match(/^A-?319/)) return 'A319';
  if (name.match(/^A-?320/)) return 'A320';
  if (name.match(/^A-?321/)) return 'A321';
  if (name.match(/^A3\d{2}$/)) return name;

  var matches = name.match(/(3\d)\d(?:-(\d+)[\b|\w]?.*)?$/)
  if (matches) return 'A'+matches[1]+_suffix(matches[2])

  return false;
}

function _suffix(suf) {
  if (suf == '1000') return 'K';
  if (suf == '10') return 'X';
  var matches = suf.match(/\b(\d)00\b/);
  if (!matches) return suf[0]
  return matches[1]
}

function matchAntonov(name) {
  var matches = name.match(/AN`-(\d+)$/)
  if (matches) return 'AN'+matches[1];
}

function matchTupolev(name) {
  var matches = name.match(/TU?u?-?(\d+)$/)
  if (matches) return 'T'+matches[1];
}

function matchIlyushin(name) {
  var matches = name.match(/IL-?(\d+)$/)
  if (matches) return 'IL'+matches[1];
}

function matchERJ(name) {
  var matches = name.match(/E.*?(\d+).*$/)
  if (matches) return 'E'+matches[1];
}

function matchCRJ(name) {
  var matches = name.match(/CRJ.*?(\d)00/)
  if (matches) return 'CRJ'+matches[1];
  var matches = name.match(/CRJ/)
  if (matches) return 'CRJ';
}

function matchComac(name) {
  var matches = name.match(/ARJ21-?(\d)/)
  if (matches) return 'AJ2'+matches[1]||'1';
  var matches = name.match(/C-?919/)
  if (matches) return 'C919';
}

function matchMD(name) {
  var matches = name.match(/MD-?(\d*)/)
  if (matches) return 'MD'+matches[1];
}
