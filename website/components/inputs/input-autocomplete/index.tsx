import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

// REFACTOR: This component was written in a rush and needs to be refactored and properly documented

/* Import Stylesheet */
import styles from './styles.module.scss';

/** Import components */
import { InputText } from 'components/inputs/input-text';

/* Prop Types */
import ComponentStatuses from 'lib/types/component-statuses';
import { InputValue } from 'lib/types/input-value';

/* Import helpers */

import fakeEvent from 'lib/helpers/fake-event';

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * The state of the input (not providing a value or setting the value to 'default' will all return a default state)
   * @default 'default'
   */
  status?: ComponentStatuses;
  /**
   * A list of options to pass to the autocomplete
   */
  options: string[];
  /**
   * Allow users to add new options
   */
  allowAdd?: boolean;
}

const cx = classNames.bind(styles);

/* Render component */
export const InputAutocomplete: React.FC<Props> = ({
  options,
  className,
  onChange,
  status,
  value = '',
  ...props
}: Props) => {
  const [selectedOption, setSelectedOption] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const updateSelections = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value.length) {
      setSelectedOption('');
      setSuggestions([]);
      return handleSelect('');
    }
    const filteredOptions = options.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setSelectedOption(value);
    if (!filteredOptions.length) {
      return handleSelect(value);
    }
    return setSuggestions(filteredOptions);
  };

  const handleSelect = (suggestion: InputValue) => {
    const cleanSuggestion = suggestion?.toString().trim();
    setSelectedOption(suggestion || '');
    setSuggestions([]);
    onChange && onChange(fakeEvent(cleanSuggestion));
  };

  const navigateSuggestions = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    if (!['ArrowDown', 'ArrowUp', 'Tab'].includes(key)) return;
    if (!suggestions.length) return;
    const index = suggestions.indexOf(selectedOption.toString());
    if (key === 'ArrowDown' || (!e.shiftKey && key === 'Tab')) {
      e.preventDefault();
      if (index === suggestions.length - 1) {
        return setSelectedOption(suggestions[0]);
      }
      return setSelectedOption(suggestions[index + 1]);
    }
    if (key === 'ArrowUp' || (e.shiftKey && key === 'Tab')) {
      e.preventDefault();
      if (index === 0) {
        return setSelectedOption(suggestions[suggestions.length - 1]);
      }
      return setSelectedOption(suggestions[index - 1]);
    }
  };

  const handleEnterKey = () => {
    if (!suggestions || (suggestions.length === 0 && selectedOption)) {
      return onChange && onChange(fakeEvent(selectedOption));
    }
    return handleSelect(selectedOption);
  };

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  return (
    <div className={cx(styles['input-autocomplete'], className)}>
      <InputText
        // Disable browsers own autocomplete
        autoComplete="off"
        status={status}
        value={selectedOption}
        onChange={updateSelections}
        onKeyDown={(e) => {
          e.key === 'Enter' && handleEnterKey();
          e.key === 'Space' && handleSelect(selectedOption);
          e.key === 'Escape' && setSuggestions([]);
          navigateSuggestions(e);
        }}
        {...props}
      />
      {suggestions.length > 0 && (
        <ul className={styles['suggestions']}>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion}
              className={cx(styles['suggestion'], {
                [styles['selected']]: selectedOption === suggestion
              })}
              onClick={() => handleSelect(suggestion)}
              onMouseOver={() => setSelectedOption(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
InputAutocomplete.displayName = 'InputAutocomplete';
export default InputAutocomplete;
