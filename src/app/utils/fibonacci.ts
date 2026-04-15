export type FibonacciStrategyId = 'recursive' | 'memoized-recursive' | 'iterative';

export interface FibonacciStrategy {
  readonly id: FibonacciStrategyId;
  execute(n: number): number;
}

export class RecursiveFibonacciStrategy implements FibonacciStrategy {
  readonly id: FibonacciStrategyId = 'recursive';

  execute(n: number): number {
    return n <= 1 ? n : this.execute(n - 1) + this.execute(n - 2);
  }
}

export class MemoizedRecursiveFibonacciStrategy implements FibonacciStrategy {
  readonly id: FibonacciStrategyId = 'memoized-recursive';
  private readonly cache: Map<number, number>;

  constructor(initialCache?: ReadonlyMap<number, number>) {
    this.cache = new Map<number, number>([
      [0, 0],
      [1, 1],
      ...(initialCache ? initialCache.entries() : []),
    ]);
  }

  execute(n: number): number {
    const cached = this.cache.get(n);
    if (cached !== undefined) {
      return cached;
    }

    const value = this.execute(n - 1) + this.execute(n - 2);
    this.cache.set(n, value);
    return value;
  }

  getCacheSize(): number {
    return this.cache.size;
  }
}

export class IterativeFibonacciStrategy implements FibonacciStrategy {
  readonly id: FibonacciStrategyId = 'iterative';

  execute(n: number): number {
    if (n <= 1) {
      return n;
    }

    let previous = 0;
    let current = 1;

    for (let index = 2; index <= n; index += 1) {
      const next = previous + current;
      previous = current;
      current = next;
    }

    return current;
  }
}

export interface FibonacciCalculatorOptions {
  strategy?: FibonacciStrategy;
  autoThreshold?: number;
}

export class FibonacciCalculator {
  private strategy?: FibonacciStrategy;
  private readonly autoThreshold: number;
  private lastUsedStrategyId: FibonacciStrategyId | null = null;

  constructor(options: FibonacciCalculatorOptions = {}) {
    const { strategy, autoThreshold = 40 } = options;
    this.strategy = strategy;
    this.autoThreshold = autoThreshold;
  }

  setStrategy(strategy?: FibonacciStrategy): void {
    this.strategy = strategy;
  }

  getStrategy(): FibonacciStrategy | undefined {
    return this.strategy;
  }

  getLastUsedStrategyId(): FibonacciStrategyId | null {
    return this.lastUsedStrategyId;
  }

  calculate(n: number): number {
    assertValidInput(n);

    const chosenStrategy = this.strategy ?? this.chooseBestStrategy(n);
    this.lastUsedStrategyId = chosenStrategy.id;

    return chosenStrategy.execute(n);
  }

  private chooseBestStrategy(n: number): FibonacciStrategy {
    return n <= this.autoThreshold
      ? new MemoizedRecursiveFibonacciStrategy()
      : new IterativeFibonacciStrategy();
  }
}

export function fibonacci(n: number, strategy?: FibonacciStrategy): number {
  const calculator = new FibonacciCalculator({ strategy });
  return calculator.calculate(n);
}

function assertValidInput(value: number): void {
  if (!Number.isInteger(value) || value < 0) {
    throw new Error('n must be a non-negative integer.');
  }
}
