import { AppLiteralConsts } from '../constant/consts';
import { SearchRequest } from '../interfaces/search-request.interface';


export class UrlHelper {
  /**
   * Desc : url join
   * combining the multiple segments of string into url
   */
  public static urlJoin(...args: Array<string>): string {
    return (
      args
        .join('/')
        // eslint-disable-next-line no-useless-escape
        .replace(/[\/]+/g, '/')
        .replace(/^(.+):\//, '$1://')
        .replace(/^file:/, 'file:/')
        .replace(/\/(\?|&|#[^!])/g, '$1')
        .replace(/\?/g, '&')
        .replace('&', '?')
    );
  }


  public static generateQueryString(pageOptions: SearchRequest) {
    let finalUrl = '';
    if (pageOptions) {
      finalUrl = '?';
      const urlMap = new Map<string, string>();
      Object.entries(pageOptions).forEach(([key, value]) => {
        if (value && key != AppLiteralConsts.queryString.searchQuery) {
          urlMap.set(key, value.toString());
        }
      });
      if (pageOptions.searchQuery) {
        Object.entries(pageOptions.searchQuery).forEach(([key, value]) => {
          if (value) {
            urlMap.set(encodeURIComponent(key), encodeURIComponent(value.toString()));
          }
        });
      }
      if (urlMap.size > 0) {
        finalUrl = Array.from(
          urlMap.entries(),
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          (keyValue: [string, string], number: number) => keyValue[0] + '=' + keyValue[1],
        ).join('&');
      }
    }
    return `?${finalUrl}`;
  }


  /**
   * Desc : customize the api call
   * @param pageOptions :providing page size, page sorting and page order-by details
   * @returns : query string
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static toQueryString(queryObject: any) {
    let finalUrl = '';
    const urlMap = new Map<string, string>();
    if (!queryObject) {
      return '?';
    }
    Object.entries(queryObject).forEach(([key, value]) => {
      if (value) {
        urlMap.set(encodeURIComponent(key), encodeURIComponent(value.toString()));
      }
    });
    if (urlMap.size > 0) {
      finalUrl = Array.from(
        urlMap.entries(),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (keyValue: [string, string], number: number) => keyValue[0] + '=' + keyValue[1],
      ).join('&');
    }
    return `?${finalUrl}`;
  }
}
