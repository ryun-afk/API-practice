const getUsers = 'SELECT * FROM public.users';
const getUserById = 'SELECT * FROM public.users WHERE user_id = $1';
const checkUsernameExists = 'SELECT s FROM public.users WHERE s.username = $1';
const addUser = 'INSERT INTO public.users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)';

module.exports = {
    getUsers,
    getUserById,
    checkUsernameExists,
    addUser,
};