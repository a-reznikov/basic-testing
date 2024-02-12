// Uncomment the code below and write your tests
import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import path from 'path';
import fs from 'fs';

const callback = jest.fn();
const timerDelay = 500;

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const timer = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(callback, timerDelay);

    expect(timer).toHaveBeenCalledWith(callback, timerDelay);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, timerDelay);
    jest.runAllTimers();

    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const interval = jest.spyOn(global, 'setInterval');
    doStuffByInterval(callback, timerDelay);

    expect(interval).toHaveBeenCalledWith(callback, timerDelay);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.clearAllTimers();
    doStuffByInterval(callback, timerDelay);
    jest.advanceTimersByTime(timerDelay * 2);

    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile = '/folder/someFile.doc';

  test('should call join with pathToFile', async () => {
    const joinPath = jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);

    expect(joinPath).toBeCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);
    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const textInFile = 'text';
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(textInFile);
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true);
    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBe(textInFile);
  });
});
