import { Field } from '../types/fields';

const formFields: Field[] = [
  { type: 'text', label: 'Name', name: 'name', placeholder: 'Enter your name', required: true },
  { type: 'text', label: 'Surname', name: 'name', placeholder: 'Enter your surname', required: true },
  {
    
    type: "email",
    name: "email",
    required: true,
    label: "Email your email",
    placeholder: "Enter your email",
  },
  {
    type: 'select',
    label: 'Choice the sale',
    name: 'sale',
    options: [
      { label: 'St.Augustin', value: 'St.Augustin' },
      { label: 'St.John Paul II', value: 'St.John Paul II' },
      { label: 'St. Family', value: 'St. Family' }
    ],
    required: true
  }
];

export default formFields;