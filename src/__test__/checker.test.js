import { checkInput } from '../client/js/checker.js';

describe('RegExp: input', function () {
  test('should not include special characters', function () {
    const urlRGEX = /^[a-zA-Z\s]{0,255}$/;
    const urlTest = 'cair0';
    expect(urlRGEX.test(urlTest)).toBe(false);
  });
});