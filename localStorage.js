export const getData = () =>
    JSON.parse(localStorage.getItem("evalData")) || [];
export const saveData = (data) => 
    localStorage.set("evalData", JSON.stringify(data));