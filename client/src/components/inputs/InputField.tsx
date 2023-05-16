'use client'

import { ICreateUser, IUpdateUser } from '@/types/user';
import { validationSchema } from '@/util/validationSchema';
import { Control, FieldErrors } from 'react-hook-form';

interface IInputFieldCreateProps {
  label: string;
  name: keyof ICreateUser;
  type: string;
  errors: FieldErrors<ICreateUser>;
  control: Control<ICreateUser>;
  className: string;
}

interface IInputFieldUpdateProps {
  label: string;
  name: keyof IUpdateUser;
  type: string;
  errors: FieldErrors<IUpdateUser>;
  control: Control<IUpdateUser>;
  className: string;
}

export const InputFieldCreate: React.FC<IInputFieldCreateProps> = ({
  label,
  name,
  type,
  errors,
  control,
  className,
}) => (
  <>
    <label className="label">{label}</label>
    <input type={type} className={className} {...control.register(name, validationSchema[name] as any)} />

    {errors[name] && (
      <label className="label">
        <span className="label-text-alt">{errors[name]?.message?.toString()}</span>
      </label>
    )}
  </>
);

export const InputFieldUpdate: React.FC<IInputFieldUpdateProps> = ({
  label,
  name,
  type,
  errors,
  control,
  className,
}) => (
  <>
    <label className="label">{label}</label>
    <input type={type} className={className} {...control.register(name, validationSchema[name] as any)} />

    {errors[name] && (
      <label className="label">
        <span className="label-text-alt">{errors[name]?.message?.toString()}</span>
      </label>
    )}
  </>
);
