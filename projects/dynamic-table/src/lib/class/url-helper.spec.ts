import { UrlHelper } from './url-helper';
import { OrderBy, SearchRequest  } from '../interfaces/itable';


describe('UrlHelper', () => {
  it('should create an instance', () => {
    expect(new UrlHelper()).toBeTruthy();
  });


  it('should have generateQueryString', () => {
    const pagingOptions: SearchRequest = {
      offset: 0,
      limit: 5,
      searchQuery: {
        bin: '',
        clientId: '',
        pointOfSaleId: '1kgzlny15hcs',
      },
      order: 'bin',
      sort: OrderBy.asc,
    };
    const queryString = UrlHelper.generateQueryString(pagingOptions);
    expect(queryString).toBe('?limit=5&order=bin&sort=asc&pointOfSaleId=1kgzlny15hcs');
  });
});
