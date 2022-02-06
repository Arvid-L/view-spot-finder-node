const valid_mesh = require('./test_data/mesh.json');
const valid_mesh_10000 = require('./test_data/mesh_x_sin_cos_10000.json');
const valid_mesh_20000 = require('./test_data/mesh_x_sin_cos_20000.json');

const invalid_mesh_elements = require('./test_data/invalid_mesh_elements.json');
const invalid_mesh_nodes = require('./test_data/invalid_mesh_nodes.json');
const invalid_mesh_values = require('./test_data/invalid_mesh_values.json');

const {validator} = require('../lib/mesh_validator.js')

describe('Mesh Validator', () => {

  it('validates JSON mesh correctly', () => {
    expect(validator(valid_mesh)).toBe(true)
    expect(validator(valid_mesh_10000)).toBe(true)
    expect(validator(valid_mesh_20000)).toBe(true)

  })

  it('throws correct errors', () => {
    expect(() => { validator(invalid_mesh_elements) }).toThrowError(/Invalid 'element'/)
    expect(() => { validator(invalid_mesh_nodes) }).toThrowError(/Invalid 'node'/)
    expect(() => { validator(invalid_mesh_values) }).toThrowError(/Invalid 'value'/)
  })
    
})