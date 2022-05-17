import React from 'react';
import { toast } from 'react-toastify';
const Doctorrow = ({ doctor, index, refetch }) => {
    const { name, specialty, img, email } = doctor;
    const handleDelete = (email) => {
        fetch(`http://localhost:5000/doctor/${email}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    toast.success(`Doctor ${name} has been removed`);
                    refetch()
                }
            })
    }
    return (
        <tr>
            <th>{index + 1}</th>
            <td><div class="avatar">
                <div class="w-20 rounded">
                    <img src={img} alt={name} />
                </div>
            </div></td>
            <td>{name}</td>
            <td>{specialty}</td>
            <td><button onClick={() => handleDelete(email)} class="btn btn-error btn-xs text-white">DELETE</button></td>
        </tr>

    );
};

export default Doctorrow;