import { render, screen } from '@testing-library/react';
import App from './App';

test('renders cart title', async () => {
  render(<App />);
  const titleElement = await screen.findByRole('heading', {
    name: /gio hang cua ban/i
  });
  expect(titleElement).toBeInTheDocument();
});
