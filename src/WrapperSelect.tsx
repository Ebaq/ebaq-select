'use client';

import React, {
  createContext,
  CSSProperties,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  ContentProps,
  Option,
  OptionProps,
  SelectContextValue,
  SelectProps,
  TriggerProps,
} from './types';

export const SelectContext = createContext<SelectContextValue<any> | null>(
  null
);

export const useSelectContext = <T,>(): SelectContextValue<T> => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('useSelectContext must be used within a SelectProvider');
  }
  return context;
};

export const Select = <T,>({
  value,
  onSelect,
  children,
  className,
  wrapperClassName,
  style,
  wrapperStyle,
  ...rest
}: SelectProps<T>) => {
  const existingContext = useContext(SelectContext);

  if (existingContext) {
    return (
      <SelectContainer
        context={existingContext}
        children={children}
        className={className}
        wrapperClassName={wrapperClassName}
        style={style}
        wrapperStyle={wrapperStyle}
        {...rest}
      />
    );
  }

  const [selected, setSelected] = useState<Option<T> | null>(value || null);
  const [opened, setOpened] = useState(false);

  const contextValue: SelectContextValue<T> = {
    selected,
    setSelected,
    opened,
    setOpened,
  };

  return (
    <SelectContext.Provider value={contextValue}>
      <SelectContainer
        context={contextValue}
        children={children}
        className={className}
        wrapperClassName={wrapperClassName}
        style={style}
        wrapperStyle={wrapperStyle}
        {...rest}
      />
    </SelectContext.Provider>
  );
};

const SelectContainer = <T,>({
  context,
  children,
  className,
  wrapperClassName,
  style,
  wrapperStyle,
  ...rest
}: Omit<SelectProps<T>, 'onSelect'> & { context: SelectContextValue<T> }) => {
  const { opened, setOpened } = context;
  const [minWidth, setMinWidth] = useState<number>(0);
  const [minHeight, setMinHeight] = useState<string>('0');
  const root = useRef<HTMLDivElement>(null);

  const defaultSelectStyle: CSSProperties = {
    position: 'absolute',
    maxHeight: opened ? 300 : 46,
    minHeight: 46,
    minWidth: 'fit-content',
    width: '100%',
    borderRadius: '0.5rem',
    border: '1px solid #404348',
    outline: 'none',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    transition: 'all 0.3s ease-in-out',
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    textWrap: 'nowrap',
  };

  const defaultWrapperStyle: CSSProperties = {
    minHeight: minHeight,
    height: '100%',
    minWidth: minWidth,
    position: 'relative',
  };

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (root.current && !root.current.contains(event.target as Node)) {
        setOpened(false);
      }
    },
    [setOpened]
  );

  useLayoutEffect(() => {
    if (root.current) {
      const rootWidth = root.current.offsetWidth;
      setMinWidth(rootWidth);
      setMinHeight(root.current.style.minHeight);
    }
  }, [root.current]);

  useEffect(() => {
    if (opened) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [opened]);

  return (
    <div
      style={{ ...defaultWrapperStyle, ...wrapperStyle }}
      className={wrapperClassName}
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={opened}
      aria-controls="select-list"
      {...rest}
    >
      <div
        ref={root}
        data-opened={opened}
        tabIndex={1}
        style={{ ...defaultSelectStyle, ...style }}
        className={className}
      >
        {children}
      </div>
    </div>
  );
};

export const SelectTrigger = ({
  children,
  className,
  style,
  ...rest
}: TriggerProps) => {
  const { selected, opened, setOpened } = useSelectContext();
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (isFocused && event.key == 'Enter') {
        setOpened((prev) => !prev);
      }
    };

    if (isFocused) {
      document.addEventListener('keydown', handleKeyPress);
    } else {
      document.removeEventListener('keydown', handleKeyPress);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isFocused]);

  const placeholderStyle: CSSProperties = {
    padding: '0 0.75rem',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    minHeight: 46,
  };

  return (
    <span
      onClick={() => setOpened(!opened)}
      style={{ ...placeholderStyle, ...style }}
      className={className!}
      tabIndex={1}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      role="button"
      aria-haspopup="listbox"
      aria-expanded={opened}
      {...rest}
    >
      {children({ selected, opened })}
    </span>
  );
};

export const SelectContent = ({
  children,
  className,
  style,
  ...rest
}: ContentProps) => {
  const optionsStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    padding: '0',
    margin: '0',
    listStyle: 'none',
    overflowY: 'auto',
  };

  return (
    <div
      id="select-list"
      style={{ ...optionsStyle, ...style }}
      className={className!}
      role="listbox"
      {...rest}
    >
      {children}
    </div>
  );
};

export const SelectOption = <T,>({
  value,
  children,
  className,
  style,
  ...rest
}: OptionProps<T>) => {
  const { selected, opened, setSelected, setOpened } = useSelectContext<T>();
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (isFocused && event.key == 'Enter') {
        setSelected(value);
        ref.current?.blur();
      }
    };

    if (isFocused) {
      if (!opened) {
        setOpened(true);
      }
      document.addEventListener('keydown', handleKeyPress);
    } else {
      document.removeEventListener('keydown', handleKeyPress);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isFocused]);

  return (
    <div
      onClick={() => {
        setSelected(value);
        setOpened(false);
      }}
      tabIndex={1}
      style={{
        cursor: 'pointer',
        ...style,
      }}
      ref={ref}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      data-selected={selected?.value == value.value}
      data-hasselected={!!selected?.value}
      className={className!}
      role="option"
      aria-selected={selected?.value === value.value}
      {...rest}
    >
      {children(selected)}
    </div>
  );
};
