// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

const linkedList1 = {
  next: {
    next: {
      next: {
        next: null,
        value: null,
      },
      value: 3,
    },
    value: 2,
  },
  value: 1,
};

const linkedList2 = {
  next: {
    next: {
      next: {
        next: null,
        value: null,
      },
      value: 'C',
    },
    value: 'B',
  },
  value: 'A',
};

const elements1 = [1, 2, 3];
const elements2 = ['A', 'B', 'C'];

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(elements1)).toStrictEqual(linkedList1);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(elements2)).toMatchSnapshot(linkedList2);
  });
});
