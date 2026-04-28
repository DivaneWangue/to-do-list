const AUTH_KEY = 'todolist_user_authenticated';
const USER_KEY = 'todolist_user_name';

export const login = (username, password) => {
  if (!username?.trim() || !password?.trim()) {
    return false;
  }

  localStorage.setItem(AUTH_KEY, 'true');
  localStorage.setItem(USER_KEY, username.trim());
  return true;
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(USER_KEY);
};

export const isLoggedIn = () => localStorage.getItem(AUTH_KEY) === 'true';

export const getUsername = () => localStorage.getItem(USER_KEY) || '';
