# eslint-plugin-ban [![Build Status](https://travis-ci.org/remithomas/eslint-plugin-ban.svg?branch=master)](https://travis-ci.org/remithomas/eslint-plugin-ban) [![npm version](https://img.shields.io/npm/v/eslint-plugin-ban.svg?style=flat-square)](https://www.npmjs.com/package/eslint-plugin-ban)

> Allows you to bannish some methods or functions.. Inspired by [tslint ban rule](https://palantir.github.io/tslint/rules/ban/)

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-ban`:

```
$ npm install eslint-plugin-ban --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-ban` globally.

## Usage

Add `ban` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["ban"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "ban/ban": [
      2,
      { "name": "functionName", "message": "Prefer use functionName2" }
    ]
  }
}
```

## Some examples

> An error

```json
{
  "rules": {
    "ban/ban": [
      2,
      {
        "name": ["*", "push"],
        "message": "Prefer use es6 spread like [...items, newItem]"
      }
    ]
  }
}
```

> A simple warning

```json
{
  "rules": {
    "ban/ban": [
      1,
      {
        "name": "api",
        "message": "This function is deprecated, please use api.call()"
      }
    ]
  }
}
```

> Multiple errors

```json
{
  "rules": {
    "ban/ban": [
      "error",
      {
        "name": "api",
        "message": "This function is deprecated, please use api.call()"
      },
      {
        "name": ["*", "push"],
        "message": "Prefer use es6 spread like [...items, newItem]"
      },
      { "name": "functionName", "message": "Prefer use functionName2" }
    ]
  }
}
```

> Widcard

```json
{
  "rules": {
    "ban/ban": [
      2,
      { "name": ["console", "*"], "message": "Please use our logger" }
    ]
  }
}
```

# Todo

- [ ] Possibility to add `error`and `warning` at same time

# Contributing

Please feel free to submit, comment anything on this repo :)
