import React, { JSX } from 'react';

export interface Option<T> {
  label: string;
  value: T;
}

export interface SelectProps<T> {
  value?: Option<T>;
  onChange?: (option: Option<T>) => void;
  children: React.ReactNode;
  className?: string;
}

declare function Select<T>(props: SelectProps<T>): JSX.Element;

export default Select;

export interface TriggerProps {
  children: (context: { selected: any }) => React.ReactNode;
  className?: string;
}

export declare const SelectTrigger: React.FC<TriggerProps>;

export interface ContentProps {
  children: React.ReactNode;
  className?: string;
}

export declare const SelectContent: React.FC<ContentProps>;

export interface OptionProps<T> {
  value: Option<T>;
  children: React.ReactNode;
  className?: string;
}

export declare const SelectOption: <T>(props: OptionProps<T>) => JSX.Element;
