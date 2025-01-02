import React from 'react';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface FormTextareaProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: string;
  rows?: number;
  placeholder?: string;
}

export function FormTextarea<T extends FieldValues>({
  label,
  name,
  register,
  error,
  rows = 3,
  placeholder,
}: FormTextareaProps<T>) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        {...register(name)}
        rows={rows}
        placeholder={placeholder}
        className={`
          block w-full rounded-md shadow-sm
          ${error
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-orange-500 focus:ring-orange-500'
          }
        `}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}