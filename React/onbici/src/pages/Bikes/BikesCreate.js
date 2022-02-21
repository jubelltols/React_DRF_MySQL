import React from 'react'
import { useForm } from 'react-hook-form'

import { useBikes } from '../../hooks/useBikes'

export default function BikesCreate() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { createBike } = useBikes()

    return (
        <div className="d-flex justify-content-center m-5">
            <div className="col-sm-5 col-md-5 col-lg-5">
                <h1 className="mb-3 text-black">Create bikes</h1>
                <form className="needs-validation" onSubmit={handleSubmit(createBike)}>
                    <div className="row g-3">
                        <div className="col-sm-12">
                            <label htmlFor="status" className="form-label">Status</label>
                            <select className='form-select' {...register("status", { required: true })}>
                                <option value="active">active</option>
                                <option value="disable">disable</option>
                            </select>
                            {errors.status?.type === 'required' && <span>Status is required</span>}
                        </div>
                    </div>

                    <div className="row g-3 mt-1">
                        <div className="col-12">
                            <button className="w-100 btn btn-primary btn-lg" type="submit" control-id="ControlID-20">Create bike</button>    
                        </div>
                    </div>
                </form>
            </div>    
        </div>
    );
}