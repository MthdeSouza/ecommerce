import React from "react";
import { TextField, Grid } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";

const FormInput = ({ name, label }) => {
  const { control } = useFormContext();
  const isError = false;

  return (
    <>
      <Controller
        control={control}
        name={name}
        error={isError}
        defaultValue=""
        render={({ field }) => (
          <Grid item xs={12} sm={6}>
            <TextField {...field} fullWidth label={label} required />
          </Grid>
        )}
      />
    </>
  );
};

export default FormInput;
