import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../loading';
import Doctorrow from './Doctorrow';
const ManageDoctors = () => {
    const { data: doctors, isLoading, refetch } = useQuery('doctors', () => fetch('http://localhost:5000/doctor', {
        headers: { authorization: `Bearer ${localStorage.getItem('accessToken')}` }
    }).then(res => res.json()));



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
                            doctors.map((doctor, index) => <Doctorrow doctor={doctor} key={doctor._key} index={index} refetch={refetch}></Doctorrow>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageDoctors;