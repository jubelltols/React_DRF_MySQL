import React from 'react'
import { useForm } from 'react-hook-form'

import SpinnerLoading from '../Spinner/SpinnerLoading'
import { useAuth } from '../../hooks/useAuth'

export default function ChangePassword() {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm()
    const { changePassword, status } = useAuth()

    return (
        <div>
            { status.loading ? (
                <SpinnerLoading/>
            ) : (
                <div className="d-flex justify-content-center m-5">
                    <div className="col-sm-8 col-md-8 col-lg-8">
                        <h1 className="mb-3 text-black">Update Password</h1>
                        <form className="needs-validation" onSubmit={handleSubmit(changePassword)}>
                        <div className="row g-3">
                                <div className="col-sm-12">
                                    <label htmlFor="password" className="form-label">Old Password</label>
                                    <input className="form-control" type="password" placeholder="Old Password" {...register("old_password", {required: true, minLength: 8})} />
                                    {errors.old_password?.type === 'required' && <span className="text-danger">Old Password is required</span>}
                                    {errors.old_password && errors.old_password.type === "minLength" && <span className="text-danger">Min length 8 characters</span> }
                                    {status.error && <span className="text-danger">Old password incorrect</span>}
                                </div>
                                <div className="col-sm-12">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input className="form-control" type="password" placeholder="Password" {...register("password", {required: true, minLength: 8})} />
                                    {errors.password?.type === 'required' && <span className="text-danger">Old Password is required</span>}
                                    {errors.password && errors.password.type === "minLength" && <span className="text-danger">Min length 8 characters</span> }
                                </div>
                                <div className="col-sm-12">
                                    <label htmlFor="password" className="form-label">Repeat Password</label>
                                    <input className="form-control" type="password" placeholder="Repeat Password" {...register("password2", {required: true, minLength: 8,
                                    validate:{matchesPreviousPassword: (value) => { return value === getValues("password") || "Password don't match";}}})} />
                                    {errors.password2?.type === 'required' && <span className="text-danger">Old Password is required</span>}
                                    {errors.password2 && errors.password.type === "minLength" && <span className="text-danger">Min length 8 characters</span> }
                                    {errors.password2?.type === 'matchesPreviousPassword' && <span className="text-danger">{errors.password2.message}</span>}
                                </div>
                            </div>

                            <div className="row g-3 mt-1">
                                <div className="col-12">
                                    <button className="w-100 btn btn-primary btn-lg" type="submit" control-id="ControlID-20">Change Password</button>    
                                </div>
                            </div>
                        </form>
                    </div>    
                </div>
                )
            }
        </div>
    );
}