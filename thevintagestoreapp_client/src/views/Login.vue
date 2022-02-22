<template>
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 col-lg-8 col-md-8 text-center d-flex justify-content-center p-5">
          <div class="innercontent">
            <h2>Login to Your Account</h2>
            <label class="text-secondary">Login using social networks</label>
            <div class="d-flex mt-2 justify-content-center">
              <span class="bg-primary text-light p-2 ps-3 pe-3 rounded-circle">
                <i class="fab fa-facebook-f fa-lg"></i>
              </span>
              <span class="bg-danger text-light p-2 rounded-circle ms-3">
                <i class="fab fa-google-plus-g fa-lg"></i>
              </span>

              <span class="bg-info text-light p-2 rounded-circle ms-3">
                <i class="fab fa-twitter fa-lg"></i>
              </span>
            </div>
            <h5 class="mt-2 text-secondary">or</h5>
            <div class="signupbox p-3">
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control rounded-pill"
                  id="floatingInput"
                  placeholder="Email Address"
                />
                <label for="floatingInput">Email address</label>
              </div>
              <div class="form-floating">
                <input
                  :type="passwordtoggle"
                  class="form-control rounded-pill"
                  id="floatingPassword"
                  placeholder="Password"
                  required
                />
                <label for="floatingPassword">Password</label>
                
              </div>
                <div class=" text-start ms-3">
                  <input type="checkbox" @change="PasswordToogle()" v-model="checked" required/>&nbsp;Show Password
                </div>
              <button class="thmbtn1 w-50 mt-3">Login</button>
            </div>
          </div>
        </div>
        <div
          class="col-sm-12 col-md-4 col-lg-4 registerpart d-flex text-center flex-column mx-auto justify-content-center align-items-center"
        >
          <div class="p-3">
            <h2 class="text-light">New Here?</h2>
            <h6 class="text-light mt-3">
              Signup and discover more number of vintage products.
            </h6>
            <button class="thmbtn1 mt-3">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            checked:false,
            passwordtoggle:"password"
        }
    },
    methods:{
        PasswordToogle(){
            if(this.checked){
                this.passwordtoggle="text"
            }else{
                this.passwordtoggle="password"
            }
        }
    }
}
</script>
<style scoped src="../assets/CSS/login.css">
/* @import "../assets/CSS/login.css"; */
</style>
