import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';

import { ICreateUser } from '@/types/user';
import { validationSchema } from '@/util/validationSchema';
import { Control, FieldErrors } from 'react-hook-form';

interface IBirthdateField {
  errors: FieldErrors<ICreateUser>;
  control: Control<ICreateUser>;
}

export const BirthdateField: React.FC<IBirthdateField> = ({ errors, control }) => {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  return (
    <>
      <label className="label">Birthdate</label>
      <div>
        <Controller
          control={control}
          name="birthdate"
          rules={validationSchema.birthdate}
          render={({ field }) => (
            <DatePicker
              selected={new Date(selectedDate)}
              onChange={(date) => {
                handleDateChange(date as Date);
                field.onChange(date);
              }}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              className={`input input-primary ${errors.birthdate ? 'input-error' : ''} w-full`}
            />
          )}
        />
      </div>

      {errors.birthdate && (
        <label className="label">
          <span className="label-text-alt">{errors.birthdate.message?.toString()}</span>
        </label>
      )}
    </>
  );
};
