import React, { useState } from 'react';
import chair from '../../assets/images/chair.png';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import './AppointmentBanner.css';
import 'react-day-picker/dist/style.css';
const AppointmentBanner = ({ date, setDate }) => {

    return (
        <div className="hero min-h-screen banner-container my-16">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={chair} className="max-w-sm rounded-lg shadow-2xl " alt="dentist chair" />
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <DayPicker
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentBanner;