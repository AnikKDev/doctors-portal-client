import React from 'react';
import { toast } from 'react-toastify';
const Doctorrow = ({ doctor, index, refetch, setDeletingDoctor }) => {
    const { name, specialty, img, email } = doctor;

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
            <td>
                <label onClick={() => setDeletingDoctor(doctor)} for="deleteConfirmModal" class="btn btn-error btn-xs text-white">DELETE</label>

            </td>
        </tr>

    );
};

export default Doctorrow;