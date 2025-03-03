const getUsers = 'SELECT * FROM public.users';
const getUserById = 'SELECT * FROM public.users WHERE user_id = $1';

module.exports = {
    getUsers,
    getUserById,
};