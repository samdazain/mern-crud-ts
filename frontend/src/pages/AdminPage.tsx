import React from 'react';
import BookList from '../components/BookList';
import MemberList from '../components/MemberList';
import AddBook from '../components/AddBook';
import AddMember from '../components/AddMember';

const AdminPage: React.FC = () => {
    return (
        <div className="admin-container">
            <h2>Admin Dashboard</h2>
            <AddBook />
            <BookList />
            <AddMember />
            <MemberList />
        </div>
    );
};

export default AdminPage;
