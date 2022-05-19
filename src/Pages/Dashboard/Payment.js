import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../loading';
import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe('pk_test_51L0hCqAAAfEXZZSua3bUrWKwHx14riiK5nXfi50uzG8yPWUBVJHn0fZyk3jKll4UmMV14TDfUnqOUbbkH9RvnDoZ00h7TiBqX2');

const Payment = () => {
    const { id } = useParams();
    const url = `https://fathomless-fortress-56517.herokuapp.com/booking/${id}`;
    const { data: appointment, isLoading } = useQuery(['booking', id], () => fetch(url, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));


    if (isLoading) {
        return <Loading></Loading>
    };
    return (

        <div className="mx-12">
            <div class="card w-50 max-w-md bg-base-100 shadow-xl my-12">
                <div class="card-body">
                    <p className="font-bold text-green-700">Hello, {appointment.patientName}</p>
                    <h2 class="card-title">Pay for {appointment.treatment}</h2>
                    <p>Your appointment is on <span className="text-orange-700">{appointment.date}</span> at <span className="text-orange-700">{appointment.slot}</span></p>
                    <p>Please Pay: ${appointment.price}</p>
                </div>
            </div>
            <div class="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100">
                <div class="card-body">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm appointment={appointment} />
                    </Elements>

                </div>
            </div>
        </div>

    );
};

export default Payment;