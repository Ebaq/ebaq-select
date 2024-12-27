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

interface MultiSelectContextValue<T> {
  selected: Option<T>[];
  toggleSelected: (option: Option<T>) => void;
  opened: boolean;
  setOpened: (opened: boolean) => void;
}

const MultiSelectContext = createContext<MultiSelectContextValue<any> | null>(
  null
);

export const useMultiSelectContext = <T,>(): MultiSelectContextValue<T> => {
  const context = useContext(MultiSelectContext);
  if (!context) {
    throw new Error(
      'useMultiSelectContext must be used within a MultiSelectProvider'
    );
  }
  return context;
};

export interface MultiSelectProps<T> {
  value?: Option<T>[];
  onChange?: (options: Option<T>[]) => void;
  children: ReactNode;
  className?: string;
  wrapperClassName?: string;
  style?: CSSProperties;
  wrapperStyle?: CSSProperties;
  maxSelect?: number;
}

export interface Option<T> {
  label: string;
  value: T;
}

export const MultiSelect = <T,>({
  value = [],
  onChange,
  children,
  className,
  wrapperClassName,
  style,
  wrapperStyle,
  maxSelect,
}: MultiSelectProps<T>) => {
  const [selected, setSelected] = useState<Option<T>[]>(value);
  const [opened, setOpened] = useState(false);
  const [minWidth, setMinWidth] = useState<number>(0);
  const [minHeight, setMinHeight] = useState<string>('0');
  const root = useRef<HTMLDivElement>(null);

  const toggleSelected = (option: Option<T>) => {
    setSelected((prev) => {
      const isSelected = prev.some((o) => o.value === option.value);
      const newSelected = isSelected
        ? prev.filter((o) => o.value !== option.value)
        : maxSelect
          ? selected.length < maxSelect
            ? [...prev, option]
            : [...prev]
          : [...prev, option];
      onChange?.(newSelected);
      return newSelected;
    });
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

  return (
    <MultiSelectContext.Provider
      value={{ selected, toggleSelected, opened, setOpened }}
    >
      <div
        style={{
          minHeight: minHeight,
          height: '100%',
          minWidth: minWidth,
          position: 'relative',
          ...wrapperStyle,
        }}
        className={wrapperClassName!}
      >
        <div
          ref={root}
          data-opened={opened}
          style={{
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
            ...style,
          }}
          className={className!}
        >
          {children}
        </div>
      </div>
    </MultiSelectContext.Provider>
  );
};

interface TriggerProps {
  children: (context: {
    selected: Option<any>[];
    opened: boolean;
  }) => ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const MultiSelectTrigger = ({
  children,
  className,
  style,
  ...rest
}: TriggerProps) => {
  const { selected, opened, setOpened } = useMultiSelectContext();
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (isFocused && event.key == 'Enter') {
        setOpened(true);
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
      tabIndex={1}
      role="button"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={className!}
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

export const MultiSelectContent = ({
  children,
  className,
  style,
  ...rest
}: ContentProps) => {
  const { opened } = useMultiSelectContext();
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
      ref={rootRef}
      style={{ ...optionsStyle, ...style }}
      className={className!}
      {...rest}
    >
      {children}
    </div>
  );
};

interface OptionProps<T> {
  value: Option<T>;
  children: (context: { isSelected: boolean }) => ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const MultiSelectOption = <T,>({
  value,
  children,
  className,
  style,
  ...rest
}: OptionProps<T>) => {
  const { selected, opened, toggleSelected, setOpened } =
    useMultiSelectContext<T>();
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (isFocused && event.key == 'Enter') {
        toggleSelected(value);
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

  const isSelected = selected.some((o) => o.value === value.value);

  return (
    <div
      onClick={() => toggleSelected(value)}
      style={{
        cursor: 'pointer',
        ...style,
      }}
      tabIndex={1}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      data-selected={isSelected}
      className={className!}
      {...rest}
    >
      {children({ isSelected })}
    </div>
  );
};
