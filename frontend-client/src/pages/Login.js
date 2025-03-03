import React from "react";
import Box from "@mui/material/Box";
import { email, required } from "../modules/form/validation";
import Typography from "../modules/components/Typography";
import Snackbar from "../modules/components/Snackbar";
import AppForm from "../modules/views/AppForm";
import { Field, Form, FormSpy } from "react-final-form";
import RFTextField from "../modules/form/RFTextField";
import FormButton from "../modules/form/FormButton";
import FormFeedback from "../modules/form/FormFeedback";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../state/authSlice";
import AuthService from "../services/auth/index";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // server response error open/setOpen for snackbar
  const [content, setContent] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const [sent, setSent] = React.useState(false);

  const validate = (values) => {
    const errors = required(["email", "password"], values);

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

    const res = await AuthService.login({
      email: values.email,
      password: values.password,
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
            Sign In
          </Typography>
          <Typography
            variant="body2"
            align="center"
            onClick={() => navigate("/register")}
            sx={{ cursor: "pointer", textDecoration: "underline" }}
          >
            Not a member yet? Register here
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
              <Field
                autoComplete="email"
                autoFocus
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
                size="large"
              />
              <Field
                fullWidth
                size="large"
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="current-password"
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
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting || sent ? "In progress…" : "Sign In"}
              </FormButton>
            </Box>
          )}
        </Form>
        <Snackbar
          open={open}
          closeFunc={() => setOpen(false)}
          message={content}
        />
      </AppForm>
    </React.Fragment>
  );
};
