import { describe, expect, it, vi } from 'vitest';

import {
  fibonacci,
  FibonacciCalculator,
  type FibonacciStrategy,
  IterativeFibonacciStrategy,
  MemoizedRecursiveFibonacciStrategy,
  RecursiveFibonacciStrategy,
} from './fibonacci';

const expectedSequence = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55];

describe('fibonacci strategies', () => {
  it('recursive strategy returns expected values', () => {
    const strategy = new RecursiveFibonacciStrategy();

    expectedSequence.forEach((value, index) => {
      expect(strategy.execute(index)).toBe(value);
    });
  });

  it('memoized recursive strategy returns expected values', () => {
    const strategy = new MemoizedRecursiveFibonacciStrategy();

    expectedSequence.forEach((value, index) => {
      expect(strategy.execute(index)).toBe(value);
    });
  });

  it('memoized recursive strategy stores computed values in cache', () => {
    const strategy = new MemoizedRecursiveFibonacciStrategy();

    strategy.execute(10);

    // Cache starts with 0 and 1 and then stores each computed value up to 10.
    expect(strategy.getCacheSize()).toBe(11);
  });

  it('iterative strategy returns expected values', () => {
    const strategy = new IterativeFibonacciStrategy();

    expectedSequence.forEach((value, index) => {
      expect(strategy.execute(index)).toBe(value);
    });
  });
});

describe('FibonacciCalculator', () => {
  it('uses explicit strategy when provided', () => {
    const execute = vi.fn((n: number) => n + 100);
    const customStrategy: FibonacciStrategy = {
      id: 'iterative',
      execute,
    };

    const calculator = new FibonacciCalculator({ strategy: customStrategy });
    const result = calculator.calculate(5);

    expect(result).toBe(105);
    expect(execute).toHaveBeenCalledWith(5);
    expect(calculator.getLastUsedStrategyId()).toBe('iterative');
  });

  it('chooses memoized strategy for small values by default', () => {
    const calculator = new FibonacciCalculator();

    const result = calculator.calculate(10);

    expect(result).toBe(55);
    expect(calculator.getLastUsedStrategyId()).toBe('memoized-recursive');
  });

  it('chooses iterative strategy for larger values by default', () => {
    const calculator = new FibonacciCalculator();

    const result = calculator.calculate(45);

    expect(result).toBe(1134903170);
    expect(calculator.getLastUsedStrategyId()).toBe('iterative');
  });

  it('allows strategy override after construction', () => {
    const calculator = new FibonacciCalculator();
    calculator.setStrategy(new IterativeFibonacciStrategy());

    const result = calculator.calculate(10);

    expect(result).toBe(55);
    expect(calculator.getLastUsedStrategyId()).toBe('iterative');
  });

  it('throws for invalid inputs', () => {
    const calculator = new FibonacciCalculator();

    expect(() => calculator.calculate(-1)).toThrow('n must be a non-negative integer.');
    expect(() => calculator.calculate(1.5)).toThrow('n must be a non-negative integer.');
    expect(() => calculator.calculate(Number.NaN)).toThrow('n must be a non-negative integer.');
  });
});

describe('fibonacci helper function', () => {
  it('computes values with auto strategy', () => {
    expect(fibonacci(10)).toBe(55);
  });

  it('computes values with custom strategy', () => {
    expect(fibonacci(10, new IterativeFibonacciStrategy())).toBe(55);
  });
});
