import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import BookingModal from './BookingModal';
import Service from './Service';
const AvailableAppointments = ({ date }) => {
    const [services, setServices] = useState([]);
    const formattedDate = format(date, "PP");
    useEffect(() => {
        fetch(`http://localhost:5000/available?date=${formattedDate}`)
            .then(res => res.json())
            .then(data => setServices(data))
    }, [formattedDate]);

    const [treatment, setTreatment] = useState(null);

    return (
        <div>
            <h4 className="text-xl text-secondary text-center">Available appointment on: {format(date, 'PP')}</h4>
            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                {
                    services.map(service => <Service service={service} key={service._id} setTreatment={setTreatment}></Service>)
                }
            </div>
            {treatment && <BookingModal treatment={treatment} setTreatment={setTreatment} date={date}></BookingModal>}
        </div>
    );
};

export default AvailableAppointments;