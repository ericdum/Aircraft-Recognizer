[![Build Status](https://travis-ci.org/ericdum/aircraft-recognizer.svg?branch=master)](https://travis-ci.org/ericdum/aircraft-recognizer)

### Background
When I first entered the aviation industry, I found that people used the name of aircraft indiscriminately.

So I created this project to collect all the aircraft family names, model names, abbreviations and then make a converter for converting between them.

This is a very started project and I need more data and more idea. Any tiny help will be welcome.

### Usage

```javascript

// init recognizer
const acr = require('aircraft-recognizer');

// recognize aircraft
var aircraft = acr.recognize(aircraftName);

/*
   aircraft =
   {
     "manufacturer": "Airbus",
     "abbr": "A19N",
     "family": "A320"
   }
*/
```
