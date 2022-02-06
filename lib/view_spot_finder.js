'use strict';

const _ = require('underscore');

module.exports = {
  validator: (meshObject) => {
    const validProperties = ['elements', 'nodes', 'values']
    return _.chain(meshObject)
      .keys()
      .intersection(validProperties)
      .isEqual(validProperties)
      .value()
  }
}




