export interface Field {
  config: {
    name: string;
    label: string;
    required?: boolean;
    type: string;
    placeholder?: string;
    min?: number;
    max?: number;
    options?: { label: string; value: string | number }[];
  };
  errors: string[];
  validate(value: string): boolean;
  createElement(): HTMLElement;
}

export interface FieldBase {
  config: { name: string; label: string; required?: boolean };
  errors: string[];
  validate(value: string): boolean;
  createElement(): HTMLElement;
}

export type FormFieldBase = {
  label?: string;
  name: string;
  required?: boolean;
};
    
  export type TextField = FieldBase & {
    type: 'text';
    placeholder?: string;
  };
    
  export type NumberField = FieldBase & {
    type: 'number';
    min?: number;
    max?: number;
    placeholder?: string;
  };
    
  export type SelectField = FieldBase & {
    type: 'select';
    options: { label: string; value: string | number }[];
  };
  
  export type EmailField = FieldBase & {
    type: 'email';
    placeholder?: string;
  };
  
  export type PasswordField = FieldBase & {
    type: 'password';
    placeholder?: string;
  };
  
  export type ButtonElement = FieldBase & {
    type: 'select';
    options: { label: string; value: string | number }[];
  };
    
 // export type Field = TextField | NumberField | SelectField | EmailField | PasswordField | ButtonElement;