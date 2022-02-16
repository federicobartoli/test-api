import React from 'react';
import SearchBar from './SearchBar';
import ReactTags from 'react-tag-autocomplete';

import { render, fireEvent } from '@testing-library/react';

describe('SearchBar component', () => {
  test('UI SearchBar ', () => {
    const { container } = render(<SearchBar />);
    expect(container).toMatchSnapshot();
  });
});
