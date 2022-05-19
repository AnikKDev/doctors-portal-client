import React from 'react';
import PrimaryButton from '../Home/Shared/PrimaryButton';
const Service = ({ service, setTreatment }) => {
    const { name, slots, price } = service;
    return (
        <div className="card lg:max-w-lg bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>
                    {slots.length ? <span>{slots[0]}</span> : <span className="text-red-500">No slot available</span>}
                </p>
                <p>{slots.length} {slots.length > 1 ? 'spaces' : 'space'} available</p>
                <p><small>Price: ${price}</small></p>
                <div className="card-actions justify-center">
                    {/* <button disabled={slots.length === 0} className="btn btn-secondary text-white">Book Appointment</button> */}
                    {/* <PrimaryButton disabled={slots.length === 0} onClick={() => setTreatment(service)} className="btn btn-secondary text-white">Book Appointment</PrimaryButton> */}
                    <label htmlFor="booking-modal" disabled={slots.length === 0} onClick={() => setTreatment(service)} className="btn modal-button btn-secondary text-white">Book Appointment</label>
                </div>
            </div>
        </div>
    );
};

export default Service;