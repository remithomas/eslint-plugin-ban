# eslint-plugin-ban

> Currently in WIP
Ban some methods and functions. Inspire by [tslint ban rule](https://palantir.github.io/tslint/rules/ban/)

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
    "plugins": [
        "ban"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "ban/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here
