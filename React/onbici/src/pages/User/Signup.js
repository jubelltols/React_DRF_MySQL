import React from "react";
import { useForm } from 'react-hook-form';

import SpinnerLoading from "../../components/Spinner/SpinnerLoading"
import { useAuth } from '../../hooks/useAuth'

export default function Signup() {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const { signup, status } = useAuth();

    return ( 
        <div>
            { status.loading ? (
                <SpinnerLoading/>
            ) : (
                <div className="d-flex justify-content-center row g-2 m-5">
                    <div className="shadow p-5 mb-5 bg-white rounded col-md-7 col-lg-8">
                        <h1 className="mb-3">Sign up</h1>
                        <form className="needs-validation" onSubmit={handleSubmit(signup)}>
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <label htmlFor="firstName" className="form-label">First name</label>
                                    <input className="form-control was-validated" type="text" placeholder="Adam" {...register("first_name", {required: true, maxLength: 80})} />
                                    {errors.first_name && errors.first_name.type === "maxLength" && <span className="text-danger">Max length 80 characters</span> }
                                    {errors.first_name?.type === 'required' && <span className="text-danger">First name is required</span>}
                                </div>

                                <div className="col-sm-6">
                                    <label htmlFor="lastName" className="form-label">Last name</label>
                                    <input className="form-control" type="text" placeholder="Robin" {...register("last_name", {required: true, maxLength: 100})} />
                                    {errors.last_name && errors.last_name.type === "maxLength" && <span className="text-danger">Max length 100 characters</span> }
                                    {errors.last_name?.type === 'required' && <span className="text-danger">Last name is required</span>}
                                </div>

                                <div className="col-12">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <div className="input-group has-validation">
                                        <span className="input-group-text">@</span>
                                        <input className="form-control" type="text" placeholder="adam_robin" {...register("username", {required: true, minLength: 3})} />
                                    </div>
                                    {errors.username && errors.username.type === "minLength" && <span className="text-danger">Min length 3 characters</span> }
                                    {errors.username?.type === 'required' && <span className="text-danger row">Username is required</span>}
                                </div>

                                <div className="col-12">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input className="form-control" type="text" placeholder="adam_robin@example.com" {...register("email", {required: true, pattern: /\S+@\S+\.\S+/})} />
                                    {errors.email && errors.email.type === "pattern" && <span className="text-danger">Entered value does not match email format</span> }
                                    {errors.email?.type === 'required' && <span className="text-danger">Email is required</span>}
                                </div>

                                <div className="col-12">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input className="form-control" type="password" placeholder="********" {...register("password", {required: true, minLength: 8})} />
                                    {errors.password && errors.password.type === "minLength" && <span className="text-danger">Min length 8 characters</span> }
                                    {errors.password?.type === 'required' && <span className="text-danger">Password is required</span>}
                                </div>

                                <div className="col-12">
                                    <label htmlFor="password2" className="form-label">Password2</label>
                                    <input className="form-control" type="password" placeholder="********" {...register("password2", 
                                    {required: true, minLength: 8, validate:{matchesPreviousPassword: (value) => { 
                                    return value === getValues("password") || "Password don't match";}}})} />
                                    {errors.password2 && errors.password2.type === "minLength" && <span className="text-danger">Min length 8 characters</span> }
                                    {errors.password2?.type === 'matchesPreviousPassword' && <span className="text-danger">{errors.password2.message}</span>}
                                    {errors.password2?.type === 'required' && <span className="text-danger">Password2 is required</span>}
                                </div>
                            </div>

                            <hr className="my-4"/>

                            <div className="row g-3">
                                <div className="col-12">
                                    <button className="w-100 btn btn-primary btn-lg" type="submit" control-id="ControlID-20">Sign up</button>    
                                    <button
                                        type="button"
                                        onClick={() => {
                                        alert(JSON.stringify(getValues(["password", "password2"])));
                                        }}
                                    ></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                )
            }
        </div>
    )
}