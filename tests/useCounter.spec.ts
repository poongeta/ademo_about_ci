import { renderHook, act } from '@testing-library/react';
import useCounter from './useCounter';

// src/hooks/features/homepage/useCounter.test.ts

describe('useCounter', () => {
  it('should initialize count to 0 and val to 1', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
    expect(result.current.val).toBe(1);
  });

  it('should increment count by val', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
  });

  it('should update val and increment count accordingly', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.setVal(5);
    });
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(5);
  });

  it('should update val with setVal', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.setVal(10);
    });
    expect(result.current.val).toBe(10);
  });
});
it('should increment count multiple times correctly', () => {
  const { result } = renderHook(() => useCounter());
  act(() => {
    result.current.increment();
    result.current.increment();
  });
  expect(result.current.count).toBe(2);
});

it('should handle negative val for increment', () => {
  const { result } = renderHook(() => useCounter());
  act(() => {
    result.current.setVal(-3);
  });
  act(() => {
    result.current.increment();
  });
  expect(result.current.count).toBe(-3);
});

it('should not change count when val is set to zero and increment is called', () => {
  const { result } = renderHook(() => useCounter());
  act(() => {
    result.current.setVal(0);
  });
  act(() => {
    result.current.increment();
  });
  expect(result.current.count).toBe(0);
});

it('should not change count when setVal is called', () => {
  const { result } = renderHook(() => useCounter());
  act(() => {
    result.current.setVal(100);
  });
  expect(result.current.count).toBe(0);
});