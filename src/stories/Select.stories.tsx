import React from 'react';
import {
  Select,
  SelectContent,
  SelectOption,
  SelectTrigger,
} from '../WrapperSelect';

import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectOption,
  MultiSelectTrigger,
} from '../MultiSelect';
import { ChevronDownSVG } from './ChevronDown';
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

export const WithArrow = () => {
  return (
    <Select<string> onChange={(option) => console.log(option)}>
      <SelectTrigger>
        {({ selected, opened }) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              gap: 16,
            }}
          >
            {selected?.label || 'Select an option'}{' '}
            <ChevronDownSVG isOpen={opened} />
          </div>
        )}
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

export const Multi = () => {
  return (
    <MultiSelect<string>
      onChange={(option) => console.log(option)}
      style={{
        width: 200,
      }}
    >
      <MultiSelectTrigger
        style={{
          width: 180,
        }}
      >
        {({ selected, opened }) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div
              style={{
                maxWidth: '85%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {selected.length > 0
                ? selected.map((option, index) =>
                    index == 0 ? (
                      <span key={option.value}>{option.label}</span>
                    ) : (
                      <span key={option.value}>, {option.label}</span>
                    )
                  )
                : 'Select options'}{' '}
            </div>
            <ChevronDownSVG isOpen={opened} />
          </div>
        )}
      </MultiSelectTrigger>
      <MultiSelectContent>
        {options.map((option) => (
          <MultiSelectOption
            key={option.value}
            value={option}
            className="option"
          >
            {({ isSelected }) => (
              <div>
                <span>{option.label}</span> {isSelected && <span>{'✔️'}</span>}
              </div>
            )}
          </MultiSelectOption>
        ))}
      </MultiSelectContent>
    </MultiSelect>
  );
};
