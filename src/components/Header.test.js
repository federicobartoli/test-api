import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './Header';

describe('Header', () => {
  it('renders Header corectly', () => {
    const { container } = render(
      <Router>
        <Header />
      </Router>,
    );
    expect(container).toMatchSnapshot();
  });
});
