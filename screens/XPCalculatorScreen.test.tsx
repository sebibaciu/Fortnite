// XPCalculatorScreen.test.js
import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import XPCalculatorScreen from '../screens/XPCalculatorScreen';


describe('XPCalculatorScreen', () => {
  it('calculates XP correctly', () => {
    const { getByLabelText, getByText } = render(<XPCalculatorScreen />);
    
    // Set current level and level needed
    fireEvent.changeText(getByLabelText('Current Level:'), '10');
    fireEvent.changeText(getByLabelText('Level Needed:'), '20');
    

    // Trigger calculation
    fireEvent.press(getByText('Calculate XP'));

    // Check if the result is displayed correctly
    expect(getByText('XP Needed: 800,000')).toBeTruthy();
    expect(getByText('XP per Day: 12,903.23')).toBeTruthy(); // Adjust the expected value based on your calculation
  });
});
