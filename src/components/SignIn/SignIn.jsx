import React from 'react';
import './SignIn.css'
import {Formik, Form, Field, ErrorMessage} from 'formik';
 import * as Yup from 'yup';

export default function SignIn({handleClick , closeForm}) {

   const initialData = {
          email : '',
          password : '',
      }
  
      const validate = Yup.object({
          email : Yup.string().email('Invalid email format').required('* Required this field'),
          password : Yup.string().required('* Required this feild').min(6, '* Must be 6 characters or higher'),
      })
  
      const submissions = (values, {resetForm})=>{
          console.log(values);
          resetForm();
          closeForm()
      }


  return (
    <>
    <div className='signin-container'>
            <div className='signin-card'>
                <h2>Sign In</h2>
                <Formik initialValues={initialData} validationSchema={validate} onSubmit={submissions}>
                    <Form className='signin-form'>
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
    
    
                       <div className='signin-buttons'>
                        <button type='submit'>Login</button>
                        <button onClick={closeForm}>Close</button>
                       </div>
    
                       <p className='dont-have-account'>Don't have an account ? <span onClick={handleClick}>Sign Up</span></p>
    
                    </Form>
                </Formik>
            </div>
        </div>
    </>
  )
}
