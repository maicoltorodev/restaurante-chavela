const bcrypt = require('bcryptjs');

const password = 'Chavela0987$';

bcrypt.hash(password, 12).then(hash => {
    console.log('New Hash:', hash);
});
