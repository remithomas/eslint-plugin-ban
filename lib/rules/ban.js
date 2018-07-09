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
                "allOf": [
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
                    }
                ]
            }
        ]
    },

    create: function(context) {

        const banRules = context.options || [];
        const sourceCode = context.getSourceCode();
        const banFunctions = banRules.map(rule => rule.name);

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
                // message: 'Prefer use functionName2'
                message: rule.message || 'This function has been banned.',
            });
        }

        // any helper functions should go here or else delete this section

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        // https://github.com/eslint-plugin-cleanjs/eslint-plugin-cleanjs/blob/master/rules/no-mutating-methods.js

        return {
            CallExpression(node){

                // console.log("###########################")
                // console.log(node.callee.property);
                // console.log(node.callee.object)
                // console.log(node.callee.name)


                const hasNoExcludeFunctions = banFunctions.includes(node.callee.name);
                if (node.callee.type === IDENTIFIER_TOKEN && hasNoExcludeFunctions) {
                    const foundRule = banRules.find(rule => rule.name === node.callee.name);
                    report(node, foundRule);
                    return;
                }
                
                if (node.callee.type !== MEMBER_EXPRESSION_TOKEN) {
                    return;
                }

                if (node.callee.object && node.callee.object.type === IDENTIFIER_TOKEN){
                    return;
                }

                if (node.callee.object && node.callee.object.name === OBJECT_TOKEN) {
                    return;
                }

                const name = getNameIfPropertyIsIdentifier(node.callee.property) || getNameIfPropertyIsLiteral(node.callee.property);
                if (name) {
                    const foundRule = banRules.find(rule => rule.name === node.callee.name);
                    report(node, foundRule);
                }

                // if (node.callee.object.name === OBJECT_TOKEN) {
                //     if (mutatingObjectMethods.indexOf(node.callee.property.name) !== -1) {
                //       context.report({
                //         node,
                //         message: `The use of method \`Object.${node.callee.property.name}\` is not allowed as it will mutate its arguments`
                //       });
                //     }
                //     return;
                // }






                // const tokens = sourceCode.getTokens(node);

                // tokens.forEach(token => {
                //     const isTokenIdentifier = token.type === IDENTIFIER_TOKEN;
                //     const hasExcludeToken = banFunctions.includes(token.value);

                //     console.log('-------------------------------token', node.callee.type)

                //     if (isTokenIdentifier && hasExcludeToken) {
                //         console.log('----------- ups')
                //         if (previousNode) {
                //             console.log('previousNode', previousNode)
                //         }

                //         console.log('token', node, node.parent)
                //         const foundRule = banRules.find(rule => rule.name === token.value);

                //         context.report({
                //             node: node,
                //             message: foundRule.message || 'This function has been banned.',
                //         });
                //     }
                // });

                // previousNode = node;
            }
        };
    }
};
