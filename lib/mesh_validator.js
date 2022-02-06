'use strict';

const _ = require('underscore');

module.exports = {
  validator: (meshObject) => {
    
    const validations = [
          validateArray(meshObject, meshValid),
          validateArray(meshObject.nodes, nodeValid),
          validateArray(meshObject.elements, elementValid),
          validateArray(meshObject.values, valueValid),
        ]
    
    return validationsAllTrue(validations)
  }
}


// Validator functions

// Checks if any of the elements in 'array' do not pass the validator function. Stops execution at the first invalid element. If no invalid element is found (meaning _.find returns 'undefined') return true.
const validateArray = (array, validator) => {
  if (_.isUndefined(array)) return false
  return  _.chain(array)
    .find((array_elem) => { return !validator(array_elem)})
    .isUndefined()
}

const meshValid = (mesh) => {
  return objectContainsKeys(mesh, ['elements', 'nodes', 'values'])
}

const nodeValid = (node) => {
  const validations = [
    objectContainsKeys(node, ['id', 'x', 'y']),
    _.isNumber(node.x),
    _.isNumber(node.y),
  ]

  return validationsAllTrue(validations)
}

const elementValid = (element) => {
  const validations = [
    objectContainsKeys(element, ['id', 'nodes']),
    _.isEqual(element.nodes.length, 3),
  ]

  return validationsAllTrue(validations)
}

const valueValid = (value) => {
  const validations = [
    objectContainsKeys(value, ['element_id', 'value']),
    _.isNumber(value.value),
  ]

  return validationsAllTrue(validations)
}

const objectContainsKeys = (object, keys) => {
  return _.chain(object)
    .keys()
    .intersection(keys)
    .isEqual(keys)
    .value()
}

const validationsAllTrue = (validations) => {
  return !validations.includes(false)
}



