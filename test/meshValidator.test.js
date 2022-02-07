const validMesh = require('./test_data/mesh.json');
const validMesh10000 = require('./test_data/mesh_x_sin_cos_10000.json');
const validMesh20000 = require('./test_data/mesh_x_sin_cos_20000.json');;

const invalidElementsMesh = require('./test_data/invalid_mesh_elements.json');
const invalidNodesMesh = require('./test_data/invalid_mesh_nodes.json');
const invalidValuesMesh = require('./test_data/invalid_mesh_values.json');

const {meshValidator} = require('../lib/meshValidator.js')

describe('Mesh Validator', () => {

  it('validates JSON mesh correctly', () => {
    expect(meshValidator(validMesh)).toBe(true)
    expect(meshValidator(validMesh10000)).toBe(true)
    expect(meshValidator(validMesh20000)).toBe(true)

  })

  it('throws correct errors', () => {
    expect(() => { meshValidator(invalidElementsMesh) }).toThrowError(/Invalid 'element'/)
    expect(() => { meshValidator(invalidNodesMesh) }).toThrowError(/Invalid 'node'/)
    expect(() => { meshValidator(invalidValuesMesh) }).toThrowError(/Invalid 'value'/)
  })
    
})