import React from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from "react-router-dom"

import { useSlot } from '../../hooks/useSlot'
import { useBikes } from '../../hooks/useBikes'
import { useStations } from '../../hooks/useStations'

export default function SlotUpdate() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { slot, updateSlot } = useSlot()
    const { bikes } = useBikes()
    const { stations } = useStations()
    const { id } = useParams();

    return (
        <div className="d-flex justify-content-center m-5">
            <div className="col-sm-5 col-md-5 col-lg-5">
                <h1 className="mb-3 text-black">Update Slot</h1>
                <form className="needs-validation" onSubmit={handleSubmit(data => updateSlot(id, data))}>
                    {slot.map(( slot, index ) => (
                        Number(slot.id) === Number(id) ?
                            <>
                                <div className="row g-3">
                                    <div className="col-sm-12">
                                        <label htmlFor="status" className="form-label">Station</label>
                                        <select className='form-select' defaultValue={slot.station} {...register("station", { required: true })}>
                                            {stations.map(( station, index ) => (
                                                <option value={station.id}>{station.id}: {station.name}</option>
                                            ))}
                                        </select>
                                        {errors.status?.type === 'required' && <span>Station is required</span>}
                                    </div>
                                    <div className="col-sm-12">
                                        <label htmlFor="status" className="form-label">Bike</label>
                                        <select className='form-select' defaultValue={slot.bike.id} {...register("bike", { required: true })}>
                                            <option value={null}>null</option>
                                            {bikes.map(( bike, index ) => (
                                                <option value={bike.id}>{bike.id}</option>
                                            ))}
                                        </select>
                                        {errors.status?.type === 'required' && <span>Bike is required</span>}
                                    </div>
                                    <div className="col-sm-12">
                                        <label htmlFor="status" className="form-label">Status</label>
                                        <select className='form-select' defaultValue={slot.status} {...register("status", { required: true })}>
                                            <option value="active">active</option>
                                            <option value="disable">disable</option>
                                        </select>
                                        {errors.status?.type === 'required' && <span>Status is required</span>}
                                    </div>
                                </div>
                            </>
                        : ""
                    ))}
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