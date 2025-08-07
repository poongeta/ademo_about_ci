import { renderHook, act } from '@testing-library/react';
import useCounter from '../src/hooks/features/homepage/useCounter';

describe('useCounter', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);
    expect(result.current.val).toBe(1);
  });

  it('should increment count by val when increment is called', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it('should increment count by custom val when val is changed', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.setVal(5);
    });

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(5);
    expect(result.current.val).toBe(5);
  });

  it('should increment count multiple times correctly', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.setVal(3);
    });

    act(() => {
      result.current.increment();
      result.current.increment();
      result.current.increment();
    });

    expect(result.current.count).toBe(9);
  });

  it('should handle negative increment values', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.setVal(-2);
    });

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(-2);
  });

  it('should update val independently of count', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.setVal(10);
    });

    expect(result.current.val).toBe(10);
    expect(result.current.count).toBe(0);

    act(() => {
      result.current.setVal(20);
    });

    expect(result.current.val).toBe(20);
    expect(result.current.count).toBe(0);
  });

  it('should work with decimal values', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.setVal(0.5);
    });

    act(() => {
      result.current.increment();
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
    expect(result.current.val).toBe(0.5);
  });
});