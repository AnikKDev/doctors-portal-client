import React from 'react';
import { toast } from 'react-toastify';

const DeleteConfirmationModa = ({ deletingDoctor, refetch, setDeletingDoctor }) => {
    const { name, email } = deletingDoctor;
    const handleDelete = () => {
        fetch(`https://fathomless-fortress-56517.herokuapp.com/doctor/${email}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    toast.success(`Doctor ${name} has been removed`);
                    setDeletingDoctor(null);
                    refetch();
                }
            })
    }
    return (
        <div>


            <input type="checkbox" id="deleteConfirmModal" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <h3 class="font-bold text-lg">Are you sure?</h3>
                    <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                    <div class="modal-action">
                        <button onClick={() => handleDelete()} class="btn btn-error btn-xs text-white">DELETE</button>
                        <label for="deleteConfirmModal" class="btn btn-xs">CANCEL!</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModa;