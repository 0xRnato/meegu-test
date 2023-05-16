import { SubmitHandler, useForm } from 'react-hook-form';

import { ICreateUser } from '@/types/user';
import { useUser } from '@/contexts/UserContext';
import { InputField } from '@/components/inputs/InputField';
import { BirthdateField } from '@/components/inputs/BirthdateFIeld';

interface ICreateUserProps {
  modalId: string;
  closeModal: () => void;
}

export default function CreateUser({ modalId, closeModal }: ICreateUserProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateUser>();
  const { createUser } = useUser();

  const onSubmit: SubmitHandler<ICreateUser> = async (data) => {
    // Get the birthdate value and adjust it for the time zone offset
    const birthdate = new Date(data.birthdate);
    const timeZoneOffset = birthdate.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
    const adjustedBirthdate = new Date(birthdate.getTime() - timeZoneOffset);

    // Format the adjusted birthdate value before sending it to the backend
    const formattedData = {
      ...data,
      birthdate: adjustedBirthdate.toISOString().split('T')[0],
    };

    await createUser(formattedData);
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="form-control">
        <InputField
          label="Name"
          name="name"
          type="text"
          errors={errors}
          control={control}
          className={`input input-primary ${errors.name ? 'input-error' : ''} w-full`}
        />

        <BirthdateField errors={errors} control={control} />

        <InputField
          label="Document"
          name="document"
          type="text"
          errors={errors}
          control={control}
          className={`input input-primary ${errors.document ? 'input-error' : ''} w-full`}
        />

        <InputField
          label="Zipcode"
          name="zipcode"
          type="text"
          errors={errors}
          control={control}
          className={`input input-primary ${errors.zipcode ? 'input-error' : ''} w-full`}
        />

        <InputField
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
          Create User
        </button>
        <label htmlFor={modalId} className="btn">
          Close
        </label>
      </div>
    </form>
  );
}
