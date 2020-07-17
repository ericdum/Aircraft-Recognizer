const expect = require('expect');
const aircraft = require('../')
const abbrs = require('./abbr-set-1');
const names1 = require('./name-set-1');
const names2 = require('./name-set-2');
const names3 = require('./name-set-3');

describe('Recognize Aircraft By Any Name', function() {
  it ('name set 1', ()=>{
    names1.forEach((name) => {
      var abbr = aircraft.recognize(name);
      expect(abbrs).toContain(abbr.abbr);
    })
  })
  it ('name set 2', ()=>{
    names2.forEach((name) => {
      var abbr = aircraft.recognize(name);
      expect(abbrs).toContain(abbr.abbr);
    })
  })
  it ('ARJ', ()=>{
    names3.forEach((name) => {
      var abbr = aircraft.recognize(name);
      expect(abbrs).toContain(abbr.abbr);
    })
  })
});
