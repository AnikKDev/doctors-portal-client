import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
const CheckoutForm = ({ appointment }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [processing, setProcessing] = useState(false);
    const [cardSuccess, setCardSuccess] = useState('');
    const [transactionId, settransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const { price, patient, patientName, _id } = appointment;
    useEffect(() => {
        fetch('https://fathomless-fortress-56517.herokuapp.com/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => {
                if (data?.clientSecret) {
                    setClientSecret(data.clientSecret);
                }
                console.log(data)
            });
    }, [price]);
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            toast.error(error.message);
            setCardError(error.message);
        } else {
            setCardError('')
            console.log('[PaymentMethod]', paymentMethod);
        }
        // confirm card payment
        setCardSuccess('');
        setProcessing(true);
        const { paymentIntent, error: intendError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: patientName,
                        email: patient,
                    },
                },
            },
        );

        if (intendError) {
            setCardError(intendError.message);
            setCardSuccess('');
            setProcessing(false)
        } else {
            setCardError('');
            settransactionId(paymentIntent.id)
            setCardSuccess('Your payment is completed');
            console.log(paymentIntent);

            // update
            // store payment od db
            const payment = {
                appointment: _id,
                transictionId: paymentIntent.id
            };
            fetch(`https://fathomless-fortress-56517.herokuapp.com/booking/${_id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)

            }).then(res => res.json()).then(data => { setProcessing(false); console.log(data) })
        }

    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-success btn-sm mt-8" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>
            {cardError && <p className="text-red-500">{cardError}</p>}
            {cardSuccess && <div className="text-green-500">
                <p>{cardSuccess}</p>
                <p>Transaction Id: <span className="text-orange-500">{transactionId}</span></p>
            </div>}
        </>
    );
};

export default CheckoutForm;