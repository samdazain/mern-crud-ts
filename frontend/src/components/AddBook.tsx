import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import api from '../services/api';

const AddBook: React.FC = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishedDate, setPublishedDate] = useState('');
    const [available, setAvailable] = useState(true);

    const handleAddBook = async () => {
        try {
            const newBook = { title, author, publishedDate, available };
            await api.post('/books', newBook);
            // Optionally refresh the book list or give feedback
        } catch (error) {
            console.error('Error adding book', error);
        }
    };

    return (
        <div className="p-4">
            <h3 className="text-xl mb-4">Add Book</h3>
            <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                type="date"
                label="Published Date"
                value={publishedDate}
                onChange={(e) => setPublishedDate(e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <FormControlLabel
                control={<Checkbox checked={available} onChange={(e) => setAvailable(e.target.checked)} />}
                label="Available"
            />
            <Button variant="contained" color="primary" onClick={handleAddBook}>
                Add Book
            </Button>
        </div>
    );
};

export default AddBook;
