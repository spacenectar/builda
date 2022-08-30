import React, { useState } from 'react';

import { Button, InputFactory, Icons as Icon } from 'components';

// Import Stylesheet
import styles from './styles.module.scss';

// Prop Types
export interface Props {
  /**
   * The placeholder text for the search input
   */
  placeholder: string;
  /**
   * The value of the search input
   */
  value?: string;
  /**
   * The action to perform when the search button is clicked
   */
  onSubmit: (arg0: string) => void;
}

// Render component
export const InputSearch: React.FC<Props> = ({
  placeholder,
  value = '',
  onSubmit
}: Props) => {
  const [searchTerm, setSearchTerm] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={styles['input-search']}>
      <InputFactory
        name={placeholder.toLowerCase().split(' ').join('-')}
        labelText={placeholder}
        hideLabel
        placeholder={placeholder}
        type="text"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={(e) => {
          e.key === 'Enter' && onSubmit(searchTerm);
        }}
      />
      <Button
        label={`Search`}
        className={styles['button']}
        iconOnly
        variant="primary"
        onClick={() => onSubmit(searchTerm)}
      >
        <Icon.Search />
      </Button>
    </div>
  );
};

InputSearch.displayName = 'InputSearch';

export default InputSearch;
