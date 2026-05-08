import { renderHook, act } from "@testing-library/react";
import { useReservationTimer } from "../../hooks/useReservationTimer";

jest.mock("../../firebase", () => ({
  db: {},
}));

// Mock Firestore
jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  onSnapshot: jest.fn(),
}));

import { onSnapshot } from "firebase/firestore";

describe("useReservationTimer", () => {
  const movie = { id: "movie1" };

  const form = {
    date: "2026-05-07",
    tanda: "7pm",
    cinema: "Main",
  };

  const user = {
    uid: "user1",
  };

  const selectedSeats = [{ id: "A1" }];

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("starts with 0", () => {
    onSnapshot.mockImplementation(() => jest.fn());

    const { result } = renderHook(() =>
      useReservationTimer({
        reserved: false,
        user,
        movie,
        form,
        selectedSeats,
        submitted: false,
      })
    );

    expect(result.current).toBe(0);
  });

  it("updates timer from reservation", () => {
    jest.setSystemTime(new Date("2026-05-07T20:00:00"));

    const expiresAt = Date.now() + 5000;

    onSnapshot.mockImplementation((ref, callback) => {
      callback({
        exists: () => true,
        data: () => ({
          reservedSeats: [
            {
              userId: "user1",
              seatId: "A1",
              expiresAt,
            },
          ],
        }),
      });

      return jest.fn();
    });

    const { result } = renderHook(() =>
      useReservationTimer({
        reserved: true,
        user,
        movie,
        form,
        selectedSeats,
        submitted: false,
      })
    );

    expect(result.current).toBe(5);
  });

  it("counts down correctly", () => {
    jest.setSystemTime(new Date("2026-05-07T20:00:00"));

    const expiresAt = Date.now() + 5000;

    onSnapshot.mockImplementation((ref, callback) => {
      callback({
        exists: () => true,
        data: () => ({
          reservedSeats: [
            {
              userId: "user1",
              seatId: "A1",
              expiresAt,
            },
          ],
        }),
      });

      return jest.fn();
    });

    const { result } = renderHook(() =>
      useReservationTimer({
        reserved: true,
        user,
        movie,
        form,
        selectedSeats,
        submitted: false,
      })
    );

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(result.current).toBe(3);
  });

  it("stops at 0 after expiration", () => {
    jest.setSystemTime(new Date("2026-05-07T20:00:00"));

    const expiresAt = Date.now() + 1000;

    onSnapshot.mockImplementation((ref, callback) => {
      callback({
        exists: () => true,
        data: () => ({
          reservedSeats: [
            {
              userId: "user1",
              seatId: "A1",
              expiresAt,
            },
          ],
        }),
      });

      return jest.fn();
    });

    const { result } = renderHook(() =>
      useReservationTimer({
        reserved: true,
        user,
        movie,
        form,
        selectedSeats,
        submitted: false,
      })
    );

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(result.current).toBe(0);
  });

  it("cleans up listener on unmount", () => {
    const unsubscribe = jest.fn();

    onSnapshot.mockImplementation(() => unsubscribe);

    const { unmount } = renderHook(() =>
      useReservationTimer({
        reserved: true,
        user,
        movie,
        form,
        selectedSeats,
        submitted: false,
      })
    );

    unmount();

    expect(unsubscribe).toHaveBeenCalled();
  });
});