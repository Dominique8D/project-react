import { formatPostDate } from './blog-utils';

describe('formatPostDate', () => {
  it('formats dates in Dutch for the Dutch site language', () => {
    expect(formatPostDate('2026-11-20', 'nl')).toBe('20 november 2026');
  });

  it('formats dates in British English for the English site language', () => {
    expect(formatPostDate('2026-11-20', 'gb')).toBe('20 November 2026');
  });
});
