import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import './styles/AdminEnquiry.css';

function AdminEnquiry() {
    const [enquiries, setEnquiries] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);
    const [answerText, setAnswerText] = useState('');

    useEffect(() => {
        const fetchEnquiries = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/enquiry');
                setEnquiries(response.data);
            } catch (error) {
                console.error('Error fetching enquiries:', error);
            }
        };

        fetchEnquiries();
    }, []);

    const handleAnswerClick = (enquiry) => {
        setSelectedEnquiry(enquiry);
        setShowModal(true);
    };

    const handleSendAnswer = async () => {
        try {
            await axios.post('http://localhost:8080/api/message', {
                to: selectedEnquiry.email,
                subject: `Answer to your enquiry about ${selectedEnquiry.tourName}`,
                body: answerText
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            await axios.patch(`http://localhost:8080/api/enquiry/${selectedEnquiry.id}/answer`, answerText, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setEnquiries((prevEnquiries) =>
                prevEnquiries.map((enquiry) =>
                    enquiry.id === selectedEnquiry.id ? { ...enquiry, answer: answerText } : enquiry
                )
            );

            setShowModal(false);
            setSelectedEnquiry(null);
            setAnswerText('');
            alert('Answer sent and saved successfully!');
        } catch (error) {
            console.error('Error sending answer:', error);
            alert('Failed to send and save answer');
        }
    };

    return (
        <div className="container">
            <h1>Enquiries</h1>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Tour Name</th>
                    <th>Text</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {enquiries.map((enquiry, index) => (
                    <>
                        <tr key={enquiry.id}>
                            <td data-label="ID">{index + 1}</td>
                            <td data-label="Full Name">{enquiry.fullName}</td>
                            <td data-label="Phone Number">{enquiry.phoneNumber}</td>
                            <td data-label="Email">{enquiry.email}</td>
                            <td data-label="Tour Name">{enquiry.tourName}</td>
                            <td data-label="Text">{enquiry.text}</td>
                            <td data-label="Action">
                                <button onClick={() => handleAnswerClick(enquiry)}>
                                    Write an answer
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="7" className="answer-row">
                                <strong>Answer for the enquiry:</strong> {enquiry.answer || 'No answer yet'}
                            </td>
                        </tr>
                    </>
                ))}
                </tbody>
            </table>

            <Rodal customStyles={{ height: '40%' }} visible={showModal} onClose={() => setShowModal(false)}>
                <div className="modal-content">
                    <h2>Write an Answer</h2>
                    <textarea
                        value={answerText}
                        onChange={(e) => setAnswerText(e.target.value)}
                        placeholder="Enter your answer..."
                        rows={4}
                    />
                    <button className="modal-button" onClick={handleSendAnswer}>Send Answer</button>
                </div>
            </Rodal>
        </div>
    );
}

export default AdminEnquiry;
