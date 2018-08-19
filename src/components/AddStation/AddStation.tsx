import * as React from 'react';
import * as style from './index.less';
import { IStationsContextData, withStations } from '../../utils/context';
import { Form, Field } from 'react-final-form';

type IAddStationProps = IStationsContextData;

const validateForm = (values: any) => {
  const errors = {} as any;

  if (typeof values.name !== 'string') {
    errors.name = 'Введите название станции!';
  }

  if (typeof values.firstYear !== 'string') {
    errors.firstYear = 'Введите первый год работы станции!';
  } else {
    if (!/^\d+$/.test(values.firstYear)) {
      errors.firstYear = 'Неверный формат. Введите число.';
    }
  }

  return errors;
};

class AddStation extends React.Component<IAddStationProps> {
  addStation = (formValues: any) => {
    this.props.addStation(formValues.name, Number(formValues.firstYear));
  };

  render() {
    return (
      <div>
        <Form
          onSubmit={this.addStation}
          validate={validateForm}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="name"
                render={({ input, meta }) => (
                  <React.Fragment>
                    <label>Название станции:</label>
                    <input {...input} />
                    {meta.touched &&
                      meta.error && (
                        <span className={style['error']}>{meta.error}</span>
                      )}
                  </React.Fragment>
                )}
              />
              <Field
                name="firstYear"
                render={({ input, meta }) => (
                  <React.Fragment>
                    <label>Первый год работы станции:</label>
                    <input {...input} />
                    {meta.touched &&
                      meta.error && (
                        <span className={style['error']}>{meta.error}</span>
                      )}
                  </React.Fragment>
                )}
              />
              <button>Создать станцию</button>
            </form>
          )}
        />
      </div>
    );
  }
}

export default withStations(AddStation);
