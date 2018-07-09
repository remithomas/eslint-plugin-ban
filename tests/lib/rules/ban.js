/**
 * @fileoverview Ban methods
 * @author Rémi THOMAS
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/ban"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("ban with default options", rule, {
    valid: [
        {
            code: "// comment"
        },
        {
            code: "for(item in list) {}"
        }
    ],

    invalid: []
});

ruleTester.run("ban with configuration for function (ban function `functionName`)", rule, {
    valid: [
        "foo()",
        {
            code: "// comment",
            options: [{"name": "functionName", "message": "Prefer use functionName2"}]
        },
        {
            code: "for(item in list) {}",
            options: [{"name": "functionName", "message": "Prefer use functionName2"}]
        },
        {
            code: "var functionName = 'cows';",
            options: [{"name": "functionName", "message": "Prefer use functionName2"}]
        }
    ],

    invalid: [
        // Ban function
        {
            code: "functionName('cows');",
            errors: [{
                message: "Prefer use functionName2"
            }],
            options: [{"name": "functionName", "message": "Prefer use functionName2"}]
        },
        {
            code: `
                var result = functionName('cows');
            `,
            errors: [{
                message: "Prefer use functionName2"
            }],
            options: [{"name": "functionName", "message": "Prefer use functionName2"}]
        },
    ]
});

ruleTester.run("ban with configuration for method (ban method `push`)", rule, {
    valid: [
        "value.bar()",
        {
            code: "// comment",
            options: [{"name": "push", "message": "Prefer use es6 spread"}]
        },
        {
            code: "for(item in list) {}",
            options: [{"name": "functionName", "message": "Prefer use es6 spread"}]
        },
        {
            code: "var functionName = 'cows';",
            errors: [{
                message: "Prefer use es6 spread",
                type: "Identifier"
            }],
            options: [{"name": "functionName", "message": "Prefer use es6 spread"}]
        }
    ],

    invalid: [
        // Ban method
        // {
        //     code: "animals.push('cows')",
        //     errors: [{
        //         message: "Prefer use forEach"
        //     }],
        //     options: [{"name": ["*", "push"], "message": "Prefer use forEach"}]
        // }
    ]
});
