import { render } from '@testing-library/react';
import HeartButton from './HeartButton';

describe('Heart Button', () => {
  test('renders Heart button correctly', () => {
    const { getByTestId } = render(<HeartButton />);
    expect(getByTestId('heart-button')).toBeVisible();
  });
  test('if active prop is true the ButtonComponent should have active class', () => {
    const { getByTestId } = render(<HeartButton active={true} />);
    expect(getByTestId('heart-button')).toHaveClass('active');
  });
});
