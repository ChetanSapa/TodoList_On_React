import React from 'react'
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "./authReducer";
import {AppRootStateType} from "../../app/store";
import { Redirect } from 'react-router-dom';

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}


export const Login = () => {

    const dispatch = useDispatch();

    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required email';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required password';
            } else if (values.password.length < 3) {
                errors.password = 'Invalid password';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    })

    if(isLoggedIn) {
        return <Redirect to={'/'}/>
    }

    return <Grid container justify="center">
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}>here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>

                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            // name='email'
                            // onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            // value={formik.values.email}
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email &&
                        <div style={{color: 'red'}}>{formik.errors.email}</div>}
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            // name='password'
                            // onChange={formik.handleChange}
                            // onBlur={formik.handleBlur}
                            // value={formik.values.password}
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password &&
                        <div style={{color: 'red'}}>{formik.errors.password}</div>}
                        <FormControlLabel
                            label={'Remember me'}
                            control={
                                <Checkbox
                                    // onChange={formik.handleChange}
                                    // checked={formik.values.rememberMe}
                                    // name='rememberMe'
                                    {...formik.getFieldProps('rememberMe')}
                                />}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}
