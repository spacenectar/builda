import React from 'react';

// Import types
import InputTypes from '../types/input-types';

import InputOption from 'lib/types/input-option';

// Import components
import {
  InputText,
  InputCheckbox,
  InputDatetime,
  InputFile,
  InputRadio,
  InputSelect,
  InputTextarea,
  InputAutocomplete,
  InputRadioGroup
} from 'components';

const renderInput = (
  type: InputTypes,
  props: React.ComponentProps<'input'>,
  label: string,
  options: unknown[] = []
) => {
  switch (type) {
    case 'textarea':
      return <InputTextarea {...(props as React.ComponentProps<'textarea'>)} />;
    case 'radio':
      return <InputRadio label={label} {...props} />;
    case 'checkbox':
      return <InputCheckbox label={label} {...props} />;
    case 'file':
      return <InputFile {...props} />;
    case 'datetime':
      return <InputDatetime {...props} />;
    // These components are all variants of `InputText` so they need to have a type prop added
    case 'password':
      return <InputText {...props} type="password" />;
    case 'email':
      return <InputText {...props} type="email" />;
    case 'number':
      return <InputText {...props} type="number" />;
    case 'tel':
      return <InputText {...props} type="tel" />;
    case 'url':
      return <InputText {...props} type="url" />;
    // These components all support the options prop, so be sure to pass it down
    case 'select':
      return (
        <InputSelect
          {...(props as React.ComponentProps<'select'>)}
          options={options as InputOption[]}
        />
      );
    case 'autocomplete':
      return <InputAutocomplete {...props} options={options as string[]} />;
    case 'radiogroup':
      return <InputRadioGroup {...props} options={options as InputOption[]} />;
    case 'text':
    default:
      return <InputText {...props} />;
  }
};

export default renderInput;
