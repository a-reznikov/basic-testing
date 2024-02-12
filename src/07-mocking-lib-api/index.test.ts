// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const axiosProto = axios.Axios.prototype;
const baseURL = 'https://jsonplaceholder.typicode.com';
const path = './users';
const data = { id: 1, name: 'Person1' };

beforeAll(() => {
  jest.useFakeTimers();
});

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const axiosSpy = jest.spyOn(axios, 'create');
    jest.spyOn(axiosProto, 'get').mockResolvedValueOnce({ data });
    await throttledGetDataFromApi(path);
    jest.runAllTimers();

    expect(axiosSpy).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    const axiosGetSpy = jest
      .spyOn(axiosProto, 'get')
      .mockResolvedValueOnce({ data });
    await throttledGetDataFromApi(path);
    jest.runAllTimers();

    expect(axiosGetSpy).toHaveBeenCalledWith(path);
  });

  test('should return response data', async () => {
    jest.spyOn(axiosProto, 'get').mockResolvedValueOnce({ data });
    const result = await throttledGetDataFromApi(path);
    jest.runAllTimers();

    expect(result).toEqual(data);
  });
});
