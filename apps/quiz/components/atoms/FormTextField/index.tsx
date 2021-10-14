import { FieldProps, getIn } from 'formik';
import { TextFieldProps, TextField } from '@mui/material';

/**
 * Material TextField Component with Formik Support including Errors.
 * Intended to be specified via the `component` prop in a Formik <Field> or <FastField> component.
 * Material-UI specific props are passed through.
 * https://firxworx.com/blog/coding/react/integrating-formik-with-react-material-ui-and-typescript/
 */
const FormTextField: React.FC<FieldProps & TextFieldProps> = (props) => {
  const isTouched: boolean = getIn(props.form.touched, props.field.name);
  const errorMessage: string = getIn(props.form.errors, props.field.name);

  const { error, helperText, field, form, ...rest } = props;

  return (
    <TextField
      variant="outlined"
      error={Boolean(isTouched && errorMessage)}
      helperText={(isTouched && errorMessage) ?? ''}
      margin="normal"
      {...rest}
      {...field}
    />
  );
};

export default FormTextField;
