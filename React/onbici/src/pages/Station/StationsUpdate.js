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
        <section className="min-h-screen bg-gray-900">
            <div className="flex flex-col items-center justify-center max-w-5xl mx-auto lg:py-16 px-6 py-8">
                <div className="grid grid-cols-3 mb-3 self-start">
                    <div className="col-span-2">
                        <p className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">Update Station</p>
                    </div>
                </div>
                <div className="w-full bg-base-100 rounded-lg shadow">
                    <div className="p-16 sm:p-10 space-y-4 md:space-y-6">
                        <form className="space-y-4 md:space-y-6 needs-validation" onSubmit={handleSubmit(data => updateStation(id, data))}>
                            {stations.map(( station, index ) => (
                                    station.id.toString() === id ?
                                    <>
                                        <div>
                                            <label htmlFor="name" className="block mb-2 text-sm font-medium">Name</label>
                                            <input className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " defaultValue={station.name} type="text" placeholder="Name" {...register("name", {required: true, maxLength: 80})} />
                                            {errors.name?.type === 'required' && <span className="text-danger">Name is required</span>}
                                            {errors.name && errors.name.type === "maxLength" && <span className="text-danger">Max length 80 characters</span> }
                                        </div>
                                        <div>
                                            <label htmlFor="status" className="block mb-2 text-sm font-medium">Status</label>
                                            <select className='border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ' defaultValue={station.status} {...register("status", { required: true })}>
                                                <option value="active">active</option>
                                                <option value="disable">disable</option>
                                            </select>
                                            {errors.status?.type === 'required' && <span>Status is required</span>}
                                        </div>
                                        <div>
                                            <label htmlFor="image" className="block mb-2 text-sm font-medium">Image</label>
                                            <input className="file-input file-input-bordered border sm:text-sm rounded-lg block w-full" type="file" placeholder="Image" {...register("image", {required: true})} />
                                            {errors.image?.type === 'required' && <span className="text-danger">Image is required</span>}
                                        </div>
                                        <div>
                                            <label htmlFor="latitude" className="block mb-2 text-sm font-medium">Latitude</label>
                                            <input className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " defaultValue={station.latitude} type="latitude" placeholder="Latitude" {...register("latitude", {required: true})} />
                                            {errors.latitude?.type === 'required' && <span className="text-danger">Latitude is required</span>}
                                        </div>
                                        <div>
                                            <label htmlFor="longitude" className="block mb-2 text-sm font-medium">Longitude</label>
                                            <input className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " defaultValue={station.longitude} type="longitude" placeholder="Longitude" {...register("longitude", {required: true})} />
                                            {errors.longitude?.type === 'required' && <span className="text-danger">Longitude is required</span>}
                                        </div>
                                        <p className="text-sm font-light pt-2">
                                            <button className="w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary text-base-100" type="submit" control-id="ControlID-20">Update stations</button>    
                                        </p>
                                    </>
                                    : ""
                                ))}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}