import {testing} from '../server/index.js'

describe("Testing Server", ()=>{
    test('should be 3', () => {

        expect(testing(1,2)).toBe(3);
      });
})