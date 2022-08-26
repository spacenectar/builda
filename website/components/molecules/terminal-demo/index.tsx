import React, { useRef } from 'react';
import Typing from 'react-typing-animation';

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
}

/**
 * The Terminal demo component
 */
export const TerminalDemo: React.FC<Props> = ({
  windowTitle = 'Builda',
  commands,
  className,
  ...props
}: Props) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  const PrintCommands = ({
    command,
    index
  }: {
    command: CommandList;
    index: number;
  }) => {
    const timer = setInterval(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    return (
      <div key={index} className={styles['command']}>
        {command.typing ? <div className={styles['prompt']}>&gt;</div> : null}
        <Typing
          speed={command.typing ? 50 : 0}
          onAfterType={() => setTimeout(() => clearTimeout(timer), 1000)}
          startDelay={command.delay ? command.delay : 0}
        >
          <span
            className={styles['command-text']}
            style={{ color: command.colour }}
          >
            {command.text}
          </span>
        </Typing>
      </div>
    );
  };

  return (
    <div className={`${styles['terminal-demo']} ${className}`} {...props}>
      <div className={styles['window-bar']}>
        <div className={styles['pips']}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles['window-title']}>{windowTitle}</div>
      </div>
      <div className={styles['window-body']}>
        {commands.map((command, index) => (
          <PrintCommands command={command} index={index} key={index} />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

TerminalDemo.displayName = 'TerminalDemo';

export default TerminalDemo;
export type { Props };
