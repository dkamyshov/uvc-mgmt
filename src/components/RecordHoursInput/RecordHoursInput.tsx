import * as React from 'react';
import * as style from './index.less';
import cn from 'classnames';
import { EMonth } from '../../logic';

interface IRecordHoursInputProps {
  value: number;
  year: number;
  month: EMonth;
  onChange: (value: number, year: number, month: number) => void;
}

interface IRecordHoursInputState {
  value: string;
}

const validateRecordHoursInput = (
  value: string,
  checkIfEmpty: boolean = true
) => {
  if (checkIfEmpty && value === '') {
    return true;
  }

  return /^\d+$/.test(value);
};

const mayLiftState = (value: string) => {
  return validateRecordHoursInput(value, false);
};

class RecordHoursInput extends React.Component<
  IRecordHoursInputProps,
  IRecordHoursInputState
> {
  state = {
    value: String(this.props.value),
  };

  componentDidUpdate(prevProps: IRecordHoursInputProps) {
    if (this.props.value !== prevProps.value) {
      this.setState({
        value: String(this.props.value),
      });
    }
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (validateRecordHoursInput(e.target.value)) {
      this.setState({
        value: e.target.value,
      });

      if (mayLiftState(e.target.value)) {
        this.props.onChange(
          parseInt(e.target.value, 10),
          this.props.year,
          this.props.month
        );
      }
    } else {
      e.preventDefault();
    }
  };

  render() {
    const { value } = this.state;

    return (
      <input
        className={cn(style['record-hours-input'], {
          [style['invalid']]: !validateRecordHoursInput(value),
        })}
        type="number"
        value={value}
        onChange={this.onChange}
      />
    );
  }
}

export default RecordHoursInput;
