import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import Card from './Card';

describe('Card', () => {
  it('renders Card corectly', () => {
    const { container } = render(<Card />);
    expect(container).toMatchSnapshot();
  });
});
