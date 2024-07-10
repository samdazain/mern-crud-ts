import React, { useEffect, useState } from 'react';
import api from '../services/api';

const MemberList: React.FC = () => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await api.get('/members');
                setMembers(response.data);
            } catch (error) {
                console.error('Error fetching members', error);
            }
        };

        fetchMembers();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await api.delete(`/members/${id}`);
            setMembers(members.filter((member: any) => member._id !== id));
        } catch (error) {
            console.error('Error deleting member', error);
        }
    };

    return (
        <div>
            <h2>Members</h2>
            <ul>
                {members.map((member: any) => (
                    <li key={member._id}>
                        {member.name}
                        <button onClick={() => handleDelete(member._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MemberList;
