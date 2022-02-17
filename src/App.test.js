import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders App corectly', () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
});
