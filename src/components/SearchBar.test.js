import React from 'react';
import SearchBar from './SearchBar';

import { render, fireEvent } from '@testing-library/react';

describe('SearchBar component', () => {
  test('UI SearchBar ', () => {
    const { container } = render(<SearchBar />);
    expect(container).toMatchSnapshot();
  });
  test('should contain heading text', () => {
    render(<SearchBar />);
    expect(screen.getByText('Insert a comma after each keyword')).toBeVisible();
  });

  test('should call handleFilter function when filter button is pressed', () => {
    const handleFilter = jest.fn();
    render(<SearchBar handleFilter={handleFilter} />);
    const filterButton = screen.getByText('FILTER');
    fireEvent.click(filterButton);
    expect(handleFilter).toHaveBeenCalledTimes(1);
  });
});
