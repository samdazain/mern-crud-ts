import React, { useState } from 'react';
import api from '../services/api';

const AddMember: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const handleAddMember = async () => {
        try {
            const newMember = { name, email, password, isAdmin };
            await api.post('/members', newMember);
            // Optionally refresh the member list or give feedback
        } catch (error) {
            console.error('Error adding member', error);
        }
    };

    return (
        <div>
            <h3>Add Member</h3>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <label>
                <input type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
                Admin
            </label>
            <button onClick={handleAddMember}>Add Member</button>
        </div>
    );
};

export default AddMember;
