import React from 'react';

/* Import Stylesheet */
import styles from './styles.module.scss';

/* Prop Types */
export interface Props {
  /**
   * The name of the person if no name is provided then it will display a default
   * avatar to indicate that this has not been assigned to a person.
   */
  name?: string;
  /**
   * The background colour of the avatar if no image is provided defaults to
   * the primary colour.
   * @default primary
   */
  colour?: string;
  /**
   * The image to display, if no image is provided then it will use the initials
   * of the name provided. If no name is provided then it will display a default
   * avatar to indicate that this has not been assigned to a person.
   * @default ?
   */
  imagePath?: string;
  /**
   * The size of the avatar using CSS values.
   * @default 100%
   */
  size?: string;
}

const nameToInitials = (name: string) => {
  if (!name) {
    throw new Error('No name provided');
  }
  const nameParts = name.trim().toUpperCase().split(' ');
  const firstInitial = nameParts[0][0];
  const lastInitial = nameParts[nameParts.length - 1][0];
  if (nameParts.length === 1) {
    return firstInitial;
  }
  if (nameParts.length === 2 || nameParts.length > 3) {
    return `${firstInitial}${lastInitial}`;
  }
  return nameParts.map((part) => part[0]).join('');
};

/* Render component */
export const Avatar: React.FC<Props> = ({
  name,
  colour,
  imagePath,
  size
}: Props) => {
  const initials = name ? nameToInitials(name) : '?';
  const viewBox = name ? '0 0 40 40' : '0 0 30 30';
  return (
    <div className={styles.avatar} style={{ height: size || '100%' }}>
      {imagePath ? (
        <picture>
          <img className={styles.image} src={imagePath} alt={name} />
        </picture>
      ) : (
        <div className={styles.initials} style={{ backgroundColor: colour }}>
          <svg viewBox={viewBox}>
            <text y="53%" x="51%">
              {initials}
            </text>
          </svg>
        </div>
      )}
    </div>
  );
};

Avatar.displayName = 'Avatar';

export default Avatar;
