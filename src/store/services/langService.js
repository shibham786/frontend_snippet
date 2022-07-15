import axios from "axios"

export const getlangs = async()=>{
    const response =  await axios.get("http://127.0.0.1:8000/api/languages/")
    return response.data
}

const langService = {
    getlangs,
}

export default langService