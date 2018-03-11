const query = `
query ($id: Int) { # Define which variables will be used in the query (id)
  Media(
    idMal: $id
  ) {
    title {
      romaji
      english
    }
    duration
    airingSchedule {
      nodes {
        episode,
        airingAt
      }
    }
  }
}
`

const getByMAL = async (id) => {
  const url = 'https://graphql.anilist.co'
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      query: query,
      variables: {
        id
      }
    })
  }
  const data = await fetch(url, options)
  const json = await data.json()
  if (data.ok) {
    return json
  } else {
    console.error(json)
    return false
  }
}

const getAllByMAL = (ids) => {
  return Promise.all(ids.map((id) => getByMAL(id)))
}

export default getByMAL
export { getAllByMAL }
