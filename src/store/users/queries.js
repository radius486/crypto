import axios from 'axios';

export async function getUserList() {
  const { data } = await axios.get('/api/users');

  return data;
}

export async function getUserData(userId) {
  const { data } = await axios.get(`/api/users/${userId}`);

  return data;
}

export async function updateUserData(userId, data) {
  const response = await axios({
    url: `/api/users/${userId}`,
    method: 'put',
    data,
  });

  return response;
}
