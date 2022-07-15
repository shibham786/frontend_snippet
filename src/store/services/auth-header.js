export  const authHeader = ()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user?.access){
        return  'Bearer '+ JSON.parse(localStorage.getItem('user')).access
    }
    return {}
}