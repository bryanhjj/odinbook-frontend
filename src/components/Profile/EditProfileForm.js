import React from "react";
// formik seems interesting, will try it out for this part
import { useFormik, Formik, Field, Form, ErrorMessage } from 'formik';

// mui setup
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
// can consider using Yup to help with validation 
const validate = values => {
    const errors = {};
    if (!values.first_name) {
        errors.first_name = 'Required';
    }

    if (!values.last_name) {
        errors.last_name = 'Required';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    return errors;
};

const EditProfileForm = ({user, toggleEditProfile, handleProfileUpdate}) => {
    return (
        <div>
            <Typography variant="h5">Edit profile</Typography>
            <Formik
                initialValues={{
                    first_name:user.first_name, 
                    last_name:user.last_name, 
                    email:user.email, 
                    phone_number:user.phone_number
                }}
                // might have to use Yup schema for this since the documentation doesn't show how w/o validationSchema
                validationSchema={validate}
                onSubmit={(values) => {
                    handleProfileUpdate(values);
                    toggleEditProfile();
                }}
            >
                {formik => (
                    <Form>
                        <TextField
                            variant="outlined"
                            id="first_name"
                            name="first_name"
                            label="First name"
                            type="text"
                            required={true}
                            {...formik.getFieldProps('first_name')}
                        />
                        <ErrorMessage name="first_name" />

                        <TextField
                            variant="outlined"
                            id="last_name"
                            name="last_name"
                            label="Last name"
                            type="text"
                            required={true}
                            {...formik.getFieldProps('last_name')}
                        />
                        <ErrorMessage name="last_name" />

                        <TextField
                            variant="outlined"
                            id="email"
                            name="email"
                            label="E-mail"
                            type="email"
                            required={true}
                            {...formik.getFieldProps('email')}
                        />
                        <ErrorMessage name="email" />

                        <TextField
                            variant="outlined"
                            id="phone_number"
                            name="phone_number"
                            label="Phone number"
                            type="number"
                            required={true}
                            {...formik.getFieldProps('phone_number')}
                        />
                        <ErrorMessage name="phone_number" />
                        <Button variant="contained" type="submit" onClick={Formik.handleSubmit}>Confirm changes</Button>
                        <Button variant="contained" type="reset" onClick={toggleEditProfile}>Cancel</Button> 
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EditProfileForm;