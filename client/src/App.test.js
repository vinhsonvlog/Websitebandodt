import { render, screen } from '@testing-library/react';
import App from './App';

test('renders review feature title', async () => {
  render(<App />);
  const titleElement = await screen.findByRole('heading', {
    name: /danh gia san pham/i
  });
  expect(titleElement).toBeInTheDocument();
});
