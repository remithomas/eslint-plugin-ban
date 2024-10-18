/**
 * @fileoverview Ban some methods
 * @author Rémi THOMAS
 */
'use strict';

var { name, version } = require('../package.json');

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require('requireindex');

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    name,
    version,
  },
  // import all rules in lib/rules
  rules: requireIndex(__dirname + '/rules'),
};
