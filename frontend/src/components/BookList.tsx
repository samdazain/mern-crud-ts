import React, { useEffect, useState } from 'react';
import api from '../services/api';

const BookList: React.FC = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await api.get('/books');
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books', error);
            }
        };

        fetchBooks();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await api.delete(`/books/${id}`);
            setBooks(books.filter((book: any) => book._id !== id));
        } catch (error) {
            console.error('Error deleting book', error);
        }
    };

    return (
        <div>
            <h2>Books</h2>
            <ul>
                {books.map((book: any) => (
                    <li key={book._id}>
                        {book.title}
                        <button onClick={() => handleDelete(book._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
