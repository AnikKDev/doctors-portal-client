import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import BookingModal from './BookingModal';
import Service from './Service';
import Loading from '../loading';
const AvailableAppointments = ({ date }) => {
    // const [services, setServices] = useState([]);
    const [treatment, setTreatment] = useState(null);
    const formattedDate = format(date, "PP");

    const { data: services, isLoading, refetch } = useQuery(['available', formattedDate], () =>
        fetch(`https://fathomless-fortress-56517.herokuapp.com/available?date=${formattedDate}`).then(res =>
            res.json()
        )
    )
    if (isLoading) {
        return <Loading></Loading>
    };
    // useEffect(() => {
    //     fetch(`https://fathomless-fortress-56517.herokuapp.com/available?date=${formattedDate}`)
    //         .then(res => res.json())
    //         .then(data => setServices(data))
    // }, [formattedDate]);



    return (
        <div>
            <h4 className="text-xl text-secondary text-center">Available appointment on: {format(date, 'PP')}</h4>
            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                {
                    services.map(service => <Service service={service} key={service._id} setTreatment={setTreatment}></Service>)
                }
            </div>
            {treatment && <BookingModal treatment={treatment} setTreatment={setTreatment} date={date} refetch={refetch}></BookingModal>}
        </div>
    );
};

export default AvailableAppointments;