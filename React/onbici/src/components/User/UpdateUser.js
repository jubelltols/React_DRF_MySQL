import React from 'react'
import { useForm } from 'react-hook-form'

import { useAuth } from '../../hooks/useAuth'

export default function UpdateUser() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { updateUser, status, user } = useAuth();
    
    return (
        <div className="d-flex justify-content-center m-5">
            <div className="col-sm-8 col-md-8 col-lg-8">
                <h1 className="mb-3 text-black">Profile</h1>
                <form className="needs-validation" onSubmit={handleSubmit(updateUser)}>
                    <div className="row g-3">
                        <div className="col-sm-6">
                            <label htmlFor="firstName" className="form-label">First name</label>
                            <input className="form-control was-validated" type="text" defaultValue={user.first_name} placeholder="Adam" {...register("first_name", {required: true, maxLength: 80})} />
                            {errors.first_name && errors.first_name.type === "maxLength" && <span className="text-danger">Max length 80 characters</span> }
                            {errors.first_name?.type === 'required' && <span className="text-danger">First name is required</span>}
                        </div>

                        <div className="col-sm-6">
                            <label htmlFor="lastName" className="form-label">Last name</label>"
                            <input className="form-control" type="text"  defaultValue={user.last_name} placeholder="Robin" {...register("last_name", {required: true, maxLength: 100})} />
                            {errors.last_name && errors.last_name.type === "maxLength" && <span className="text-danger">Max length 100 characters</span> }
                            {errors.last_name?.type === 'required' && <span className="text-danger">Last name is required</span>}
                        </div>

                        <div className="col-12">
                            <label htmlFor="username" className="form-label">Username</label>
                            <div className="input-group has-validation">
                                <span className="input-group-text">@</span>
                                <input className="form-control" type="text"  defaultValue={user.username} placeholder="adam_robin" {...register("username", {required: true, minLength: 3})} />
                            </div>
                            {errors.username && errors.username.type === "minLength" && <span className="text-danger">Min length 3 characters</span> }
                            {errors.username?.type === 'required' && <span className="text-danger row">Username is required</span>}
                        </div>

                        <div className="col-12">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input className="form-control" type="text"  defaultValue={user.email} placeholder="adam_robin@example.com" {...register("email", {required: true, pattern: /\S+@\S+\.\S+/})} />
                            {errors.email && errors.email.type === "pattern" && <span className="text-danger">Entered value does not match email format</span> }
                            {errors.email?.type === 'required' && <span className="text-danger">Email is required</span>}
                            {status.error && <span className="text-danger">Some incorrect field</span>}
                        </div>
                    </div>

                    <div className="row g-3 mt-1">
                        <div className="col-12">
                            <button className="w-100 btn btn-primary btn-lg" type="submit" control-id="ControlID-20">Update profile</button>    
                        </div>
                    </div>
                </form>
            </div>    
        </div>
    );
}