'use client';

import React, {
  createContext,
  CSSProperties,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import './WrapperSelect.css';

interface SelectContextValue<T> {
  selected: Option<T> | null;
  setSelected: (option: Option<T>) => void;
  opened: boolean;
  setOpened: (opened: boolean) => void;
}

const SelectContext = createContext<SelectContextValue<any> | null>(null);

export const useSelectContext = <T,>(): SelectContextValue<T> => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('useSelectContext must be used within a SelectProvider');
  }
  return context;
};

interface SelectProps<T> {
  value?: Option<T>;
  onChange?: (option: Option<T>) => void;
  children: ReactNode;
  className?: string;
}

interface Option<T> {
  label: string;
  value: T;
}

export const SelectWrapper = ({ children }: { children: ReactNode }) => {
  const wrapperStyle: CSSProperties = {
    maxHeight: '2.75rem',
    height: '100%',
    width: ' 100%',
    minWidth: '200px',
    position: 'relative',
  };
  return <div style={wrapperStyle}>{children}</div>;
};

export const Select = <T,>({
  value,
  onChange,
  children,
  className,
}: SelectProps<T>) => {
  const [selected, setSelected] = useState<Option<T> | null>(value || null);
  const [opened, setOpened] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const selectStyle: CSSProperties = {
    position: 'absolute',
    maxHeight: opened ? '300px' : '2.75rem',
    width: '100%',
    borderRadius: '0.5rem',
    border: '1px solid #404348',
    outline: 'none',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    transition: 'all 0.3s ease-in-out',
    backgroundColor: 'transparent',
    zIndex: 999,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  };

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
        ref={root}
        data-opened={opened}
        style={selectStyle}
        className={`${className ?? ''}`}
      >
        {children}
      </div>
    </SelectContext.Provider>
  );
};

interface TriggerProps {
  children: (context: { selected: any }) => ReactNode;
  className?: string;
}

export const SelectTrigger = ({ children, className }: TriggerProps) => {
  const { selected, opened, setOpened } = useSelectContext();

  const placeholderStyle: CSSProperties = {
    padding: '0.75rem 0.75rem',
    cursor: 'pointer',
    backgroundColor: 'transparent',
  };

  return (
    <span
      onClick={() => setOpened(!opened)}
      style={placeholderStyle}
      className={`${className ?? ''}`}
    >
      {children({ selected })}
    </span>
  );
};

interface ContentProps {
  children: ReactNode;
  className?: string;
}

export const SelectContent = ({ children, className }: ContentProps) => {
  const { opened } = useSelectContext();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const optionsStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    padding: '0',
    margin: '0',
    listStyle: 'none',
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
      style={optionsStyle}
      className={`options
				${className ?? ''}`}
    >
      {children}
    </div>
  );
};

interface OptionProps<T> {
  value: Option<T>;
  children: (context: Option<T> | null) => ReactNode;
  className?: string;
}

export const SelectOption = <T,>({
  value,
  children,
  className,
}: OptionProps<T>) => {
  const { selected, setSelected } = useSelectContext<T>();

  return (
    <div
      onClick={() => {
        setSelected(value);
      }}
      style={{
        cursor: 'pointer',
      }}
      className={`${className ?? ''}`}
    >
      {children(selected)}
    </div>
  );
};
