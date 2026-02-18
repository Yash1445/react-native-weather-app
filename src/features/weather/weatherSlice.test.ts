import { weatherReducer, setExpandedDays, setQuery } from './weatherSlice';

describe('weatherSlice', () => {
  it('should set query', () => {
    const next = weatherReducer(undefined, setQuery('Paris'));
    expect(next.query).toBe('Paris');
  });

  it('should toggle expanded days', () => {
    const next = weatherReducer(undefined, setExpandedDays(7));
    expect(next.expandedDays).toBe(7);
  });
});
