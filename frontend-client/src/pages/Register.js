import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { email, required } from "../modules/form/validation";
import Typography from "../modules/components/Typography";
import Snackbar from "../modules/components/Snackbar";
import AppForm from "../modules/views/AppForm";
import { Field, Form, FormSpy } from "react-final-form";
import RFTextField from "../modules/form/RFTextField";
import FormButton from "../modules/form/FormButton";
import FormFeedback from "../modules/form/FormFeedback";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../state/authSlice";
import AuthService from "../services/auth/index";

export const Register = () => {
  // there might be an email which the user began registering with
  const { state } = useLocation();
  const initialEmail = state?.initialEmail || "";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // server response error open/setOpen for snackbar
  const [content, setContent] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const [sent, setSent] = React.useState(false);

  const validate = (values) => {
    const errors = required(
      ["firstName", "lastName", "email", "password"],
      values
    );

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };

  const handleSubmit = async (values) => {
    setSent(true);

    const res = await AuthService.register({
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
    });

    if (res.status) {
      // upon success, set user, clear the form and head to home
      dispatch(login(res.user));
      navigate("/");
    } else {
      // put inside snackbar the server message
      setContent(res.responseMessage);
      setOpen(true);
      setSent(false); // allow form to be edited
    }
  };

  return (
    <React.Fragment>
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Register
          </Typography>
          <Typography
            variant="body2"
            align="center"
            onClick={() => navigate("/login")}
            sx={{ cursor: "pointer", textDecoration: "underline" }}
          >
            Already have an account?
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box
              component="form"
              onSubmit={handleSubmit2}
              noValidate
              sx={{ mt: 6 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    autoFocus
                    component={RFTextField}
                    disabled={submitting || sent}
                    autoComplete="given-name"
                    fullWidth
                    label="First name"
                    name="firstName"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={RFTextField}
                    disabled={submitting || sent}
                    autoComplete="family-name"
                    fullWidth
                    label="Last name"
                    name="lastName"
                    required
                  />
                </Grid>
              </Grid>
              <Field
                autoComplete="email"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                initialValue={initialEmail || ""}
                label="Email"
                margin="normal"
                name="email"
                required
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="new-password"
                label="Password"
                type="password"
                margin="normal"
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting || sent}
                color="secondary"
                fullWidth
              >
                {submitting || sent ? "In progress…" : "Register"}
              </FormButton>
            </Box>
          )}
        </Form>
      </AppForm>
      <Snackbar
        open={open}
        closeFunc={() => setOpen(false)}
        message={content}
      />
    </React.Fragment>
  );
};
