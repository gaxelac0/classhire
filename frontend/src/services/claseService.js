import * as tokenService from "./tokenService";
const BASE_URL = `${process.env.REACT_APP_BACK_END_SERVER_URL}/api/clase`;

async function addClase(body) {
  try {
    const res = await fetch(BASE_URL + "/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenService.getToken()}`,
      },
      body: JSON.stringify(body),
    });

    const json = await res.json();
    if (json.token) {
      tokenService.setToken(json.token);
    }
    if (json.status === "err") {
      throw new Error(json.message);
    }
    return json;
  } catch (err) {
    throw err;
  }
}

async function getClases(filters, page, limit) {
  const res = await fetch(
    BASE_URL +
      "?" +
      new URLSearchParams({
        page: page,
        limit: limit,
      }),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filters),
    }
  );

  return await res.json();
}

async function getClasesByUser(profile_id, page, limit) {
  const data = { profile_id: profile_id };

  const res = await fetch(
    BASE_URL +
      "/byprofile?" +
      new URLSearchParams({
        page: page,
        limit: limit,
      }),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenService.getToken()}`,
      },
      body: JSON.stringify(data),
    }
  );

  return await res.json();
}

async function contratar(body) {
  const res = await fetch(BASE_URL + "/contratacion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
    body: JSON.stringify(body),
  });

  return await res.json();
}

async function patchContratacion(fields) {
  try {
    let token = tokenService.getToken();
    const res = await fetch(BASE_URL + "/contratacion", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    const json = await res.json();
    if (json.err) {
      throw new Error(json.err);
    }

    return json;
  } catch (err) {
    throw err;
  }
}

export { addClase, getClases, getClasesByUser, contratar, patchContratacion };
