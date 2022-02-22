import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from "react-router-dom"

import { useStations } from '../../hooks/useStations'

export default function StationsUpdate() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { stations, updateStation, isCorrect } = useStations();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {    
        if (isCorrect) {
            navigate('/stations');
        }
    }, [isCorrect]);

    return (
        <div className="d-flex justify-content-center m-5">
            <div className="col-sm-8 col-md-8 col-lg-8">
                <h1 className="mb-3 text-black">Update Station</h1>
                <form className="needs-validation" onSubmit={handleSubmit(data => updateStation(id, data))}>
                    {stations.map(( station, index ) => (
                        Number(station.id) === Number(id) ?
                            <>
                                <div className="row g-3">
                                    <div className="col-sm-12">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input className="form-control" type="text" defaultValue={station.name} placeholder="Name" {...register("name", {required: true, maxLength: 80})} />
                                        {errors.name?.type === 'required' && <span className="text-danger">Name is required</span>}
                                        {errors.name && errors.name.type === "maxLength" && <span className="text-danger">Max length 80 characters</span> }
                                    </div>
                                    <div className="col-sm-12">
                                        <label htmlFor="status" className="form-label">Status</label>
                                        <select className="form-select" defaultValue={station.status} {...register("status", { required: true })}>
                                            <option value="active">active</option>
                                            <option value="disable">disable</option>
                                        </select>
                                        {errors.status?.type === 'required' && <span className="text-danger">Status is required</span>}
                                    </div>
                                    <div className="col-sm-12">
                                        <label htmlFor="image" className="form-label">Image</label>
                                        <input className="form-control" type="file" placeholder="Image" {...register("image", {})} />
                                    </div>
                                    <div className="col-sm-12">
                                        <label htmlFor="latitude" className="form-label">Latitude</label>
                                        <input className="form-control" type="latitude"  defaultValue={station.latitude} placeholder="Latitude" {...register("latitude", {required: true})} />
                                        {errors.latitude?.type === 'required' && <span className="text-danger">Latitude is required</span>}
                                    </div>
                                    <div className="col-sm-12">
                                        <label htmlFor="longitude" className="form-label">Longitude</label>
                                        <input className="form-control" type="longitude"  defaultValue={station.longitude} placeholder="Longitude" {...register("longitude", {required: true})} />
                                        {errors.longitude?.type === 'required' && <span className="text-danger">Longitude is required</span>}
                                    </div>
                                </div>
                            </>
                        : ""
                    ))}
                    <div className="row g-3 mt-1">
                        <div className="col-12">
                            <button className="w-100 btn btn-primary btn-lg" type="submit" control-id="ControlID-20">Create</button>    
                        </div>
                    </div>
                </form>
            </div>    
        </div>
    );
}