import React from "react";
// formik seems interesting, will try it out for this part
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// mui setup
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
// can consider using Yup to help with validation 
/*
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
*/

const ValidateSchema = Yup.object({
    first_name: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
    last_name: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
});

const EditProfileForm = ({user, toggleEditProfile, handleProfileUpdate}) => {
    return (
        <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
            <Typography variant="h5">
                Edit profile
            </Typography>
            <Formik
                initialValues={{
                    first_name: user.first_name, 
                    last_name: user.last_name, 
                    email: user.email, 
                    phone_number: user.phone_number
                }}
                validationSchema={ValidateSchema}
                onSubmit={(values) => {
                    handleProfileUpdate(values);
                    toggleEditProfile();
                }}
            >
                {formik => (
                    <Form>
                        <TextField 
                            sx={{marginTop: '8px'}}
                            variant="outlined"
                            id="first_name"
                            name="first_name"
                            label="First name"
                            type="text"
                            {...formik.getFieldProps('first_name')}
                        />
                        <ErrorMessage name="first_name" />

                        <TextField
                            sx={{marginTop: '8px'}}
                            variant="outlined"
                            id="last_name"
                            name="last_name"
                            label="Last name"
                            type="text"
                            {...formik.getFieldProps('last_name')}
                        />
                        <ErrorMessage name="last_name" />

                        <TextField
                            sx={{marginTop: '8px'}}
                            variant="outlined"
                            id="email"
                            name="email"
                            label="E-mail"
                            type="email"
                            {...formik.getFieldProps('email')}
                        />
                        <ErrorMessage name="email" />

                        <TextField
                            sx={{marginTop: '8px'}}
                            variant="outlined"
                            id="phone_number"
                            name="phone_number"
                            label="Phone number"
                            type="number"
                            {...formik.getFieldProps('phone_number')}
                        />
                        <ErrorMessage name="phone_number" />
                        <Button variant="contained" type="submit" sx={{margin: '10px 10px'}} onClick={Formik.handleSubmit}>Confirm changes</Button>
                        <Button variant="contained" type="reset" sx={{margin: '10px 10px'}} onClick={toggleEditProfile}>Cancel</Button> 
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default EditProfileForm;