// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';
import lodash from 'lodash';
jest.unmock('lodash');

const initialBalance = 1000;
const account = getBankAccount(initialBalance);
const accountForTransfer = getBankAccount(0);

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(2000)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(2000, accountForTransfer)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(2000, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    expect(account.getBalance()).toBe(initialBalance);
    account.deposit(500);
    expect(account.getBalance()).toBe(1500);
  });

  test('should withdraw money', () => {
    expect(account.getBalance()).toBe(1500);
    account.withdraw(500);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should transfer money', () => {
    expect(account.getBalance()).toBe(initialBalance);
    expect(accountForTransfer.getBalance()).toBe(0);
    account.transfer(500, accountForTransfer);
    expect(account.getBalance()).toBe(500);
    expect(accountForTransfer.getBalance()).toBe(500);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    lodash.random = jest.fn(() => 1);
    const balance = await account.fetchBalance();
    expect(balance).not.toBeNull();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    lodash.random = jest.fn(() => 1);
    expect(account.getBalance()).toBe(500);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBeLessThan(500);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    lodash.random = jest.fn(() => 0);
    try {
      await account.fetchBalance();
    } catch (error) {
      expect(error).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
