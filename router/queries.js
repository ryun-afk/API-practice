const getUsers = 'SELECT * FROM public.users';
const getUserById = 'SELECT * FROM public.users WHERE user_id = $1';
const checkUsernameExists = 'SELECT * FROM public.users WHERE username = $1';
const addUser = 'INSERT INTO public.users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)';
const updateUser = 'UPDATE public.users SET first_name = $1, last_name = $2, username = $3, password = $4 WHERE user_id = $5';
const deleteUser = 'DELETE FROM public.users WHERE user_id = $1';

module.exports = {
    getUsers,
    getUserById,
    checkUsernameExists,
    addUser,
    updateUser,
    deleteUser,
};