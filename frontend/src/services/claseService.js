const BASE_URL = `${process.env.REACT_APP_BACK_END_SERVER_URL}/api/clase`

async function getClases(filters, page, limit) {

  const res = await fetch(BASE_URL + '?' + new URLSearchParams({
    page: page,
    limit: limit
  }), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filters),
  })



  return await res.json()
}

async function getClasesByUser(profile_id, page, limit) {

  const data = { profile_id: profile_id}



  const res = await fetch(BASE_URL + '/byprofile?' + new URLSearchParams({
    page: page,
    limit: limit
  }), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })



  return await res.json()
}

export { getClases, getClasesByUser }
