import { format } from 'date-fns';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { toast } from 'react-toastify';

const BookingModal = ({ treatment, date, setTreatment }) => {
    const [user, loading, error] = useAuthState(auth);
    // console.log(user)
    const { _id, name, slots } = treatment;
    const handleBooking = e => {
        e.preventDefault();
        const slot = e.target.slot.value;
        const formattedDate = format(date, "PP");
        const booking = {
            treatmentId: _id,
            treatment: name,
            date: formattedDate,
            slot,
            patient: user.email,
            patientName: user.displayName,
            phone: e.target.phone.value
        };


        fetch('http://localhost:5000/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    toast.success(`Appointment is set, ${formattedDate} at ${slot}`)
                } else {
                    toast.warning(`Appointment is already set, ${formattedDate} at ${slot}`)
                }
                setTreatment(null); // eta deyar karon hocche amramodal e submit e click korle jaate modal ta auto close hoye jaay. karon ager page e modal open hobar condition deya hoisilo jodi treatment thake taholei modal open hobe
            })

    }
    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label for="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg text-secondary">Booking for: {name}</h3>
                    <form onSubmit={handleBooking} className="grid grid-cols-span-1 gap-3 justify-items-center mt-2">
                        <input type="text" value={format(date, 'PP')} disabled className="input input-bordered w-full max-w-xs" />
                        <select name="slot" className="select select-bordered w-full max-w-xs">
                            {
                                slots.map((slot, index) => <option value={slot} key={index}>{slot}</option>)
                            }
                        </select>
                        <input type="text" disabled value={user?.displayName || ''} name="name" className="input input-bordered w-full max-w-xs" />
                        <input type="email" value={user?.email || ''} disabled name="email" className="input input-bordered w-full max-w-xs" />
                        <input type="number" placeholder="Phone Number" name="phone" className="input input-bordered w-full max-w-xs" />
                        <input type="submit" value="submit" className="btn btn-secondary w-full max-w-xs" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;