import React from 'react';
import { useForm } from "react-hook-form";
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Loading from '../loading';

const AddDoctor = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const { data: services, isLoading } = useQuery('services', () => fetch('https://fathomless-fortress-56517.herokuapp.com/service').then(res => res.json()))

    const imageStorageKey = '385540456a6bfe6813049436bb5594a1';
    const onSubmit = async data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const img = result.data.url;
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        specialty: data.specialty,
                        img: img
                    }
                    // send to your db
                    fetch('https://fathomless-fortress-56517.herokuapp.com/doctor', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(doctor)
                    }).then(res => res.json()).then(inserted => {
                        if (inserted.insertedId) {
                            toast.success('doctor added successfully');
                            reset()
                        } else {
                            toast.error('failed to add doctor')
                        }
                    })

                }
                console.log(result)
            })
    };
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h3 className="text-3xl">Add new doctor</h3>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input

                        type="text"
                        placeholder="name..."
                        className="input input-bordered w-full max-w-xs"
                        {...register("name", {
                            required: {
                                value: true,
                                message: "name is required"
                            }
                        })}
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                    </label>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input

                        type="email"
                        placeholder="email..."
                        className="input input-bordered w-full max-w-xs"
                        {...register("email", {
                            required: {
                                value: true,
                                message: "email is required"
                            },
                            pattern: {
                                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                message: 'error message'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                        {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                    </label>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">specialty</span>
                    </label>
                    <select {...register('specialty')} class="select w-full select-bordered max-w-xs">
                        {
                            services.map(service => <option
                                key={service._id}
                                value={service.name}>
                                {service.name}
                            </option>)
                        }

                    </select>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input

                        type="file"
                        className="input input-bordered w-full max-w-xs"
                        {...register("image", {
                            required: {
                                value: true,
                                message: "image is required"
                            }
                        })}
                    />
                    <label className="label">
                        {errors.photo?.type === 'required' && <span className="label-text-alt text-red-500">{errors.photo.message}</span>}
                    </label>
                </div>

                <input className="btn w-full max-w-xs text-white" type="submit" value="ADD" />
            </form>
        </div>
    );
};

export default AddDoctor;