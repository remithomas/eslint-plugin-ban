/**
 * @fileoverview Ban methods
 * @author Rémi THOMAS
 */
"use strict";

const IDENTIFIER_TOKEN = "Identifier";
const MEMBER_EXPRESSION_TOKEN = "MemberExpression";
const OBJECT_TOKEN = "Object";
const IDENTIFIER_PROPERTY_TYPE = "Identifier";
const LITERAL_PROPERTY_TYPE = "Literal";
const ALL_OBJECTS = "*";
const NO_OBJECT = "";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Ban methods",
            category: "Fill me in",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            {
                "anyOf": [
                    {
                        "type": "object",
                        "properties": {
                            "name": {
                                "type": "string"
                            },
                            "message": {
                                "type": "string"
                            }
                        },
                        "additionalProperties": false,
                        "required": ["name"],
                    },
                    {
                        "type": "object",
                        "properties": {
                            "name": {
                                "type": "array",
                                "items": [
                                    { "type": "string" },
                                    { "type": "string" }
                                ]
                            },
                            "message": {
                                "type": "string"
                            }
                        },
                        "additionalProperties": false,
                        "required": ["name"],
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

        const banFunctions = banRules.map(rule => {
            return !rule.name[1] 
                ? rule.name
                : rule.name[1];
        });

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        function getNameIfPropertyIsIdentifier(property) {
            return property.type === IDENTIFIER_PROPERTY_TYPE &&
              banFunctions.indexOf(property.name) !== -1 &&
              property.name;
          }
          
        function getNameIfPropertyIsLiteral(property) {
            return property.type === LITERAL_PROPERTY_TYPE &&
                banFunctions.indexOf(property.value) !== -1 &&
                property.value;
        }

        function report(node, rule) {
            context.report({
                node: node,
                message: rule.message || 'This function/method has been banned.',
            });
        }

        function findRule(name, onObject) {
            const foundRule = banRulesWidthFunctionDefinitions.find(rule => {
                const isForAllObject = rule.name[0] === ALL_OBJECTS;
                const isForNoneObject = rule.name[0] === NO_OBJECT;
                const isForCurrentObject = onObject === rule.name[0]

                const isFunctionNameExcluded = rule.name[1] === name;

                const isFor = isForAllObject || isForNoneObject || isForCurrentObject;
                
                return isFunctionNameExcluded && isFor;
            });

            return foundRule;
        }

        // any helper functions should go here or else delete this section

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        // https://github.com/eslint-plugin-cleanjs/eslint-plugin-cleanjs/blob/master/rules/no-mutating-methods.js

        return {
            CallExpression(node){

                const hasNoExcludeFunctions = !!findRule(node.callee.name, NO_OBJECT);
                if (node.callee.type === IDENTIFIER_TOKEN && hasNoExcludeFunctions) {
                    const foundRule = findRule(node.callee.name, NO_OBJECT);
                    report(node, foundRule);
                    return;
                }
                
                if (node.callee.type !== MEMBER_EXPRESSION_TOKEN) {
                    return;
                }

                if (node.callee.object && node.callee.object.type === IDENTIFIER_TOKEN){
                    const hasExcludeFunctions = !!findRule(node.callee.property.name, node.callee.object.name)
                    if (hasExcludeFunctions) {
                        const foundRule = findRule(node.callee.property.name, node.callee.object.name);
                        report(node, foundRule);
                    }
                    return;
                }

                if (node.callee.object && node.callee.object.name === OBJECT_TOKEN) {
                    return;
                }

                const name = getNameIfPropertyIsIdentifier(node.callee.property) || getNameIfPropertyIsLiteral(node.callee.property);
                if (name) {
                    const foundRule = findRule(node.callee.name, NO_OBJECT);
                    report(node, foundRule);
                }
            }
        };
    }
};
