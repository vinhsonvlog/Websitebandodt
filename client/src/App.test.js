import { render, screen } from '@testing-library/react';
import App from './App';

test('renders profile title', async () => {
  render(<App />);
  const titleElement = await screen.findByRole('heading', {
    name: /ho so ca nhan/i
  });
  expect(titleElement).toBeInTheDocument();
});
