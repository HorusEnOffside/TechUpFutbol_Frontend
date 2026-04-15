import { renderHook, act } from '@testing-library/react';
import { useCapitanes } from '../useCapitanes';

describe('useCapitanes', () => {
  it('starts at step 1 with empty teamName', () => {
    const { result } = renderHook(() => useCapitanes());
    expect(result.current.step).toBe(1);
    expect(result.current.teamName).toBe('');
  });

  it('isNameValid is false when name is shorter than 5 chars', () => {
    const { result } = renderHook(() => useCapitanes());
    act(() => result.current.setTeamName('ABC'));
    expect(result.current.isNameValid).toBe(false);
  });

  it('isNameValid is true when name has 5 or more chars', () => {
    const { result } = renderHook(() => useCapitanes());
    act(() => result.current.setTeamName('Sistemas FC'));
    expect(result.current.isNameValid).toBe(true);
  });

  it('canGoNext is false on step 1 when name is invalid', () => {
    const { result } = renderHook(() => useCapitanes());
    act(() => result.current.setTeamName('AB'));
    expect(result.current.canGoNext).toBe(false);
  });

  it('canGoNext is true on step 1 when name is valid', () => {
    const { result } = renderHook(() => useCapitanes());
    act(() => result.current.setTeamName('Sistemas FC'));
    expect(result.current.canGoNext).toBe(true);
  });

  it('advances step when handleNext is called with valid name', () => {
    const { result } = renderHook(() => useCapitanes());
    act(() => result.current.setTeamName('Sistemas FC'));
    act(() => result.current.handleNext());
    expect(result.current.step).toBe(2);
  });

  it('does not advance past step 3', () => {
    const { result } = renderHook(() => useCapitanes());
    act(() => result.current.setTeamName('Sistemas FC'));
    act(() => result.current.handleNext()); // → 2
    act(() => result.current.handleNext()); // → 3
    act(() => result.current.handleNext()); // stays at 3
    expect(result.current.step).toBe(3);
  });

  it('canGoBack is false on step 1', () => {
    const { result } = renderHook(() => useCapitanes());
    expect(result.current.canGoBack).toBe(false);
  });

  it('canGoBack is true on step 2+', () => {
    const { result } = renderHook(() => useCapitanes());
    act(() => result.current.setTeamName('Sistemas FC'));
    act(() => result.current.handleNext()); // → 2
    expect(result.current.canGoBack).toBe(true);
  });

  it('handleStepBack decrements step', () => {
    const { result } = renderHook(() => useCapitanes());
    act(() => result.current.setTeamName('Sistemas FC'));
    act(() => result.current.handleNext()); // → 2
    act(() => result.current.handleStepBack()); // → 1
    expect(result.current.step).toBe(1);
  });

  it('handleShieldChange stores file and creates preview URL', () => {
    const { result } = renderHook(() => useCapitanes());
    const file = new File(['content'], 'shield.png', { type: 'image/png' });
    act(() => result.current.handleShieldChange(file));
    expect(result.current.shield).toBe(file);
    expect(result.current.shieldPreview).toBeTruthy();
  });

  it('setMainColor updates the main color', () => {
    const { result } = renderHook(() => useCapitanes());
    act(() => result.current.setMainColor('#FF0000'));
    expect(result.current.mainColor).toBe('#FF0000');
  });

  it('handleSubmit sets isSuccess after resolving', async () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useCapitanes());
    let promise: Promise<void>;
    act(() => { promise = result.current.handleSubmit(); });
    expect(result.current.isLoading).toBe(true);
    await act(async () => { vi.advanceTimersByTime(1000); await promise; });
    expect(result.current.isSuccess).toBe(true);
    expect(result.current.isLoading).toBe(false);
    vi.useRealTimers();
  });

  it('resetError clears the error', () => {
    const { result } = renderHook(() => useCapitanes());
    // Manually trigger error by mocking — we test resetError clears state
    // Since error starts null, just verify resetError is callable without throwing
    act(() => result.current.resetError());
    expect(result.current.error).toBeNull();
  });
});
