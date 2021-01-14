import React from "react";
import Joi from "joi-browser";
import FormComponent from '../Form/form';
import { Form, Grid, Header, Segment } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import userService from '../../services/userService';

export class Login extends FormComponent {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email")
      .error(() => {
        return {
          message: "Email must be a valid",
        };
      }),
    password: Joi.string()
      .required()
      .min(6)
      .label("Password")
      .error(() => {
        return {
          message: "Password must be at least 6 characters",
        };
      }),
  };

  doSubmit = async () => {
    const { email, password } = this.state.data;

    try {
      await userService.login(email, password);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ errors: { email: ex.response.data } });
      }
    }
  };

  render() {
    if (userService.getUser()) return <Redirect to="/" />;
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Login to Tasko
          </Header>
          <Form size="large" onSubmit={this.handleSubmit} autoComplete="off">
            <Segment stacked>
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password")}
            </Segment>
            {this.renderButton("Sign In")}
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
};

