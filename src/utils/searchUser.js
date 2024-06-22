export const searchUserInStorage = (localStorageKey) => {
  return JSON.parse(localStorage.getItem(localStorageKey))
}
