'use client';

import React, {
  createContext,
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
  return <div className="wrapper">{children}</div>;
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
      <div ref={root} data-opened={opened} className={`select ${className}`}>
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

  return (
    <span
      onClick={() => setOpened(!opened)}
      className={`placeholder ${className}`}
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

  // if (!opened) return null

  return (
    <div
      ref={rootRef}
      className={`mt-2 w-full bg-white border rounded-md shadow-lg options
				${className}`}
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
      className={`option ${className}`}
    >
      {children(selected)}
    </div>
  );
};
