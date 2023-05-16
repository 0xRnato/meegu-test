import { useState } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { ICreateUser } from '@/types/user';
import { useUser } from '@/contexts/UserContext';

interface ICreateUserProps {
  modalId: string;
  closeModal: () => void;
}

export default function CreateUser({ modalId, closeModal }: ICreateUserProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateUser>();
  const { createUser } = useUser();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const onSubmit: SubmitHandler<ICreateUser> = async (data) => {
    await createUser(data);
    closeModal();
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="form-control">
        <label className="label">
          Name
          <input
            type="text"
            className={`input input-primary ${errors.name ? 'input-error' : ''}`}
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <span className="error">{errors.name.message?.toString()}</span>}
        </label>

        <label className="label">
          Birthdate
          <div>
            <Controller
              control={control}
              name="birthdate"
              rules={{ required: 'Birthdate is required' }}
              render={({ field }) => (
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => {
                    handleDateChange(date as Date);
                    field.onChange(date);
                  }}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  className={`input input-primary ${errors.birthdate ? 'input-error' : ''}`}
                />
              )}
            />
          </div>
          {errors.birthdate && <span className="error">{errors.birthdate.message?.toString()}</span>}
        </label>

        <label className="label">
          Document
          <input
            type="text"
            className={`input input-primary ${errors.document ? 'input-error' : ''}`}
            {...register('document', { required: 'Document is required' })}
          />
          {errors.document && <span className="error">{errors.document.message?.toString()}</span>}
        </label>

        <label className="label">
          Zipcode
          <input
            type="text"
            className={`input input-primary ${errors.zipcode ? 'input-error' : ''}`}
            {...register('zipcode', { required: 'Zipcode is required' })}
          />
        </label>

        <label className="label">
          Terms and Conditions
          <input type="checkbox" className="checkbox checkbox-primary" {...register('acceptedTermsAndConditions')} />
          {errors.zipcode && <span className="error">{errors.zipcode.message?.toString()}</span>}
        </label>
      </div>
      <div className="modal-action">
        <button className="btn btn-primary" type="submit">
          Create User
        </button>
        <label htmlFor={modalId} className="btn">
          Close
        </label>
      </div>
    </form>
  );
}
