import { render, screen } from '@testing-library/react';
import { HomePage } from './pages/HomePage';

test('renders home page panel', () => {
  render(<HomePage />);
  const headingElement = screen.getByRole('heading', { name: /loan pipeline/i, level: 3 });
  expect(headingElement).toBeInTheDocument();
});
