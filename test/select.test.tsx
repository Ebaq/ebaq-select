import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import {
  CustomWidth,
  Default,
  WithContext,
} from '../src/stories/Select.stories';

jest.spyOn(console, 'log').mockImplementation(() => {});

describe('Default select Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Default story correctly', () => {
    render(<Default />);
    expect(screen.getByRole('button')).toHaveTextContent('Select an option');
  });

  it('opens the dropdown when clicked', () => {
    render(<Default />);

    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('selects an option when clicked', () => {
    render(<Default />);

    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    const option = screen.getByText('Option 1');
    fireEvent.click(option);

    expect(trigger).toHaveTextContent('Option 1');
  });

  it('closes the dropdown when clicking outside', () => {
    render(
      <>
        <Default />
        <span data-testid="outside">Outside</span>
      </>
    );

    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    const outsideButton = screen.getByTestId('outside');
    fireEvent.click(outsideButton);

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('console log selected option value', () => {
    render(<WithContext />);

    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);

    const option = screen.getByText('Option 2');
    fireEvent.click(option);

    expect(console.log).toHaveBeenCalledWith('option2');
    expect(console.log).toHaveBeenCalledWith('own context selected', {
      label: 'Option 2',
      value: 'option2',
    });
  });
});

describe('Select with custom width', () => {
  it('renders with custom width', () => {
    render(<CustomWidth />);

    const select = screen.getByTestId('select');

    expect(select).toHaveStyle({
      width: 300,
    });
  });
});
