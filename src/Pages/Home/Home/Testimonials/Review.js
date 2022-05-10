import React from 'react';

const Review = ({ review }) => {
    return (
        <div className="card lg:max-w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Card title!</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, accusamus corporis rem repudiandae impedit fugiat.</p>
                <div className="flex items-center ">
                    <div className="avatar">
                        <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 mr-5">
                            <img className="" src={review.image} alt="" />
                        </div>
                    </div>
                    <div>
                        <h4 className="text-xl">{review.name}</h4>
                        <p>{review.location}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;