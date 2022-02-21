import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from "react-router-dom";

import { useIncidences } from '../../hooks/useIncidences'

export default function IncidencesCreate() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createIncidence } = useIncidences();
    const { id } = useParams();

    return (
        <div className="d-flex justify-content-center m-5">
            <div className="col-sm-5 col-md-5 col-lg-5">
                <h1 className="mb-3 text-black">Create incidences</h1>
                <form onSubmit={handleSubmit(handleSubmit(createIncidence))}>
                    <div className="row g-3">
                        {id === "null" ?
                            <div className="col-sm-12">
                                <label htmlFor="status" className="form-label">station</label>
                                <input className="form-control" type="number" placeholder="station" {...register("station", {required: true})} />
                                {errors.station?.type === 'required' && <span className="text-danger">Station is required</span>}
                            </div>
                            :
                            <div className="col-sm-12 d-none">
                                <label htmlFor="status" className="form-label">station</label>
                                <input className="form-control" type="number" defaultValue={id} placeholder="station" {...register("station", {required: true})} />
                                {errors.station?.type === 'required' && <span className="text-danger">Station is required</span>}
                            </div>
                        }
                    </div>
                    <div className="row g-3 mt-1">
                        <div className="col-sm-12">
                            <label htmlFor="status" className="form-label">Title</label>
                            <input className="form-control" type="text" placeholder="title" {...register("title", {required: true, maxLength: 50, minLength: 5})} />
                            {errors.title && errors.title.type === "mminLength" && <span className="text-danger">Min length 5 characters</span> }
                            {errors.title && errors.title.type === "maxLength" && <span className="text-danger">Max length 200 characters</span> }
                            {errors.title?.type === 'required' && <span className="text-danger">Title is required</span>}
                        </div>
                    </div>
                    <div className="row g-3 mt-1">
                        <div className="col-sm-12">
                        <label htmlFor="status" className="form-label">Description</label>
                            <input className="form-control" type="text" placeholder="description" {...register("description", {required: true, maxLength: 198, minLength: 5})} />
                            {errors.description && errors.description.type === "mminLength" && <span className="text-danger">Min length 5 characters</span> }
                            {errors.description && errors.description.type === "maxLength" && <span className="text-danger">Max length 200 characters</span> }
                            {errors.description?.type === 'required' && <span className="text-danger">Description is required</span>}
                        </div>
                    </div>
                    <div className="row g-3 mt-1">
                        <div className="col-12">
                            <button className="w-100 btn btn-primary btn-lg" type="submit" control-id="ControlID-20">Create incidences</button>    
                        </div>
                    </div>
                </form>
            </div>    
        </div>
    );
}