import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CSSTransition } from 'react-transition-group';

// Stylesheet
import styles from './styles.module.scss';

// Types
import type LinkObject from 'lib/types/link-object';

export interface Props extends React.ComponentProps<'nav'> {
  /**
   * The User object (if logged in)
   */
  links: LinkObject[];
  /**
   * Toggle visibility of the menu
   * @default false
   */
  showMenu?: boolean;
}

/**
 * The `ContextMenu` component is used to display a menu of links in a dropdown menu.
 */
export const ContextMenu: React.FC<Props> = ({
  links,
  showMenu = false,
  className,
  ...props
}: Props) => {
  const [isOpen, setIsOpen] = useState(showMenu);

  useEffect(() => {
    setIsOpen(showMenu);
  }, [showMenu]);

  return (
    <CSSTransition
      in={isOpen}
      timeout={200}
      classNames={{
        enter: styles['enter'],
        enterActive: styles['enter-active'],
        enterDone: styles['enter-done'],
        exit: styles['exit'],
        exitActive: styles['exit-active'],
        exitDone: styles['exit-done']
      }}
      mountOnEnter
      unmountOnExit
    >
      <nav className={`${styles['context-menu']} ${className}`} {...props}>
        <ul>
          {links.map(({ href, label, icon }) => (
            <li
              key={href}
              className={`${styles['menu-item']} ${icon && styles['has-icon']}`}
            >
              {icon}
              <Link href={href}>
                <a>{label}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </CSSTransition>
  );
};

ContextMenu.displayName = 'ContextMenu';

export default ContextMenu;
