import React from 'react'
import { useForm } from 'react-hook-form'

import { useBikes } from '../../hooks/useBikes'

export default function BikesCreate() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { createBike } = useBikes()

    return (
        <section className="min-h-screen base-content">
            <div className="flex flex-col items-center justify-center max-w-5xl mx-auto lg:py-16 px-6 py-8">
                <div className="grid grid-cols-3 mb-3 self-start">
                    <div className="col-span-2">
                        <p className="mb-4 text-4xl font-bold text-base-100">Create Bikes</p>
                    </div>
                </div>
                <div className="w-full bg-base-100 rounded-lg shadow">
                    <div className="p-16 sm:p-10 space-y-4 md:space-y-6">
                        <form className="space-y-4 md:space-y-6 needs-validation" onSubmit={handleSubmit(createBike)}>
                            <div>
                                <label htmlFor="status" className="block mb-2 text-sm font-medium">Status</label>
                                <select className='border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ' {...register("status", { required: true })}>
                                    <option value="active">active</option>
                                    <option value="disable">disable</option>
                                </select>
                                {errors.status?.type === 'required' && <span>Status is required</span>}
                            </div>
                            <p className="text-sm font-light pt-2">
                                <button className="w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary text-base-100" type="submit" control-id="ControlID-20">Create bike</button>    
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}