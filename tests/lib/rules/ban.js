/**
 * @fileoverview Ban methods
 * @author Rémi THOMAS
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/ban'),

    RuleTester = require('eslint').RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('ban with default options', rule, {
    valid: [
        {
            code: '// comment'
        },
        {
            code: 'for(item in list) {}'
        }
    ],

    invalid: []
});

ruleTester.run('ban with configuration for function (ban function `functionName`)', rule, {
    valid: [
        'foo()',
        {
            code: '// comment functionName()',
            options: [{'name': 'functionName', 'message': 'Prefer use functionName2'}]
        },
        {
            code: 'for(item in list) {}',
            options: [{'name': 'functionName', 'message': 'Prefer use functionName2'}]
        },
        {
            code: 'var functionName = \'hello\';',
            options: [{'name': 'functionName', 'message': 'Prefer use functionName2'}]
        }
    ],

    invalid: [
        // Ban function
        {
            code: 'functionName(\'fn\');',
            errors: [{
                message: 'Prefer use functionName2'
            }],
            options: [{'name': 'functionName', 'message': 'Prefer use functionName2'}]
        },
        {
            code: `
                var result = functionName('myString');
            `,
            errors: [{
                message: 'Prefer use functionName2'
            }],
            options: [{'name': 'functionName', 'message': 'Prefer use functionName2'}]
        },
    ]
});

ruleTester.run('ban with configuration for method (ban method `push`)', rule, {
    valid: [
        'value.bar()',
        {
            code: '// comment',
            options: [{'name': ['*', 'push'], 'message': 'Prefer use es6 spread'}]
        },
        {
            code: 'for(item in list) {}',
            options: [{'name': ['*', 'push'], 'message': 'Prefer use es6 spread'}]
        },
        {
            code: 'var functionName = \'functionName\';',
            options: [{'name': ['*', 'push'], 'message': 'Prefer use es6 spread'}]
        },
        {
            code: 'animals.push(\'cows\')',
            options: [{'name': ['humans', 'push'], 'message': 'Prefer use es6 spread'}]
        }
    ],

    invalid: [
        // Ban method
        {
            code: 'animals.push(\'dogs\')',
            errors: [{
                message: 'Prefer use es6 spread'
            }],
            options: [{'name': ['*', 'push'], 'message': 'Prefer use es6 spread'}]
        },
        {
            code: 'animals.push(\'cows\')',
            errors: [{
                message: 'Prefer use es6 spread'
            }],
            options: [{'name': ['animals', 'push'], 'message': 'Prefer use es6 spread'}]
        }
    ]
});
