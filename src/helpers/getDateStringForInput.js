export const getDateStringForInput = dateStr => {
  const d = new Date(dateStr)
  
  const year = d.getFullYear()
  const month = (d.getMonth()+1) < 10 ? '0'+(d.getMonth()+1) : (d.getMonth()+1)
  const date = d.getDate()
  const hours = d.getHours()
  const minutes = d.getMinutes()

  return `${year}-${month}-${date}T${hours}:${minutes}`
}
