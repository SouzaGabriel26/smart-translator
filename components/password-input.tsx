'use client';

import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { type JSX, useState } from 'react';
import { Input } from './ui/input';

type PasswordInputProps = Omit<JSX.IntrinsicElements['input'], 'type'>;

export function PasswordInput({ ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPassword() {
    setShowPassword((prev) => !prev);
  }

  return (
    <fieldset className="relative w-full">
      <Input type={showPassword ? 'text' : 'password'} {...props} />

      <button
        type="button"
        onClick={toggleShowPassword}
        className="absolute right-3 top-1/2 -translate-y-1/2"
      >
        {showPassword ? (
          <EyeOffIcon className="size-4" />
        ) : (
          <EyeIcon className="size-4" />
        )}
      </button>
    </fieldset>
  );
}
