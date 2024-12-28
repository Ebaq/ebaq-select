import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectContext,
  SelectOption,
  SelectTrigger,
} from '../WrapperSelect';

import { Option } from '../types';

import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectOption,
  MultiSelectTrigger,
} from '../MultiSelect';
import { ChevronDownSVG } from './ChevronDown';
// import './Select.css';
export default {
  title: 'Components/Select',
  component: Select,
};
const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  { label: 'Option 4', value: 'option4' },
  // { label: 'Option 5', value: 'option5' },
  // { label: 'Option 6', value: 'option6' },
  // { label: 'Option 7', value: 'option7' },
  // { label: 'Option 8', value: 'option8' },
  // { label: 'Option 9', value: 'option9' },
  // { label: 'Option 10', value: 'option10' },
  // { label: 'Option 11', value: 'option11' },
  // { label: 'Option 12', value: 'option12' },
];

export const Default = () => {
  return (
    <Select<string> onSelect={(option) => console.log('onSelect', option)}>
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
      onSelect={(option) => console.log(option)}
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
      onSelect={(option) => console.log(option)}
      value={options[0]}
      style={{
        width: 300,
      }}
      data-testid={'select'}
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
      onSelect={(option) => console.log(option)}
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
    <Select<string> onSelect={(option) => console.log(option)}>
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
      onSelect={(option) => console.log(option)}
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

export const MultiCustomWidth = () => {
  return (
    <MultiSelect<string>
      onSelect={(option) => console.log(option)}
      style={{
        width: 500,
      }}
    >
      <MultiSelectTrigger
        style={{
          width: 500,
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

export const MultiCustomHeight = () => {
  return (
    <MultiSelect<string>
      onSelect={(option) => console.log(option)}
      style={{
        minHeight: 80,
        maxWidth: 200,
        width: 200,
      }}
    >
      <MultiSelectTrigger
        style={{
          minHeight: 80,
          maxWidth: 180,
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

export const MultiMaxToSelect = () => {
  return (
    <MultiSelect<string>
      onSelect={(option) => console.log(option)}
      style={{
        maxWidth: 200,
        width: 200,
      }}
      maxSelect={2}
    >
      <MultiSelectTrigger
        style={{
          maxWidth: 180,
        }}
        data-testId={'trigger'}
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

export const WithContext = () => {
  const [selected, setSelected] = useState<Option<string> | null>(null);
  const [opened, setOpened] = useState<boolean>(false);

  useEffect(() => {
    //This will work
    console.log('own context selected', selected);
  }, [selected]);

  const onSelect = (option: Option<string>) => {
    // This also will work
    console.log(option.value);
  };

  return (
    <SelectContext.Provider
      value={{
        selected,
        setSelected: setSelected,
        opened,
        setOpened,
        onSelect,
      }}
    >
      <Select<string>
        onSelect={() => {
          // This won't work
          console.log('on Select');
        }}
      >
        <SelectTrigger>
          {({ selected }) => (
            <span>{selected?.label || 'Select an option'}</span>
          )}
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectOption key={option.value} value={option} className="option">
              {() => <div>{option.label}</div>}
            </SelectOption>
          ))}
        </SelectContent>
      </Select>
    </SelectContext.Provider>
  );
};
