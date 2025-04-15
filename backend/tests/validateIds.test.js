const validateIds = require('../functions/validateIds');

describe('validateIds middleware', () => {
  it('should return true for a single valid ObjectId', () => {
    const valid = ['507f191e810c19729de860ea'];
    expect(validateIds(valid)).toBe(true);
  });

  it('should return true for multiple valid ObjectIds', () => {
    const valid = ['507f1f77bcf86cd799439011', '60b725f10c9c85c70d97880d'];
    expect(validateIds(valid)).toBe(true);
  });

  it('should return false if at least one ID is invalid', () => {
    const mixed = ['507f1f77bcf86cd799439011', 'hello'];
    expect(validateIds(mixed)).toBe(false);
  });

  it('should return false for all invalid IDs', () => {
    const invalid = ['hello', '12345', '', null];
    expect(validateIds(invalid)).toBe(false);
  });

  it('should return true for an empty array', () => {
    expect(validateIds([])).toBe(true);
  });
});
