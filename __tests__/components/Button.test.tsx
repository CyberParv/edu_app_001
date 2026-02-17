import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Button from '@/components/ui/Button';

describe('Button', () => {
  it('renders children correctly', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button onPress={onPress}>Press me</Button>);
    fireEvent.press(getByText('Press me'));
    expect(onPress).toHaveBeenCalled();
  });

  it('shows spinner when loading=true', () => {
    const { getByTestId } = render(<Button loading>Loading</Button>);
    expect(getByTestId('spinner')).toBeTruthy();
  });

  it('is disabled when disabled=true', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button disabled onPress={onPress}>Disabled</Button>);
    fireEvent.press(getByText('Disabled'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('applies variant styles correctly', () => {
    const { getByText } = render(<Button variant="primary">Primary</Button>);
    expect(getByText('Primary')).toHaveStyle({ backgroundColor: 'blue' });
  });

  it('is accessible', () => {
    const { getByRole } = render(<Button>Accessible</Button>);
    expect(getByRole('button')).toBeTruthy();
  });
});