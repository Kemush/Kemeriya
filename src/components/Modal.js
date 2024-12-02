import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Modal.css';  // Make sure you have a separate CSS file for Modal styling

const Modal = ({ isOpen, onClose, onPersonAdded }) => {
  // Initialize form data state
  const [formData, setFormData] = useState({
    fname: '',
    mname: '',
    lname: '',
    gender: '',
    phone: '',
  });

  // Reset the form when the modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        fname: '',
        mname: '',
        lname: '',
        gender: '',
        phone: '',
      });
    }
  }, [isOpen]); // This will run every time the modal is opened

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sending the data to the POST API to add the new person
      const response = await axios.post(
        'https://localhost:7110/api/Person/InsertPerson',
        formData
      );

      // On success, call onPersonAdded to notify the parent component
      onPersonAdded(response.data); // You might want to adjust the response depending on your API
      onClose(); // Close the modal after submission
    } catch (error) {
      console.error("There was an error adding the person:", error);
    }
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-box">
          <form onSubmit={handleSubmit}>
            <div className="modal-content">
              <label>
                First Name:
                <input
                  type="text"
                  name="fname"
                  value={formData.fname}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Middle Name:
                <input
                  type="text"
                  name="mname"
                  value={formData.mname}
                  onChange={handleChange}
                />
              </label>
              <label>
                Last Name:
                <input
                  type="text"
                  name="lname"
                  value={formData.lname}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Gender:
                <input
                  type="text"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Phone:
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="modal-footer">
              <button type="submit" className="submit-btn">
                Add Person
              </button>
            </div>
          </form>
          <button className="close-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    )
  );
};

export default Modal;
