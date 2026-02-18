import { selectForecast } from './selectors';

it('selectForecast respects expandedDays', () => {
  const state: any = {
    weather: {
      expandedDays: 3,
      forecast: [{ date: '1' }, { date: '2' }, { date: '3' }, { date: '4' }]
    }
  };

  expect(selectForecast(state).length).toBe(3);
});
