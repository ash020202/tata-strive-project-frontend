import React from 'react';
import { LucideIcon } from 'lucide-react';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface FormInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  type?: string;
  icon?: LucideIcon;
  error?: string;
  placeholder?: string;
}

export function FormInput<T extends FieldValues>({
  label,
  name,
  register,
  type = 'text',
  icon: Icon,
  error,
  placeholder,
}: FormInputProps<T>) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          type={type}
          {...register(name)}
          placeholder={placeholder}
          className={`
            block w-full rounded-md shadow-sm
            ${Icon ? 'pl-10' : 'pl-3'}
            ${error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-orange-500 focus:ring-orange-500'
            }
          `}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}