# Declarative Programming
Examples of declarative programming

## What is Declarative Programming?
Declarative programming is when we tell a program what we want to do, and we're hands off afterward.

## Are the Examples 100% Declarative?
No. I don't believe that's possible. There needs to be a level or layer of **how** the program achieves what we **want** it to do.

Ultimately, there needs to be some sort of abstraction layer to pass our description into. Beyond the abstraction is nothing but imperative code.

### Every application could literally look like this on the surface.

```js

const description = {
  stringArr: ['a,b,c,d', 'a,b,c,d,d,-B'],
  functions: [splitStrings, parseBackspaces, compareStrings],
  initialState: {
    stringA: '',
    stringB: '',
    isEqual: false
  }
};

function interpreter(description) {
  let { initialState, functions } = description;
  let state = { ...initialState };
  functions.forEach(func => callFunc(func));
  return state;

  function callFunc(func) {
    state = func(description, state);
  }
}

const { isEqual } = interpreter(description);
```
