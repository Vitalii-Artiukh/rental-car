import { ReactNode } from 'react';

export interface Filters {
  page: number;
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
}

export interface FitchFiltersType {
  filters: Filters;
}

export interface CalendarProps {
  selectedDate: Date;
  onChange: (date: Date | null) => void;
  className?: string;
  placeholder?: string;
}

export interface IconProps {
  name: string;
  fill?: string;
  stroke?: string;
  width?: number;
  height?: number;
  className?: string;
}

export interface CarProps {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  accessories: string[];
  description: string;
  engineSize: string;
  fuelConsumption: string;
  functionalities: string[];
  img: string;
  mileage: number;
  rentalCompany: string;
  rentalConditions: string[];
  rentalPrice: number;
  address: string;
}

export interface CarItemsProps {
  car: CarProps;
  onToggle: () => void;
  isFavorite: boolean;
}

export interface ChildrenProps {
  children: ReactNode;
}

export interface ButtonProps {
  variant?: 'default' | 'long' | 'transparent';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children?: ReactNode;
}

export interface InputCustomProps {
  className: string;
  classNameLabel: string;
  classNameLabelText: string;
  name: string;
  placeholder: string;
  labelText: string;
  toFilter: string;
  handleChange: (name: string, value: string) => void;
}
