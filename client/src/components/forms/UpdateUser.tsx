'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useUser } from '@/contexts/UserContext';
import { IUpdateUser, IUser } from '@/types/user';
import { InputFieldUpdate } from '@/components/inputs/InputField';
import { BirthdateFieldUpdate } from '@/components/inputs/BirthdateFIeld';

interface IUpdateUserProps {
  userId: string;
}

export default function UpdateUser({ userId }: IUpdateUserProps) {
  const { updateUser, getUserById } = useUser();
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUpdateUser>();
  const router = useRouter();

  useEffect(() => {
    getUserById(+userId).then((result) => {
      setSelectedUser(result);
      reset(result);
    });
  }, [getUserById, userId, reset]);

  const onSubmit: SubmitHandler<IUpdateUser> = async (data) => {
    // Get the birthdate value and adjust it for the time zone offset
    const birthdate = new Date(data.birthdate);
    const timeZoneOffset = birthdate.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
    const adjustedBirthdate = new Date(birthdate.getTime() - timeZoneOffset);

    // Format the adjusted birthdate value before sending it to the backend
    const formattedData = {
      ...data,
      birthdate: adjustedBirthdate.toISOString().split('T')[0],
    };

    await updateUser(+userId, formattedData);
    router.push('/');
  };

  if (!selectedUser) {
    return <h1>Loading...</h1>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-96">
      <div className="form-control">
        <InputFieldUpdate
          label="Name"
          name="name"
          type="text"
          errors={errors}
          control={control}
          className={`input input-primary ${errors.name ? 'input-error' : ''} w-full`}
        />

        <BirthdateFieldUpdate errors={errors} control={control} defaultDate={selectedUser.birthdate} />

        <InputFieldUpdate
          label="Document"
          name="document"
          type="text"
          errors={errors}
          control={control}
          className={`input input-primary ${errors.document ? 'input-error' : ''} w-full`}
        />

        <InputFieldUpdate
          label="Zipcode"
          name="zipcode"
          type="text"
          errors={errors}
          control={control}
          className={`input input-primary ${errors.zipcode ? 'input-error' : ''} w-full`}
        />

        <InputFieldUpdate
          label="Street"
          name="street"
          type="text"
          errors={errors}
          control={control}
          className={`input input-primary ${errors.street ? 'input-error' : ''} w-full`}
        />

        <InputFieldUpdate
          label="Neighborhood"
          name="neighborhood"
          type="text"
          errors={errors}
          control={control}
          className={`input input-primary ${errors.neighborhood ? 'input-error' : ''} w-full`}
        />

        <InputFieldUpdate
          label="City"
          name="city"
          type="text"
          errors={errors}
          control={control}
          className={`input input-primary ${errors.city ? 'input-error' : ''} w-full`}
        />

        <InputFieldUpdate
          label="State"
          name="state"
          type="text"
          errors={errors}
          control={control}
          className={`input input-primary ${errors.state ? 'input-error' : ''} w-full`}
        />

        <InputFieldUpdate
          label="Terms and Conditions"
          name="acceptedTermsAndConditions"
          type="checkbox"
          errors={errors}
          control={control}
          className="checkbox checkbox-primary"
        />
      </div>
      <div className="modal-action">
        <button className="btn btn-primary" type="submit">
          Update User
        </button>
        <label className="btn" onClick={() => router.push('/')}>
          Cancel
        </label>
      </div>
    </form>
  );
}
