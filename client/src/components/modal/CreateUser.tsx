'use client';

import { ICreateUser } from '@/types/user';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useUser } from '@/contexts/UserContext';

interface ICreateUserProps {
  modalId: string;
  closeModal: () => void;
}

export default function CreateUser({ modalId, closeModal }: ICreateUserProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateUser>();
  const { createUser } = useUser();

  const onSubmit: SubmitHandler<ICreateUser> = async (data: ICreateUser) => {
    await createUser(data);
    closeModal();
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
        </label>

        <label className="label">
          birthdate
          <input
            type="text"
            className={`input input-primary ${errors.birthdate ? 'input-error' : ''}`}
            {...register('birthdate', { required: 'birthdate is required' })}
          />
        </label>

        <label className="label">
          document
          <input
            type="text"
            className={`input input-primary ${errors.document ? 'input-error' : ''}`}
            {...register('document', { required: 'document is required' })}
          />
        </label>

        <label className="label">
          zipcode
          <input
            type="text"
            className={`input input-primary ${errors.zipcode ? 'input-error' : ''}`}
            {...register('zipcode', { required: 'zipcode is required' })}
          />
        </label>

        <label className="label">
          Tarms and Conditions
          <input type="checkbox" className="checkbox checkbox-primary" {...register('acceptedTermsAndConditions')} />
        </label>

        {errors.name && <span className="error">{errors.name.message?.toString()}</span>}
        {errors.birthdate && <span className="error">{errors.birthdate.message?.toString()}</span>}
        {errors.document && <span className="error">{errors.document.message?.toString()}</span>}
        {errors.zipcode && <span className="error">{errors.zipcode.message?.toString()}</span>}
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
