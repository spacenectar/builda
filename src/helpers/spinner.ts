import process from 'process';
import rdl from 'readline';

const std = process.stdout;

const spinners = {
  dots: {
    interval: 80,
    frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
  }
};

export const spinner = () => {
  process.stdout.write('\x1B[?25l');
  const spin = spinners.dots;
  const spinnerFrames = spin.frames;
  const spinnerTimeInterval = spin.interval;
  let index = 0;
  setInterval(() => {
    let now = spinnerFrames[index];
    if (now == undefined) {
      index = 0;
      now = spinnerFrames[index];
    }
    std.write(now);
    rdl.cursorTo(std, 0, 0);
    index = index >= spinnerFrames.length ? 0 : index + 1;
  }, spinnerTimeInterval);
};

//TODO: Cursor position is not working properly and we need to be able to stop the spinner when we want to
export default spinner;
