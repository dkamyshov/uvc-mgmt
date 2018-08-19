import * as React from 'react';
import * as style from './index.less';
import cn from 'classnames';
import { EMonth } from '../../logic';

interface IPlanInputProps {
  value: number;
  quarter: number;
  onChange: (value: number, quarter: number) => void;
}

interface IPlanInputState {
  value: string;
}

const validatePlanInput = (value: string, checkIfEmpty: boolean = true) => {
  if (checkIfEmpty && value === '') {
    return true;
  }

  return /^\d+$/.test(value);
};

const mayLiftState = (value: string) => {
  return validatePlanInput(value, false);
};

class PlanInput extends React.Component<IPlanInputProps, IPlanInputState> {
  state = {
    value: String(this.props.value),
  };

  componentDidUpdate(prevProps: IPlanInputProps) {
    if (this.props.value !== prevProps.value) {
      this.setState({
        value: String(this.props.value),
      });
    }
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (validatePlanInput(e.target.value)) {
      this.setState({
        value: e.target.value,
      });

      if (mayLiftState(e.target.value)) {
        this.props.onChange(parseInt(e.target.value, 10), this.props.quarter);
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
          [style['invalid']]: !validatePlanInput(value),
        })}
        type="number"
        value={value}
        onChange={this.onChange}
      />
    );
  }
}

export default PlanInput;
