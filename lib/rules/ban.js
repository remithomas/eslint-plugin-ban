/**
 * @fileoverview Ban methods
 * @author Rémi THOMAS
 */
'use strict';

const IDENTIFIER_TOKEN = 'Identifier';
const MEMBER_EXPRESSION_TOKEN = 'MemberExpression';
const OBJECT_TOKEN = 'Object';
const ALL_OBJECTS = '*';
const NO_OBJECT = '';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: 'Ban methods',
            category: 'Fill me in',
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            {
                'anyOf': [
                    {
                        'type': 'object',
                        'properties': {
                            'name': {
                                'type': 'string'
                            },
                            'message': {
                                'type': 'string'
                            }
                        },
                        'additionalProperties': false,
                        'required': ['name'],
                    },
                    {
                        'type': 'object',
                        'properties': {
                            'name': {
                                'type': 'array',
                                'items': [
                                    { 'type': 'string' },
                                    { 'type': 'string' }
                                ]
                            },
                            'message': {
                                'type': 'string'
                            }
                        },
                        'additionalProperties': false,
                        'required': ['name'],
                    }
                ]
            }
        ]
    },

    create: function(context) {

        const banRules = context.options || [];
        const banRulesWidthFunctionDefinitions = banRules.map(rule => {
            const isArray = Array.isArray(rule.name);
            return isArray
                ? rule
                : Object.assign({
                    name: [NO_OBJECT, rule.name],
                    message: rule.message
                }, {});
        });

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        function report(node, rule) {
            context.report({
                node: node,
                message: rule.message || 'This function/method has been banned.',
            });
        }

        function findRuleByFunction(name) {
            const foundRule = banRulesWidthFunctionDefinitions.find(rule => {
                const isFunctionNameExcluded = rule.name[1] === name;
                const isForNoneObject = rule.name[0] === NO_OBJECT;

                return isFunctionNameExcluded && isForNoneObject;
            });

            return foundRule;
        }

        function findRuleByMethod(name, onObject) {
            const foundRule = banRulesWidthFunctionDefinitions.find(rule => {
                const isForAllObject = rule.name[0] === ALL_OBJECTS;
                const isForCurrentObject = rule.name[0] === onObject;

                const isFor = isForAllObject || isForCurrentObject;

                const isFunctionNameExcluded = rule.name[1] === name;
                return isFunctionNameExcluded && isFor;
            });

            return foundRule;
        }

        // any helper functions should go here or else delete this section

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            CallExpression(node){

                if (node.callee.type === IDENTIFIER_TOKEN) {
                    const foundRule = findRuleByFunction(node.callee.name);

                    if (foundRule) report(node, foundRule);
                    return;
                }

                if (node.callee.type !== MEMBER_EXPRESSION_TOKEN) {
                    return;
                }

                if (node.callee.object && node.callee.object.type === IDENTIFIER_TOKEN){
                    const foundRule = findRuleByMethod(node.callee.property.name, node.callee.object.name);

                    if (foundRule) report(node, foundRule);
                    return;
                }

                if (node.callee.object && node.callee.object.name === OBJECT_TOKEN) {
                    return;
                }
            }
        };
    }
};
