import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './Layout';

describe('Layout', () => {
  it('renders Layout corectly', () => {
    const { container } = render(
      <Router>
        <Layout />
      </Router>,
    );
    expect(container).toMatchSnapshot();
  });
});
