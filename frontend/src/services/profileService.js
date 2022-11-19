import * as tokenService from "../services/tokenService";

const BASE_URL = `${process.env.REACT_APP_BACK_END_SERVER_URL}/api/profile`;

async function getProfile() {
  const res = await fetch(BASE_URL, {
    headers: { Authorization: `Bearer ${tokenService.getToken()}` },
  });
  return await res.json();
}

async function getProfileById(profile_id) {
  const res = await fetch(BASE_URL + "/" + profile_id, {});
  return await res.json();
}

async function patchProfile(fields) {
  try {
    let token = tokenService.getToken();
    const res = await fetch(`${BASE_URL}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    const json = await res.json();
    if (json.data.token) {
      tokenService.removeToken();
      tokenService.setToken(json.data.token);
    }
    if (json.err) {
      throw new Error(json.err);
    }

    return json;
  } catch (err) {
    throw err;
  }
}

async function addPhoto(photoData, profileId) {
  const res = await fetch(`${BASE_URL}/${profileId}/add-photo`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
    body: photoData,
  });
  return await res.json();
}

export { getProfile, patchProfile, getProfileById, addPhoto };
