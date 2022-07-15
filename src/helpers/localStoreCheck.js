export const localStoreCheck = (key) => {
  if (localStorage.getItem(`${key}`)) {
    return true

  } else {
    return false
  }
}