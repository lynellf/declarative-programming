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
  stringArr: ["a,b,c,d", "a,b,c,d,d,-B"],
  functions: [splitStrings, parseBackspaces, joinStrings],
  initialState: {
    stringA: "",
    stringB: "",
  },
  objectives: [nonEmptyStrings, stringsAreEqual]
};

function interpreter(description) {
  let { initialState, functions, objectives } = description;
  let state = { ...initialState };
  functions.forEach(func => callFunc(func));
  const assertions = objectives.map(obj => assert(state, obj));
  return [ state, assertions ];

  function callFunc(func) {
    state = func(description, state);
  }

  function assert(state, obj) {
    return obj(state);
  }
}

const [output, [notEmpty, isEqual]] = interpreter(description);
```

### Object-Oriented Interpreter
```typescript
type TDescription<V, S> = {
  variables: V[];
  functions: Function[];
  initialState: S;
  objectives: Function[];
};

export default class Interpreter<V, S> {
  variables: V[] = [];
  functions: Function[] = [];
  state: S;
  objectives: Function[] = [];

  constructor(description: TDescription<V, S>) {
    const { variables, functions, initialState, objectives } = description;
    this.variables = variables;
    this.functions = functions;
    this.state = initialState;
    this.objectives = objectives;
  }

  private callFunc = (func: Function) => {
    const state = this.state
    const variables = this.variables;
    this.state = func(variables, state);
  };

  private assert = (state: S, objective: Function) => {
    return objective(state);
  };

  interpret = () => {
    const { callFunc, assert } = this;
    const functions = this.functions;
    const objectives = this.objectives;
    functions.forEach(func => callFunc(func));
    const state = this.state;
    const assertions = objectives.map(obj => assert(state, obj));

    return [state, assertions] as const;
  };
}
```

```typescript
const description = {
  variables: ["hello world"],
  functions: [print],
  initialState: {
    message: ""
  },
  objectives: [nonEmptyMessage]
};

const messenger = new Interpreter(description);
const [output, [hasMessage]] = messenger.interpret();

if (hasMessage) {
  console.log({ message: output.message });
} else {
  console.error("Message is empty!");
}
```
