import { render, screen } from '@testing-library/react';
import App from './App';

test('renders labour attendance heading', () => {
  render(<App />);
  const headingElement = screen.getByRole('heading', { name: /labour attendance/i, level: 2 });
  expect(headingElement).toBeInTheDocument();
});
