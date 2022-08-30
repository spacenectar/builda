import React from 'react';

// Import Components
import { InputRadio } from 'components';

// Import types
import InputOption from 'lib/types/input-option';

// Prop Types
export interface Props extends React.ComponentProps<'input'> {
  /**
   * The options for each of the input radios.
   */
  options: InputOption[];
}

// Render component
export const InputRadioGroup: React.FC<Props> = ({ options, name }: Props) => (
  <div>
    {options.map((option, index) => (
      <InputRadio
        key={`${name}-${index}`}
        name={name}
        value={option.value || option.label}
        id={`${name}-${index}`}
        checked={option.checked}
        disabled={option.disabled}
        {...option}
      />
    ))}
  </div>
);

InputRadioGroup.displayName = 'InputRadioGroup';

export default InputRadioGroup;
