import * as tokenService from '../services/tokenService'

const BASE_URL = `${process.env.REACT_APP_BACK_END_SERVER_URL}/api/profile`

async function getProfile() {
  const res = await fetch(BASE_URL, {
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
  })
  return await res.json()
}

async function getProfileDetails(profile_id) {
  const res = await fetch(BASE_URL + '/' + profile_id, {
    headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
  })
  return await res.json()
}

async function setRole(formData, role) {

  let token = tokenService.getToken();

  const res = await fetch(`${BASE_URL}/add-photo`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: {
      profile_id: token.user.profile,
      role: role
    }
  })
  return await res.json()
}

async function addPhoto(photoData, profileId) {
  const res = await fetch(`${BASE_URL}/${profileId}/add-photo`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${tokenService.getToken()}`
    },
    body: photoData
  })
  return await res.json()
}

export { getProfile, getProfileDetails, addPhoto }
