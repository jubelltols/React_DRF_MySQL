import React from 'react'
import { useForm } from 'react-hook-form'

import { useBikes } from '../../hooks/useBikes'
import { useParams } from "react-router-dom"

export default function BikesUpdate({ bike }) {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { updateBike } = useBikes()
    const { id } = useParams()
    
    return (
        <div className="d-flex justify-content-center m-5">
            <div className="shadow p-5 mb-5 bg-white rounded col-sm-5 col-md-5 col-lg-5">
                <h1 className="mb-3 text-black">Update bikes</h1>
                <form className="needs-validation" onSubmit={handleSubmit(data => updateBike(id, data))}>
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
                            <button className="w-100 btn btn-primary btn-lg" type="submit" control-id="ControlID-20">Update bike</button>    
                        </div>
                    </div>
                </form>
            </div>    
        </div>
    );
}