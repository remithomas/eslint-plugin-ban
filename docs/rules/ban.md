# Ban methods (ban)

Allows you to bannish some methods or functions.


## Rule Details

For example 

```json
[{
  "name": "functionName",
  "message": "my custom message because you use the function functionName"
}]
```

Examples of **incorrect** code for this rule:

```js
var result = functionName('myString');
```

Examples of **correct** code for this rule:

```js
var result = _functionName('myString');
```

### Options

Simple `function`

```json
[{
  "name": "functionName",
  "message": "my custom message because you use the function functionName"
}]
```

`Method` on every kind of objects

```json
[{
  "name": ["*", "functionName"],
  "message": "my custom message because you use the function functionName"
}]
```

`Method` on object named `myObj`

```json
[{
  "name": ["myObj", "functionName"],
  "message": "my custom message because you use the function functionName"
}]
```
