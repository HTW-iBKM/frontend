import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders headline', () => {
  render(<App />);
  const linkElement = screen.getByText(/iBKM GraphTest/i);
  expect(linkElement).toBeInTheDocument();
});
