import { cpf } from 'cpf-cnpj-validator';

const validateAge = (value: string) => {
  const today = new Date();
  const minDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate()); // Minimum age: 18 years
  const selectedDate = new Date(value);
  return selectedDate <= minDate || 'Must be at least 18 years old';
};

const validateCEP = (value: string) => {
  const cepRegex = /^\d{5}-\d{3}$/;
  return cepRegex.test(value) || 'Invalid zipcode';
};

export const validationSchema = {
  name: {
    required: 'Name is required',
  },
  birthdate: {
    required: 'Birthdate is required',
    validate: {
      validAge: (value: string) => validateAge(value),
    },
  },
  document: {
    required: 'Document is required',
    validate: {
      validCPF: (value: string) => cpf.isValid(value) || 'Invalid CPF',
    },
  },
  zipcode: {
    required: 'Zipcode is required',
    validZipcode: (value: string) => validateCEP(value),
  },
  street: {
    required: 'Street is required',
  },
  neighborhood: {
    required: 'Neighborhood is required',
  },
  city: {
    required: 'City is required',
  },
  state: {
    required: 'State is required',
  },
  acceptedTermsAndConditions: {
    validate: {},
  },
};
