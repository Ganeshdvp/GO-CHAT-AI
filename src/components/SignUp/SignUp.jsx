import React from 'react'
import './SignUp.css';
import {Formik, Form, Field, ErrorMessage} from 'formik';
 import * as Yup from 'yup';


export default function ({ handleClick , closeForm}) {

    const initialData = {
        email : '',
        password : '',
        confirmPassword : ''
    }

    const validate = Yup.object({
        email : Yup.string().email('Invalid email format').required('* Required this field'),
        password : Yup.string().required('* Required this feild').min(6, '* Must be 6 characters or higher'),
        confirmPassword : Yup.string().oneOf([Yup.ref('password'), null], '* Password must match').required('* Required this feild'),
    })

    const submissions = (values, {resetForm})=>{
        console.log(values);
        resetForm();
    }
    
  return (
    <>
    <div className='signup-container'>
        <div className='signup-card'>
            <h2>Sign Up</h2>
            <Formik initialValues={initialData} validationSchema={validate} onSubmit={submissions}>
                <Form className='signup-form'>
                    <label htmlFor='email'>Email : </label>
                    <Field type='email' id='email' name='email' placeholder='Enter Email'></Field>
                   <ErrorMessage name="email">
                        {(msg) => <span className='error-msg'>{msg}</span>}
                   </ErrorMessage>

                    <label htmlFor="password">Password : </label>
                    <Field type='password' id='password' name='password' placeholder='Enter password'></Field>
                    <ErrorMessage name="password">
                         {(msg) => <span className='error-msg'>{msg}</span>}
                   </ErrorMessage>

                    <label htmlFor="confirmPassword">Confirm Password : </label>
                    <Field type='password' id='confirmPassword' name='confirmPassword' placeholder='confirm password'></Field>
                    <ErrorMessage name="confirmPassword">
                         {(msg) => <span className='error-msg'>{msg}</span>}
                   </ErrorMessage>

                   <div className='signup-buttons'>
                    <button type='submit'>Register</button>
                    <button onClick={closeForm}>Close</button>
                   </div>

                   <p className='already-have-account'>Already have an account ? <span onClick={handleClick}>Sign In</span></p>

                </Form>
            </Formik>
        </div>
    </div>
    
    </>
  )
}
