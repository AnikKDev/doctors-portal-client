import React from 'react';
import SingleService from './SingleService/SingleService';
import fluoride from '../../../../assets/images/fluoride.png'
import cavity from '../../../../assets/images/cavity.png'
import whitening from '../../../../assets/images/whitening.png'
const Services = () => {
    // we can add the data by create an array of object too
    return (
        <div className="my-28">
            <h4 className="text-primary text-xl text-center">OUR SERVICES</h4>
            <h3 className="text-4xl mb-10 mt-4 uppercase text-center">Services We Provide</h3>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-12">
                <SingleService title="Fluoride Treatment" img={fluoride}></SingleService>
                <SingleService title="Cavity Filling" img={cavity}></SingleService>
                <SingleService title="Teeth Whitening" img={whitening}></SingleService>
            </div>
        </div>
    );
};

export default Services;