import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PersonCard from './components/PersonCard';
import Modal from './components/Modal';
import './App.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch persons from the GET API
  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const response = await axios.get('https://localhost:7110/api/Person/GetPerson');
        setPersons(response.data);
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };
    fetchPersons();
  }, []);

  // Handle delete person
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7110/api/Person/DeletePerson/${id}`);
      setPersons(persons.filter(person => person.id !== id));
    } catch (error) {
      console.error("There was an error deleting the person!", error);
    }
  };

  // Handle adding a new person
  const handleAddPerson = (newPerson) => {
    setPersons([...persons, newPerson]); // Add the new person to the state
  };

  return (
    <div className="app">
      <button className="add-btn" onClick={() => setIsModalOpen(true)}>
        <p><strong>Add New Person</strong></p>
      </button>

      <div className="person-list">
        {persons.map((person) => (
          <PersonCard key={person.id} person={person} onDelete={handleDelete} />
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPersonAdded={handleAddPerson}  // Pass the handleAddPerson to Modal
      />
    </div>
  );
};

export default App;
