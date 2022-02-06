const valid_json = require("./test_data/mesh.json");
const invalid_json = {}

let {validator} = require('./../lib/view_spot_finder.js')

describe('View Spot Finder', () => {

    it('validates JSON mesh', () => {
        expect(validator(valid_json)).toBe(true)
        expect(validator(invalid_json)).toBe(false)
    })
    

    
})