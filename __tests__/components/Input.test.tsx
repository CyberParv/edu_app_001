import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Input from '@/components/ui/Input';

describe('Input', () => {
  it('renders with label', () => {
    const { getByText } = render(<Input label="Email" />);
    expect(getByText('Email')).toBeTruthy();
  });

  it('shows error message when error prop set', () => {
    const { getByText } = render(<Input error="Invalid input" />);
    expect(getByText('Invalid input')).toBeTruthy();
  });

  it('calls onChangeText', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(<Input placeholder="Type here" onChangeText={onChangeText} />);
    fireEvent.changeText(getByPlaceholderText('Type here'), 'Hello');
    expect(onChangeText).toHaveBeenCalledWith('Hello');
  });

  it('toggles password visibility', () => {
    const { getByTestId, getByPlaceholderText } = render(<Input secureTextEntry placeholder="Password" />);
    const input = getByPlaceholderText('Password');
    expect(input.props.secureTextEntry).toBe(true);
    fireEvent.press(getByTestId('toggle-visibility'));
    expect(input.props.secureTextEntry).toBe(false);
  });

  it('shows character count when maxLength set', () => {
    const { getByText } = render(<Input maxLength={10} value="12345" />);
    expect(getByText('5/10')).toBeTruthy();
  });
});