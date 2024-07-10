import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ResetButton from '../../../components/Buttons/resetButton';

describe("Reset Button", () => {
  it("calls the reset function when pressed", () => {
    const mockReset = jest.fn();

    const { getByText } = render(<ResetButton reset={mockReset} />);

    const button = getByText("Reset");
    fireEvent.press(button);

    expect(mockReset).toHaveBeenCalled();
  });
});