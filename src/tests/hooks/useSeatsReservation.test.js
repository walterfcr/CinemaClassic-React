import { renderHook, act } from '@testing-library/react';
import { useSeatsReservation } from '../../hooks/useSeatsReservation';

// ✅ Inline mock of the services so tests don’t hit Firestore
jest.mock('../../services/showtimeService', () => ({
  reserveSeatsService: jest.fn(),
  releaseSeatsService: jest.fn(),
}));

// Import the mocked functions so we can control them in tests
import { reserveSeatsService, releaseSeatsService } from '../../services/showtimeService';

const movie = { id: 'movie1' };
const form = { date: '2026-05-06', tanda: '7pm', cinema: 'Main' };
const user = { id: 'user1' };

describe('useSeatsReservation', () => {
  it('starts with empty seats and not reserved', () => {
    const { result } = renderHook(() =>
      useSeatsReservation({ movie, form, user })
    );

    expect(result.current.selectedSeats).toEqual([]);
    expect(result.current.reserved).toBe(false);
  });

  it('reserves seats when user exists', async () => {
    reserveSeatsService.mockResolvedValueOnce(true);

    const { result } = renderHook(() =>
      useSeatsReservation({ movie, form, user })
    );

    act(() => {
      result.current.setSelectedSeats(['A1']);
    });

    await act(async () => {
      await result.current.reserveSeats();
    });

    expect(reserveSeatsService).toHaveBeenCalledWith({
      movie,
      form,
      selectedSeats: ['A1'],
      user,
    });
    expect(result.current.reserved).toBe(true);
  });

  it('releases seats and resets state', async () => {
    releaseSeatsService.mockResolvedValueOnce(true);

    const { result } = renderHook(() =>
      useSeatsReservation({ movie, form, user })
    );

    act(() => {
      result.current.setSelectedSeats(['A1']);
    });

    await act(async () => {
      await result.current.releaseSeats();
    });

    expect(releaseSeatsService).toHaveBeenCalledWith({
      movie,
      form,
      selectedSeats: ['A1'],
      user,
    });
    expect(result.current.selectedSeats).toEqual([]);
    expect(result.current.reserved).toBe(false);
  });

  it('throws error if reserveSeats called without user', async () => {
    const { result } = renderHook(() =>
      useSeatsReservation({ movie, form, user: null })
    );

    await expect(result.current.reserveSeats()).rejects.toThrow('NOT_AUTH');
  });

  it('resets state when form changes', () => {
    const { result, rerender } = renderHook(
      ({ form }) => useSeatsReservation({ movie, form, user }),
      { initialProps: { form } }
    );

    act(() => {
      result.current.setSelectedSeats(['A1']);
      result.current.reserved = true;
    });

    // Change form.date → should reset
    rerender({ form: { ...form, date: '2026-05-07' } });

    expect(result.current.selectedSeats).toEqual([]);
    expect(result.current.reserved).toBe(false);
  });
});
