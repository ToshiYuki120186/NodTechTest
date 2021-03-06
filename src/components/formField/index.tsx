import React, { FC } from "react";

import {
  TextField,
  Tooltip,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import validator from "validator";

export interface Props {
  type: string;
  id: number;
  name: string;
  description?: string;
  options?: Array<string>;
  initialize: boolean;
  validityChangedForm: (isValid: boolean, id: number, value: string) => void;
}

const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: 20,
    width: 350,
  },
  formControl: {
    margin: theme.spacing(3),
    width: 350,
  },
}));

const optionCheckArray: Array<boolean> = [];

const FormField: FC<Props> = (props) => {
  const {
    type,
    id,
    name,
    description,
    options,
    initialize,
    validityChangedForm,
  } = props;

  const classes = useStyles();
  
  options?.map(() => {
    optionCheckArray.push(false);
  });
  const [optionChecks, setOptionChecks] = React.useState(optionCheckArray);
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    {
      setValue("");
      setOptionChecks(optionCheckArray);
    }
  }, [initialize]);

  const hasDescription = description !== undefined;

  const errorText = () => {
    if (error) {
      switch (type) {
        case "short-text":
          return "Name is invalid";
        case "date":
          return "yyyy/dd/mm";
        case "email":
          return "Email is invalid";
        case "phone-number":
          return "xxx-xxx-xxxx";
        default:
          return "";
      }
    }
  };

  const checkValidate = (value: string) => {
    let error = false;
    if (type === "short-text") {
      error = value === "" || !validator.isAlpha(value);
    } else if (type === "date") {
      error = value === "" || !validator.isDate(value);
    } else if (type === "email") {
      error = value === "" || !validator.isEmail(value);
    } else if (type === "phone-number") {
      //eslint-disable-next-line
      const phoneRegEx = RegExp(
        /^[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{4,6}$/im
      );
      const ismatch = value.match(phoneRegEx);
      error = value === "" || ismatch === null;
    }
    validityChangedForm(!error, id, value);
    setError(error);
  };

  const editChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    checkValidate(event.target.value);
  };

  const checkFormSelectionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const id = parseInt(event.target.id);

    const optionIndexTemp: Array<boolean> = [];
    options?.map((_option, idx) => {
      if (idx === id) {
        optionIndexTemp.push(!optionChecks[idx]);
      } else {
        optionIndexTemp.push(optionChecks[idx]);
      }
    });

    setOptionChecks(optionIndexTemp);
    const checkedArray: Array<string> = [];
    options?.map((option, index) => {
      if (optionIndexTemp[index] == true) {
        checkedArray.push(option);
      }
    });
    validityChangedForm(true, id, checkedArray.toString());
  };

  const inputField = () =>
    type !== "multi-select" ? (
      <TextField
        value={value}
        className={classes.textField}
        error={error}
        id="filled-error-helper-text"
        label={name}
        helperText={errorText()}
        variant="filled"
        onChange={editChanged}
      />
    ) : (
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">{name}</FormLabel>
        <FormGroup>
          {options?.map((option, index) => (
            <FormControlLabel
              control={
                <Checkbox
                  id={`${index}`}
                  checked={optionChecks[index]}
                  onChange={checkFormSelectionChange}
                  name="gilad"
                />
              }
              label={option}
            />
          ))}
        </FormGroup>
      </FormControl>
    );

  return (
    <Grid
      container
      justifyContent="flex-start"
      direction="column"
      alignItems="center"
    >
      {hasDescription ? (
        <Tooltip title={description ?? ""} arrow placement="right-start">
          {inputField()}
        </Tooltip>
      ) : (
        inputField()
      )}
    </Grid>
  );
};

export default FormField;
