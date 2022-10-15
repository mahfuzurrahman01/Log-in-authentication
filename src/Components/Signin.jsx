import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import app from '../firebase.init';
const auth = getAuth(app);
const Signin = () => {
    
    const [error, setError] = useState('');
    const [email,setEmail] = useState('');
    const loginHandler = event => {
        event.preventDefault()
        setError('')
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'success',
                    title: 'Signed in successfully'
                  })
            })
            .catch(error => {
                setError(error.message);
                console.log(error)
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'error',
                    title: 'Sorry wrong information'
                  })
            })
           
    }
const emailChangeHandler = (event) =>{
    const email = event.target.value;
    setEmail(email);
}

const forgotHandler = () =>{
    if(!email){
        Swal.fire({
            icon: 'error',
            text: 'Please provide a valid email!',
          })
    }
 sendPasswordResetEmail(auth,email)
    .then(()=>{
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Please check your email for reset your password!'
          })
    })
}


    return (
        <div>
            <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-600 text-white my-10 mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="my-3 text-3xl font-bold">Log in</h1>
                    <p className="text-sm dark:text-gray-400">Log in to access your account</p>
                </div>
                <form onSubmit={loginHandler} noValidate="" action="" className="space-y-12 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
                            <input onChange={emailChangeHandler} type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md text-gray-800" />
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label htmlFor="password" className="text-sm">Password</label>
                                <a onClick={forgotHandler} rel="noopener noreferrer" href="# " className="text-xs hover:underline dark:text-gray-400">Forgot password?</a>
                            </div>
                            <input type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md text-gray-800" />
                            <div className='flex justify-end'>
                                <p className='text-red-600'>{error}</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div>
                         <button type="submit" className="w-full px-8 text-center py-3 font-semibold rounded-md bg-violet-400 hover:bg-violet-500" > Log in </button>
                             
                        </div>
                        <p className="px-6 text-sm text-center dark:text-gray-400">Don't have an account yet?
                            <Link to='/signup' rel="noopener noreferrer" className="hover:underline dark:text-violet-400">register</Link>.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signin;