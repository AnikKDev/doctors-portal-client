import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../loading';
import DeleteConfirmationModa from './DeleteConfirmationModa';
import Doctorrow from './Doctorrow';
const ManageDoctors = () => {
    const [deletingDoctor, setDeletingDoctor] = useState(null);
    const { data: doctors, isLoading, refetch } = useQuery('doctors', () => fetch('https://fathomless-fortress-56517.herokuapp.com/doctor', {
        headers: { authorization: `Bearer ${localStorage.getItem('accessToken')}` }
    }).then(res => res.json()));
    console.log(doctors);



    if (isLoading) {
        return <Loading></Loading>
    };
    return (
        <div>
            Manage doctor: {doctors.length}
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>specialty</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors.map((doctor, index) => <Doctorrow doctor={doctor} key={doctor._key} index={index} refetch={refetch} setDeletingDoctor={setDeletingDoctor}></Doctorrow>)
                        }

                    </tbody>
                </table>
            </div>
            {deletingDoctor && <DeleteConfirmationModa deletingDoctor={deletingDoctor} setDeletingDoctor={setDeletingDoctor} refetch={refetch} />}
        </div>
    );
};

export default ManageDoctors;