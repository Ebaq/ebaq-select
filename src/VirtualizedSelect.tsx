'use client';

import React, {
  createContext,
  CSSProperties,
  ReactNode,
  useContext,
  useRef,
  useState,
} from 'react';

import { Option } from './types';

export interface VirtualizedSelectProps<T> {
  value?: Option<T>;
  onSelect?: (option: Option<T>) => void;
  options: Option<T>[];
  height?: number;
  itemHeight?: number;
  renderOption?: (
    option: Option<T>,
    isSelected: boolean,
    onClick: () => void
  ) => ReactNode;
  className?: string;
  style?: CSSProperties;
  wrapperClassName?: string;
  wrapperStyle?: CSSProperties;
  children?: ReactNode;
}

export interface VirtualizedTriggerProps {
  children: (context: {
    selected: Option<any> | null;
    opened: boolean;
  }) => ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface VirtualizedContentProps<T> {
  options: Option<T>[];
  height: number;
  itemHeight: number;
  renderOption?: (
    option: Option<T>,
    isSelected: boolean,
    onClick: () => void
  ) => ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface OptionProps<T> {
  option: Option<T>;
  isSelected: boolean;
  onClick: () => void;
  renderOption?: (
    option: Option<T>,
    isSelected: boolean,
    onClick: () => void
  ) => ReactNode;
  className?: string;
  style?: CSSProperties;
  itemHeight: number;
}

interface VirtualizedSelectContextValue<T> {
  selected: Option<T> | null;
  setSelected: (option: Option<T>) => void;
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  onSelect?: (option: Option<T>) => void;
}

const VirtualizedSelectContext =
  createContext<VirtualizedSelectContextValue<any> | null>(null);

export const useVirtualizedSelectContext = <
  T,
>(): VirtualizedSelectContextValue<T> => {
  const context = useContext(VirtualizedSelectContext);
  if (!context) {
    throw new Error(
      'useVirtualizedSelectContext must be used within a VirtualizedSelect'
    );
  }
  return context;
};

export const VirtualizedSelect = <T,>({
  value,
  onSelect,
  options,
  height = 300,
  itemHeight = 40,
  renderOption,
  wrapperClassName,
  wrapperStyle,
  children,
}: VirtualizedSelectProps<T>) => {
  const [selected, setSelected] = useState<Option<T> | null>(value || null);
  const [opened, setOpened] = useState(false);

  const contextValue: VirtualizedSelectContextValue<T> = {
    selected,
    setSelected,
    opened,
    setOpened,
    onSelect,
  };

  return (
    <VirtualizedSelectContext.Provider value={contextValue}>
      <div
        style={{ position: 'relative', ...wrapperStyle }}
        className={wrapperClassName}
      >
        {children}
      </div>
      {opened && (
        <VirtualizedContent
          options={options}
          height={height}
          itemHeight={itemHeight}
          renderOption={renderOption}
        />
      )}
    </VirtualizedSelectContext.Provider>
  );
};

export const VirtualizedTrigger = ({
  children,
  className,
  style,
}: VirtualizedTriggerProps) => {
  const { opened, setOpened, selected } = useVirtualizedSelectContext();

  return (
    <div
      onClick={() => setOpened(!opened)}
      className={className}
      style={{
        cursor: 'pointer',
        ...style,
      }}
      role="button"
      aria-haspopup="listbox"
      aria-expanded={opened}
    >
      {children({ selected, opened })}
    </div>
  );
};

export const VirtualizedContent = <T,>({
  options,
  height,
  itemHeight,
  renderOption,
  className,
  style,
}: VirtualizedContentProps<T>) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = () => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop);
    }
  };

  const totalItems = options.length;
  const visibleCount = Math.ceil(height / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleCount + 2, totalItems);
  const offsetY = startIndex * itemHeight;

  const visibleOptions = options.slice(startIndex, endIndex);

  const { setSelected, setOpened, onSelect, selected } =
    useVirtualizedSelectContext();

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className={className}
      style={{
        height: height,
        overflowY: 'auto',
        position: 'relative',
        ...style,
      }}
      role="listbox"
    >
      <div
        style={{ height: `${totalItems * itemHeight}px`, position: 'relative' }}
      >
        <div
          style={{
            position: 'absolute',
            top: `${offsetY}px`,
            left: 0,
            right: 0,
          }}
        >
          {visibleOptions.map((option) => (
            <OptionComponent
              key={String(option.value)}
              option={option}
              isSelected={selected?.value === option.value}
              onClick={() => {
                setSelected(option);
                setOpened(false);
                onSelect?.(option);
              }}
              renderOption={renderOption}
              itemHeight={itemHeight}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const OptionComponent = <T,>({
  option,
  isSelected,
  onClick,
  renderOption,
  className,
  style,
  itemHeight,
}: OptionProps<T>) => {
  if (renderOption) {
    return <>{renderOption(option, isSelected, onClick)}</>;
  }

  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        cursor: 'pointer',
        height: itemHeight,
        textWrap: 'nowrap',
        ...style,
      }}
      role="option"
      aria-selected={isSelected}
    >
      {option.label}
    </div>
  );
};
