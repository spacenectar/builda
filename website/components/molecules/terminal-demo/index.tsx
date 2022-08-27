import React, { useEffect, useState } from 'react';
import Typewriter from 'typewriter-effect';

/* Stylesheet */
import styles from './styles.module.scss';

/* Types */

export type CommandList = {
  text: string;
  typing?: boolean;
  colour?: string;
  delay?: number;
};

interface Props extends React.ComponentProps<'div'> {
  /**
   * The text to display in the window title
   */
  windowTitle: string;
  /**
   * The commands to show in the terminal
   */
  commands: CommandList[];
  /**
   * The terminal width
   * @default '100%'
   */
  width?: string;
  /**
   * The terminal height
   * @default '450px'
   */
  height?: string;
}

const DelayedRender = ({
  children,
  delay
}: {
  children: JSX.Element;
  delay: number;
}) => {
  const [show, setShow] = useState(false);
  const [runCount, setRunCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
      setRunCount(runCount + 1);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the terminal
    const bottom = document.getElementById('terminal-demo-bottom');
    if (bottom) {
      bottom.scrollIntoView({ behavior: 'smooth' });
    }
  }, [runCount]);
  return show ? children : null;
};

/**
 * The Terminal demo component
 */
export const TerminalDemo: React.FC<Props> = ({
  windowTitle = 'Builda',
  commands,
  width = '100%',
  height = '450px',
  className,
  ...props
}: Props) => {
  return (
    <div
      className={`${styles['terminal-demo']}
      ${className}`}
      style={{ width, height }}
      {...props}
    >
      <div className={styles['window-bar']}>
        <div className={styles['pips']}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles['window-title']}>{windowTitle}</div>
      </div>
      <div className={styles['window-body']}>
        {commands.map((command, index) => {
          return (
            <DelayedRender delay={command.delay || 0} key={index}>
              <div key={index} className={styles['command']}>
                {command.typing ? (
                  <>
                    <div className={styles['prompt']}>&gt;</div>
                    <Typewriter
                      onInit={(typewriter: any) => {
                        typewriter
                          .changeDelay(20)
                          .typeString(command.text)
                          .callFunction(
                            (state: {
                              elements: {
                                cursor: {
                                  setAttribute: (
                                    arg0: string,
                                    arg1: string
                                  ) => void;
                                };
                              };
                            }) => {
                              state.elements.cursor.setAttribute(
                                'hidden',
                                'hidden'
                              );
                            }
                          )
                          .start();
                      }}
                    />
                  </>
                ) : (
                  <span
                    className={styles['command-text']}
                    style={{ color: command.colour }}
                  >
                    {command.text}
                  </span>
                )}
              </div>
            </DelayedRender>
          );
        })}
        <div id="terminal-demo-bottom" />
      </div>
    </div>
  );
};

TerminalDemo.displayName = 'TerminalDemo';

export default TerminalDemo;
export type { Props };
