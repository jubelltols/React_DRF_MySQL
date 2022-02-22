import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from "react-router-dom";

import { useIncidences } from '../../hooks/useIncidences'

export default function IncidencesUpdate() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { incidences, updateIncidence } = useIncidences()
    const { id } = useParams()

    return (
        <div className="d-flex justify-content-center m-5">
            <div className="col-sm-5 col-md-5 col-lg-5">
                <h1 className="mb-3 text-black">Update incidences</h1>
                <form className="needs-validation" onSubmit={handleSubmit(data => updateIncidence(id, data))}>
                    {incidences.map(( incidence, index ) => (
                        Number(incidence.id) === Number(id) ?
                        <>
                            <div className="row g-3 mt-1">
                                <div className="col-sm-12">
                                    <label htmlFor="status" className="form-label">station</label>
                                    <input className="form-control" type="number" disabled defaultValue={incidence.id} placeholder="station" />
                                    {errors.station?.type === 'required' && <span className="text-danger">Station is required</span>}
                                </div>
                            </div>
                            <div className="row g-3 mt-1">
                                <div className="col-sm-12">
                                    <label htmlFor="status" className="form-label">Title</label>
                                    <input className="form-control" type="text" placeholder="title" disabled defaultValue={incidence.title} />
                                    {errors.title && errors.title.type === "mminLength" && <span className="text-danger">Min length 5 characters</span> }
                                    {errors.title && errors.title.type === "maxLength" && <span className="text-danger">Max length 200 characters</span> }
                                    {errors.title?.type === 'required' && <span className="text-danger">Title is required</span>}
                                </div>
                            </div>
                            <div className="row g-3 mt-1">
                                <div className="col-sm-12">
                                    <label htmlFor="status" className="form-label">Description</label>
                                    <input className="form-control" type="text" disabled defaultValue={incidence.description} placeholder="description" />
                                    {errors.description && errors.description.type === "mminLength" && <span className="text-danger">Min length 5 characters</span> }
                                    {errors.description && errors.description.type === "maxLength" && <span className="text-danger">Max length 200 characters</span> }
                                    {errors.description?.type === 'required' && <span className="text-danger">Description is required</span>}
                                </div>
                            </div>
                        </>
                        : ""
                    ))}
                    <div className="row g-3 mt-1">
                        <div className="col-sm-12">
                            <label htmlFor="status" className="form-label">Status</label>
                            <input className="form-control" type="text" placeholder="status" {...register("status", {required: true, maxLength: 50, minLength: 4})} />
                            {errors.status && errors.status.type === "mminLength" && <span className="text-danger">Min length 4 characters</span> }
                            {errors.status && errors.status.type === "maxLength" && <span className="text-danger">Max length 200 characters</span> }
                            {errors.status?.type === 'required' && <span className="text-danger">Status is required</span>}
                        </div>
                    </div>
                    <div className="row g-3 mt-1">
                        <div className="col-sm-12">
                            <label htmlFor="status" className="form-label">Solution</label>
                            <input className="form-control" type="text" placeholder="solution" {...register("solution", {required: true, maxLength: 198, minLength: 5})} />
                            {errors.solution && errors.solution.type === "mminLength" && <span className="text-danger">Min length 5 characters</span> }
                            {errors.solution && errors.solution.type === "maxLength" && <span className="text-danger">Max length 200 characters</span> }
                            {errors.solution?.type === 'required' && <span className="text-danger">Solution is required</span>}
                        </div>
                    </div>
                    <div className="row g-3 mt-1">
                        <div className="col-12">
                            <button className="w-100 btn btn-primary btn-lg" type="submit" control-id="ControlID-20">Update incidences</button>    
                        </div>
                    </div>
                </form>
            </div>    
        </div>
    );
}