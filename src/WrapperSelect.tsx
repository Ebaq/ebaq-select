'use client';

import React, {
  createContext,
  CSSProperties,
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

interface SelectContextValue<T> {
  selected: Option<T> | null;
  setSelected: (option: Option<T>) => void;
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectContext = createContext<SelectContextValue<any> | null>(null);

export const useSelectContext = <T,>(): SelectContextValue<T> => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('useSelectContext must be used within a SelectProvider');
  }
  return context;
};

export interface SelectProps<T> {
  value?: Option<T>;
  onChange?: (option: Option<T>) => void;
  children: ReactNode;
  className?: string;
  wrapperClassName?: string;
  style?: CSSProperties;
  wrapperStyle?: CSSProperties;
}

export interface Option<T> {
  label: string;
  value: T;
}

export const Select = <T,>({
  value,
  onChange,
  children,
  className,
  wrapperClassName,
  style,
  wrapperStyle,
  ...rest
}: SelectProps<T>) => {
  const [selected, setSelected] = useState<Option<T> | null>(value || null);
  const [opened, setOpened] = useState(false);
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

  useLayoutEffect(() => {
    if (root.current) {
      const rootWidth = root.current.offsetWidth;
      setMinWidth(rootWidth);
      setMinHeight(root.current.style.minHeight);
    }
  }, [root.current]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (root.current && !root.current.contains(target)) {
        event.preventDefault();
        event.stopPropagation();
        setOpened(false);
      }
    };

    if (opened) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [opened, root]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (opened && event.key == 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        setOpened(false);
      }
    };

    if (opened) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [opened]);

  const handleSelect = (option: Option<T>) => {
    setSelected(option);
    onChange?.(option);
    setOpened(false);
  };

  return (
    <SelectContext.Provider
      value={{ selected, setSelected: handleSelect, opened, setOpened }}
    >
      <div
        style={{ ...defaultWrapperStyle, ...wrapperStyle }}
        className={wrapperClassName!}
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
          className={className!}
        >
          {children}
        </div>
      </div>
    </SelectContext.Provider>
  );
};

interface TriggerProps {
  children: (context: { selected: any; opened: boolean }) => ReactNode;
  className?: string;
  style?: CSSProperties;
}

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

interface ContentProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const SelectContent = ({
  children,
  className,
  style,
  ...rest
}: ContentProps) => {
  const { opened } = useSelectContext();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const optionsStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    padding: '0',
    margin: '0',
    listStyle: 'none',
    overflowY: 'auto',
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        event.preventDefault();
      }
    };

    if (opened) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [opened]);

  return (
    <div
      id="select-list"
      ref={rootRef}
      style={{ ...optionsStyle, ...style }}
      className={className!}
      role="listbox"
      {...rest}
    >
      {children}
    </div>
  );
};

interface OptionProps<T> {
  value: Option<T>;
  children: (context: Option<T> | null) => ReactNode;
  className?: string;
  style?: CSSProperties;
}

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
