export default (date) => {
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${hour}:${minute}  ${day}/${month}`
}