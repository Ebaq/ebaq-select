import React, { useState } from 'react';
import { Option } from '../src/types'; // Импорт типов
import {
  Select,
  SelectContent,
  SelectOption,
  SelectTrigger,
  SelectWrapper,
} from '../src/WrapperSelect';
import './globals.css';
export default {
  title: 'Components/Select',
  component: SelectWrapper,
};
const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];
export const Default = () => {
  const [selected, setSelected] = useState<Option<string> | null>(null);
  return (
    <SelectWrapper>
      <Select<string> onChange={(option) => setSelected(option)}>
        <SelectTrigger>
          {({ selected }) => (
            <span>{selected?.label || 'Select an option'}</span>
          )}
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectOption key={option.value} value={option}>
              {(selected) => (
                <div
                  style={{
                    backgroundColor:
                      selected?.value == option.value
                        ? '#80cbc4'
                        : 'transparent',
                    padding: '0.75rem',
                  }}
                >
                  <span>{option.label}</span>
                </div>
              )}
            </SelectOption>
          ))}
        </SelectContent>
      </Select>
    </SelectWrapper>
  );
};
