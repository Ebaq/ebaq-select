import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Multi } from '../src/stories/Select.stories';

describe('MultiSelect default', () => {
  it('selects options when clicked', () => {
    render(<Multi />);

    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    const option = screen.getByText('Option 1');
    fireEvent.click(option);

    const option2 = screen.getByText('Option 2');
    fireEvent.click(option2);

    expect(trigger).toHaveTextContent('Option 1, Option 2');
  });
});
