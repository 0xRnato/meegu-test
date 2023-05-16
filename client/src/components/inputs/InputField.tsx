import { ICreateUser } from '@/types/user';
import { validationSchema } from '@/util/validationSchema';
import { Control, FieldErrors } from 'react-hook-form';

interface IInputFieldProps {
  label: string;
  name: keyof ICreateUser;
  type: string;
  errors: FieldErrors<ICreateUser>;
  control: Control<ICreateUser>;
  className: string;
}

export const InputField: React.FC<IInputFieldProps> = ({ label, name, type, errors, control, className }) => (
  <>
    <label className="label">
      {label}
      <input type={type} className={className} {...control.register(name, validationSchema[name] as any)} />
    </label>
    {errors[name] && <span className="error">{errors[name]?.message?.toString()}</span>}
  </>
);
