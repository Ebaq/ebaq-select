import React from 'react';
import {
  Select,
  SelectContent,
  SelectOption,
  SelectTrigger,
} from '../WrapperSelect';
import './Select.css';
export default {
  title: 'Components/Select',
  component: Select,
};
const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];
export const Default = () => {
  return (
    <Select<string> onChange={(option) => console.log(option)}>
      <SelectTrigger>
        {({ selected }) => <span>{selected?.label || 'Select an option'}</span>}
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectOption key={option.value} value={option} className="option">
            {() => (
              <div>
                <span>{option.label}</span>
              </div>
            )}
          </SelectOption>
        ))}
      </SelectContent>
    </Select>
  );
};

export const PredefinedValue = () => {
  return (
    <Select<string>
      onChange={(option) => console.log(option)}
      value={options[0]}
    >
      <SelectTrigger>
        {({ selected }) => <span>{selected?.label || 'Select an option'}</span>}
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectOption key={option.value} value={option} className="option">
            {() => (
              <div>
                <span>{option.label}</span>
              </div>
            )}
          </SelectOption>
        ))}
      </SelectContent>
    </Select>
  );
};

export const CustomWidth = () => {
  return (
    <Select<string>
      onChange={(option) => console.log(option)}
      value={options[0]}
      style={{
        width: 300,
      }}
    >
      <SelectTrigger>
        {({ selected }) => <span>{selected?.label || 'Select an option'}</span>}
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectOption key={option.value} value={option} className="option">
            {() => (
              <div>
                <span>{option.label}</span>
              </div>
            )}
          </SelectOption>
        ))}
      </SelectContent>
    </Select>
  );
};

export const CustomHeight = () => {
  return (
    <Select<string>
      onChange={(option) => console.log(option)}
      value={options[0]}
      style={{
        minHeight: 70,
      }}
    >
      <SelectTrigger
        style={{
          minHeight: 70,
        }}
      >
        {({ selected }) => <span>{selected?.label || 'Select an option'}</span>}
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectOption key={option.value} value={option} className="option">
            {() => (
              <div>
                <span>{option.label}</span>
              </div>
            )}
          </SelectOption>
        ))}
      </SelectContent>
    </Select>
  );
};
