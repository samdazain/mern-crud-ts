require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Book = require('./models/Book');
const config = require('./config');

mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

const seedUsers = async () => {
    const users = [
        {
            name: 'Admin',
            email: 'admin@gmail.com',
            password: 'admin', // Plain password
            isAdmin: true
        },
        {
            name: 'Nopan',
            email: 'nopan@gmail.com',
            password: 'user', // Plain password
            isAdmin: false
        }
    ];

    // Hash passwords
    for (let user of users) {
        user.password = await bcrypt.hash(user.password, 10);
    }

    return users;
};

const seedBooks = [
    {
        title: '1984',
        author: 'George Orwell',
        publishedDate: new Date('1949-06-08'),
        available: true
    },
    {
        title: 'Brave New World',
        author: 'Aldous Huxley',
        publishedDate: new Date('1932-08-30'),
        available: true
    }
];

const seedDatabase = async () => {
    try {
        await User.deleteMany({});
        await Book.deleteMany({});
        const users = await seedUsers();
        await User.insertMany(users);
        await Book.insertMany(seedBooks);
        console.log('Database seeded successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding database', error);
        mongoose.connection.close();
    }
};

seedDatabase();
