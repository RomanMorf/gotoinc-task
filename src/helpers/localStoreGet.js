export const localStoreGet = (key) => {
  
  if (localStorage.getItem(`${key}`)) {
    const data = localStorage.getItem(`${key}`)
    return JSON.parse(data)
  } else {
    return undefined
  }
}