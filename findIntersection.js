/*
* Requirement: 
* Input: ["1, 3, 4, 7, 13", "1, 2, 4, 13, 15"]
* Output: 1,4,13
*/

function isValid(query = [], falsy = [null, undefined]) {
  const invalidResults = query.filter(q => falsy.includes(q))
  return invalidResults.length === 0
}
function splitString(str){
  return str.split(',')
}
function strToNum(strArr){
  return strArr.map(str => Number(str))
}
function parseNumbers({ firstSet, secondSet }, state) {
  let listA = strToNum(splitString(firstSet))
  let listB = strToNum(splitString(secondSet))
  state = { ...state, listA, listB }
  return state
}
function searchIndexes(_desc, state) {
  const { listA, listB } = state
  const intersectionArr = listA.filter(num => listB.includes(num))
  state = { ...state, intersectionArr }
  return state
}
function indexToString(_desc, state) {
  const { intersectionArr } = state
  const hasIntersection = intersectionArr.length > 0
  const intersection = intersectionArr.join(',')
  state = { ...state, hasIntersection, intersection }
  return state
}
function main(description) {
  let { steps, initialState, functions } = description
  let state = { ...initialState }
  steps.forEach(step => {
    const func = functions[step]
    state = func(description, state)
  })
  return state
}

function FindIntersection(strArr) {
  const desc = {
    firstSet: strArr[0],
    secondSet: strArr[1],
    steps: [
      'parseNumbers',
      'searchIndexes',
      'indexToString',
    ],
    initialState: {
      listA: [],
      listB: [],
      intersectionArr: [],
      intersection: '',
      hasIntersection: false
    },
    functions: {
      parseNumbers,
      searchIndexes,
      indexToString,
    }
  }
  const hasArgs = isValid([desc.firstSet, desc.secondSet])
  if (!hasArgs) {
    throw new Error('Invalid Arguments')
  }
  const { hasIntersection, intersection } = main(desc)

  if (hasIntersection) { return intersection }
  return hasIntersection
}

const output = FindIntersection(["1, 3, 4, 7, 13", "1, 2, 4, 13, 15"])
console.log(output)
