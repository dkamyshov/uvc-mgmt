import * as React from 'react';
import * as style from './index.less';
import cn from 'classnames';

interface IInitialHoursInputProps {
  value: number;
  onInitialHoursChange: (value: number) => void;
}

interface IInitialHoursInputState {
  value: string;
}

const validateInitialHoursInput = (
  value: string,
  checkIfEmpty: boolean = true
) => {
  if (checkIfEmpty && value === '') {
    return true;
  }

  return /^\d+$/.test(value);
};

const mayLiftState = (value: string) => {
  return validateInitialHoursInput(value, false);
};

class InitialHoursInput extends React.Component<
  IInitialHoursInputProps,
  IInitialHoursInputState
> {
  state = {
    value: String(this.props.value),
  };

  componentDidUpdate(prevProps: IInitialHoursInputProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({
        value: String(this.props.value),
      });
    }
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (validateInitialHoursInput(e.target.value)) {
      this.setState({
        value: e.target.value,
      });

      if (mayLiftState(e.target.value)) {
        if (mayLiftState(e.target.value)) {
          this.props.onInitialHoursChange(parseInt(e.target.value, 10));
        }
      }
    } else {
      e.preventDefault();
    }
  };

  render() {
    const { value } = this.state;

    return (
      <div className={style['initial-hours']}>
        <label>Наработка станции в начале отсчета:</label>

        <input
          className={cn({
            [style['invalid']]: !validateInitialHoursInput(value),
          })}
          type="number"
          value={value}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default InitialHoursInput;
