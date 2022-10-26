const BASE_URL = `${process.env.REACT_APP_BACK_END_SERVER_URL}/api/clase`

async function getClasesByUser() {
  const res = await fetch(BASE_URL, {})
  return await res.json()
}

export { getClasesByUser }
