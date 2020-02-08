/*
* Compare an array of two strings and ensure they're equal.
* Treat the character "-B" as a backspace.
* Return a string of 'true' or 'false'.
*/

function interpreter(description) {
  let { steps, initialState, functions } = description;
  let state = { ...initialState };
  steps.forEach(executeStep());
  return state;

  function executeStep() {
    return step => {
      const func = functions[step];
      state = func(description, state);
    };
  }
}

function splitStrings({ stringA, stringB }, state){
  const listA = stringA.split(',')
  const listB = stringB.split(',')
  state = { ...state, listA, listB }
  return state
}
function replaceInvalidStr(arr){
  const outArr = []
  arr.forEach((str, index) => {
    const isBackspace = str === '-B'
    if (isBackspace) {
      const prev = index - 1
      outArr[prev] = null
    }
    outArr.push(str)
  })
  return outArr
}
function filterBadChars(arr) {
  return arr.filter(item => item !== null && item !== '-B')
}
function parseBackspaces(_description, state){
  const { listA: oldA, listB: oldB } = state
  const listA = filterBadChars(replaceInvalidStr(oldA))
  const listB = filterBadChars(replaceInvalidStr(oldB))
  console.log({ listA, listB })
  state = { ...state, listA, listB }
  return state
}
function arrToStr(arr) {
  return arr.join(',')
}
function compareStrings(_description, state){
  const { listA, listB } = state
  const isEqual = arrToStr(listA) === arrToStr(listB)
  state = { ...state, isEqual }
  return state
}

function EquivalentKeypresses(strArr) { 
  const desc = {
    stringA: strArr[0],
    stringB: strArr[1],
    steps: [
      'splitStrings',
      'parseBackspaces',
      'compareStrings'
    ],
    functions: {
      splitStrings,
      parseBackspaces,
      compareStrings
    },
    initialState: {
      listA: [],
      listB: [],
      isEqual: false,
    }
  }
  
  const { isEqual } = interpreter(desc)
  return isEqual
}
   
const output = EquivalentKeypresses(["a,b,c,d", "a,b,c,c,-B,d"])
console.log(output)
