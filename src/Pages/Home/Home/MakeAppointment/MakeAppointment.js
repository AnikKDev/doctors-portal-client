import React from 'react';
import doctor from '../../../../assets/images/doctor.png';
import appointment from '../../../../assets/images/appointment.png';
import PrimaryButton from '../../Shared/PrimaryButton';
const MakeAppointment = () => {
    return (
        <section className="flex justify-center items-center my-20" style={{
            background: `url(${appointment})`
        }}>
            <div className="flex-1 hidden lg:block">
                <img className="mt-[-120px]" src={doctor} alt="" />
            </div>
            <div className="flex-1 text-white">
                <h3 className="text-xl text-primary">Appointment</h3>
                <h2 className="text-3xl">Make An Appointment Today.</h2>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic consequuntur suscipit, voluptatibus impedit molestiae inventore placeat maiores vitae esse nesciunt perferendis atque facilis est praesentium distinctio ea saepe odio dolorem nihil pariatur. Voluptatibus blanditiis deserunt saepe a distinctio dolore ipsam.</p>
                <PrimaryButton>Get Started</PrimaryButton>
            </div>
        </section>
    );
};

export default MakeAppointment;