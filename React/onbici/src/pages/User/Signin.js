import React from "react";
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'

import SpinnerLoading from "../../components/Spinner/SpinnerLoading"
import { useAuth } from '../../hooks/useAuth'

export default function Signin() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signin, status } = useAuth();

    return (
        <div>
            { status.loading ? (
                <SpinnerLoading/>
            ) : (
                <div className="d-flex justify-content-center m-5">
                    <div className="shadow p-5 mb-5 bg-white rounded col-sm-5 col-md-5 col-lg-5">
                        <h1 className="mb-3 text-black">Sign in</h1>
                        <form className="needs-validation" onSubmit={handleSubmit(signin)}>
                            <div className="row g-3">
                                <div className="col-sm-12">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input className="form-control" type="text" placeholder="Username" {...register("username", {required: true})} />
                                    {errors.username?.type === 'required' && <span className="text-danger">Username is required</span>}
                                </div>

                                <div className="col-sm-12">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input className="form-control" type="password" placeholder="Password" {...register("password", {required: true, minLength: 8})} />
                                    {errors.password && errors.password.type === "minLength" && <span className="text-danger">Min length 8 characters</span> }
                                    {errors.password?.type === 'required' && <span className="text-danger">Password is required</span>}
                                    {status.error && <span className="text-danger">Incorrect User or Password</span>}
                                </div>
                            </div>

                            <div className="row g-3 mt-1">
                                <div className="col-12">
                                    <button className="w-100 btn btn-primary btn-lg" type="submit" control-id="ControlID-20">Sign in</button>    
                                </div>
                                <p className="text-center">¿No tiene una cuenta? <Link to="/signup" className="text-blue">Crea una.</Link></p>
                            </div>
                        </form>
                    </div>    
                </div>
                )
            }
        </div>
    );
}