import React, { FC } from "react";

import { Box, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { CSVLink } from "react-csv";

import FormField from "../../components/formField";
import database from "./database.json";


const useStyles = makeStyles(() => ({
  rootContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(27.1828px)",
  },
  container: {
    background: "white",
    boxShadow: "0px 15px 25px #D2CFE9",
    borderRadius: 15,
    paddingTop: 15,
    overflow: "hidden",
    width: 400,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: "20px",
    color: "#212121",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "normal",
    lineHeight: "17px",
    color: "#212121",
  },
  sectionSubTitle: {
    fontSize: 10,
    fontWeight: "bold",
    lineHeight: "12px",
    color: "#2121217F",
  },
  button: {
    background: "#33428E",
    color: "white",
    padding: "10px 100px 10px 100px",
    "&:hover": {
      opacity: 0.85,
      background: "#33428E",
      cursor: "pointer",
    },
    marginBottom: 25,
  },
  link: {
    color: "white",
  },
}));

let csvData: Array<Array<string>> = [];
const map = new Map();
const mapCSV = new Map();

const FormPage: FC = () => {
  const classes = useStyles();
  const [submitValid, setSubmitValid] = React.useState(false);
  const [initialize, setInitialize] = React.useState(false);

  React.useEffect(() => {
    {
      database.map((fieldData) => {
        if (fieldData.type !== "multi-select") {
          map.set(fieldData.id, false);
        } else {
          map.set(fieldData.id, true);
        }
      });
    }
  }, []);

  const checkSubmitValid = () => {
    for (const value of map.values()) {
      if (value === false) {
        return false;
      }
    }
    return true;
  };

  const validityChangedForm = (isValid: boolean, id: number, value: string) => {
    map.set(id, isValid);
    mapCSV.set(id, value);
    
    const check = checkSubmitValid();
    setSubmitValid(check);
    if (check) {
      csvData = [];
      const names: Array<string> = [];
      database.map((fieldData) => {
        names.push(fieldData.name);
      });

      const values: Array<string> = [];
      for (const value of mapCSV.values()) {
        values.push(value);
      }
      csvData.push(names);
      csvData.push(values);
    }
  };

  const onSubmitClick = () => {
    setInitialize(true);
  }

  return (
    <Box className={classes.rootContainer}>
      <Box className={classes.container}>
        {database.map((fieldData, index) => (
          <FormField
            key={index}
            {...fieldData}
            validityChangedForm={validityChangedForm}
            initialize={initialize}
          ></FormField>
        ))}
        <Grid
          container
          justifyContent="flex-start"
          direction="column"
          alignItems="center"
        >
          <CSVLink
            uFEFF={true}
            hidden={!submitValid}
            className={classes.button}
            data={csvData}
            filename={"submissions.csv"}
            onClick={onSubmitClick}
          >
            Submit
          </CSVLink>
        </Grid>
      </Box>
    </Box>
  );
};

export default FormPage;
