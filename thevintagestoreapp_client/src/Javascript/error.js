import router from '../router'
let errorView="error"
export default{
    openRouteErrors(error){
        localStorage.setItem("statusCode",error.response.data.statusCode)
        localStorage.setItem("errorMessage",error.response.data.message)
        router.push(errorView)
      },
    restrictedRouteErrors(error){
      if(error.response.data.statusCode==401){
        alert(error.response.data.message)
        this.logout().then(()=>{
          console.log("logout")
        })
       // return router.push(errorView)
     }else{
      localStorage.setItem("statusCode",error.response.data.statusCode)
      localStorage.setItem("errorMessage",error.response.data.message)
      router.push(errorView)
     }
    },
    async logout() {
      try{
        localStorage.clear()
        router.push({ path: '/'});
        location.reload()
        return;
      }catch(error){
        this.openRouteErrors(error)
      }
    }
}