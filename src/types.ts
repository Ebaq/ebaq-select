import React, { CSSProperties, FC, JSX, ReactNode } from 'react';

export interface Option<T> {
  label: string;
  value: T;
}

export interface OptionProps<T> {
  value: Option<T>;
  children: (context: Option<T> | null) => ReactNode;
  className?: string;
  style?: CSSProperties;
}

export declare const SelectOption: <T>(props: OptionProps<T>) => JSX.Element;

export interface SelectProps<T> {
  value?: Option<T>;
  onSelect?: (option: Option<T>) => void;
  children: ReactNode;
  className?: string;
  wrapperClassName?: string;
  style?: CSSProperties;
  wrapperStyle?: CSSProperties;
}

export declare const Select: <T>(props: SelectProps<T>) => JSX.Element;

export interface TriggerProps {
  children: (context: { selected: any; opened: boolean }) => ReactNode;
  className?: string;
  style?: CSSProperties;
}

export declare const SelectTrigger: FC<TriggerProps>;

export interface ContentProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export declare const SelectContent: FC<ContentProps>;

export interface SelectContextValue<T> {
  selected: Option<T> | null;
  setSelected: (option: Option<T>) => void;
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}