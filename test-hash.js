const bcrypt = require('bcryptjs');

const password = 'Chavela0987$';
const hash = '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6QJw/2Ej7W';

bcrypt.compare(password, hash).then(res => {
    console.log('Match:', res);
});
