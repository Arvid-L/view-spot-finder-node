'use strict';
const _ = require('underscore');

module.exports = {
  meshValidator: (meshObject) => {
    
    const validations = [
          meshIsValid(meshObject),
          validateArray(meshObject.nodes, nodeIsValid),
          validateArray(meshObject.elements, elementIsValid),
          validateArray(meshObject.values, valueIsValid),
        ]

    return validationsAreAllTrue(validations)
  }
}

class MeshValidationError extends Error {
  constructor(message) {
    super(message)
  }
}

// Validator functions
// Checks if any of the elements in 'array' do not pass the validator function
const validateArray = (array, validator) => {
  if (_.isUndefined(array)) throw new MeshValidationError(`Expected array, got 'undefined'; for validator ${validator.name}`)

  return  _.chain(array)
    .find((array_elem) => { return !validator(array_elem)})
    .isUndefined()
    .value() 
}

const meshIsValid = (mesh) => {
  return objectContainsKeys(mesh, ['elements', 'nodes', 'values'])
}

const nodeIsValid = (node) => {
  const validations = [
    objectContainsKeys(node, ['id', 'x', 'y']),
    _.isNumber(node.x),
    _.isNumber(node.y),
  ]

  if (validations.includes(false)) throw new MeshValidationError(`Invalid 'node' object in mesh JSON: \n\n ${JSON.stringify(node)}`)
  return true
}

const elementIsValid = (element) => {
  const validations = [
    objectContainsKeys(element, ['id', 'nodes']),
    _.isEqual(element.nodes.length, 3),
  ]

  if (validations.includes(false)) throw new MeshValidationError(`Invalid 'element' object in mesh JSON: \n\n ${JSON.stringify(element)}`)
  return true
}

const valueIsValid = (value) => {
  const validations = [
    objectContainsKeys(value, ['element_id', 'value']),
    _.isNumber(value.value),
  ]

  if (validations.includes(false)) throw new MeshValidationError(`Invalid 'value' object in mesh JSON: \n\n ${JSON.stringify(value)}`)
  return true
}

const objectContainsKeys = (object, keys) => {
  return _.chain(object)
    .keys()
    .intersection(keys)
    .sort()
    .isEqual(keys.sort())
    .value()
}

const validationsAreAllTrue = (validations) => {
  return !validations.includes(false)
}



