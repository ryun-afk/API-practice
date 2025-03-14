const getUsers = 'SELECT * FROM public.users';
const getUserById = 'SELECT * FROM public.users WHERE user_id = $1';
const getUserByUsername = 'SELECT * FROM public.users WHERE username = $1';
const addUser = 'INSERT INTO public.users (username, password) VALUES ($1, $2)';
const updateFirstName = 'UPDATE public.users SET first_name = $1 WHERE user_id = $2';
const updateLastName = 'UPDATE public.users SET last_name = $1 WHERE user_id = $2';
const updatePassword = 'UPDATE public.users SET password = $1 WHERE user_id = $2'
const deleteUser = 'DELETE FROM public.users WHERE user_id = $1';

module.exports = {
    getUsers,
    getUserById,
    getUserByUsername,

    addUser,

    updateFirstName,
    updateLastName,
    updatePassword,
    
    deleteUser,
};