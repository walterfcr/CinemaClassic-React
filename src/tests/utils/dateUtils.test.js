import {
  formatLocalDate,
  isPastTime,
  formatTime,
} from "../../utils/dateUtils";

describe("formatLocalDate", () => {
  it("formats date correctly", () => {
    const date = new Date(2026, 4, 7);

    expect(formatLocalDate(date)).toBe("2026-05-07");
  });

  it("pads month and day with leading zeros", () => {
    const date = new Date(2026, 0, 3);

    expect(formatLocalDate(date)).toBe("2026-01-03");
  });
});

describe("formatTime", () => {
  it("formats seconds into mm:ss", () => {
    expect(formatTime(125)).toBe("02:05");
  });

  it("formats zero correctly", () => {
    expect(formatTime(0)).toBe("00:00");
  });

  it("formats single digit seconds correctly", () => {
    expect(formatTime(9)).toBe("00:09");
  });

  it("formats minutes correctly", () => {
    expect(formatTime(600)).toBe("10:00");
  });
});

describe("isPastTime", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("returns false for future showtime", () => {
    jest.setSystemTime(new Date("2026-05-07T18:00:00"));

    expect(isPastTime("2026-05-07", "20:00")).toBe(false);
  });

  it("returns true for past showtime", () => {
    jest.setSystemTime(new Date("2026-05-07T22:00:00"));

    expect(isPastTime("2026-05-07", "20:00")).toBe(true);
  });

  it("allows access within the 15 minute buffer", () => {
    jest.setSystemTime(new Date("2026-05-07T20:10:00"));

    expect(isPastTime("2026-05-07", "20:00")).toBe(false);
  });

  it("blocks access after the 15 minute buffer expires", () => {
    jest.setSystemTime(new Date("2026-05-07T20:16:00"));

    expect(isPastTime("2026-05-07", "20:00")).toBe(true);
  });

  it("returns false if date is missing", () => {
    expect(isPastTime(null, "20:00")).toBe(false);
  });

  it("returns false if time is missing", () => {
    expect(isPastTime("2026-05-07", null)).toBe(false);
  });
});