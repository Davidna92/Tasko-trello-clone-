import React from 'react';
import Joi from 'joi-browser';
// import { Redirect } from 'react-router-dom';
import http from '../../services/httpService';
import { API_URL } from '../../config.json';
import { Form, Grid, Header, Segment } from 'semantic-ui-react';
import FormComponent from '../Form/form';


export class Signup extends FormComponent {

    state = {
        data: {
            name: '',
            password: '',
            email: '',
        },
        errors: {}
    }

    schema = {
        email: Joi.string().required().email().error(() => {
            return {
                message: 'Email is not valid',
            };
        }),
        name: Joi.string().required().min(2).error(() => {
            return {
                message: 'Name is not valid'
            };
        }),
        password: Joi.string().required().min(6).error(() => {
            return {
                message: 'Password is not valid'
            };
        })
    };

    doSubmit = async () => {
        const data = { ...this.state.data };
        console.log(data);
        try {
            await http.post(`${API_URL}/users`, data);
            this.props.history.replace('/login');
        } catch (err) {
            if (err.response && err.response.status === 400) {
                this.setState({ errors: { email: "Email is already in use" } });
            }
        }
    }

    render() {
        // if (userService.getCurrentUser()) return <Redirect to="/"/>

        return (
            <Grid
                textAlign="center"
                style={{ height: "100vh" }}
                verticalAlign="middle"
            >
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" color="teal" textAlign="center">
                        Signup New Account In Trello
                    </Header>
                    <Form size="large" onSubmit={this.handleSubmit} autoComplete="off">
                        <Segment stacked>
                            {this.renderInput("email", "Email")}
                            {this.renderInput("name", "Name")}
                            {this.renderInput("password", "Password")}
                        </Segment>
                        {this.renderButton('Signup')}
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }

}


