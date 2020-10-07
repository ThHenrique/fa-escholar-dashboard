export const isAuthenticated = () => {
  const token = localStorage.getItem('token');

  if(token !== null) {
    return true;
  } else {
    return false;
  }
} 

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('name');
  localStorage.removeItem('id');

  return true
}