import React from 'react';
import './PersonCard.css';  // Make sure you have a separate CSS file for styling

const PersonCard = ({ person, onDelete }) => {
  return (
    <div className="person-card">
      <div className="person-photo">
        {/* Display the photo if the URL is available */}
        {person.photoUrl ? (
          <img src={person.photoUrl} alt="person" />
        ) : (
          <div className="placeholder-photo">No Image</div>
        )}
      </div>

      <div className="person-info">
        {/* Display person's name and info */}
        <p><strong>ID:</strong> {person.id}</p>
        <h3><strong>Full Name:</strong>  {person.fname} {person.mname && person.mname} {person.lname}</h3>
        <p><strong>Gender:</strong> {person.gender === 'female' ? 'F' : 'M'}</p>
        <p><strong>Phone:</strong> {person.phone}</p>

        <button className="delete-btn" onClick={() => onDelete(person.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default PersonCard;
