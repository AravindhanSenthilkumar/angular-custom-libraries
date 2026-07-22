import { IConfig } from './iconfig';

describe('IConfig', () => {
  it('should allow arbitrary config keys', () => {
    const config: IConfig = { pageSize: 10, sort: 'asc' };

    expect(config['pageSize']).toBe(10);
    expect(config['sort']).toBe('asc');
  });
});
