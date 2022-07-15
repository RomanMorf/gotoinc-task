export const getDate = (dateStr) => {
  const d = new Date(dateStr)

  const year = d.getFullYear()
  const month = (d.getMonth()+1) < 10 ? '0'+(d.getMonth()+1) : (d.getMonth()+1)
  const date = d.getDate()

  return `${year}-${month}-${date}`
}