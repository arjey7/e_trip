import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';

const About = () => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        // Convert data to the required format if necessary
        data.startTime = new Date(data.startTime).toISOString().split('T')[0];
        data.endTime = new Date(data.endTime).toISOString().split('T')[0];

        try {
            const response = await axios.post('http://localhost:8081/api/about', data);
            toast.success('Data submitted successfully!');
            reset(); // Reset the form fields
        } catch (error) {
            toast.error('Error submitting data');
            console.error('There was an error!', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="startTime">Start Time:</label>
                <input type="date" id="startTime" {...register('startTime', { required: true })} />
            </div>
            <div>
                <label htmlFor="endTime">End Time:</label>
                <input type="date" id="endTime" {...register('endTime', { required: true })} />
            </div>
            <div>
                <label htmlFor="price">Price:</label>
                <input type="number" id="price" {...register('price', { required: true })} />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default About;
