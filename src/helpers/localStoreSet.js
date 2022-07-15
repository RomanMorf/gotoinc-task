export const localStoreSet = (key, payload) => {
  localStorage.setItem(`${key}`, JSON.stringify(payload))
}