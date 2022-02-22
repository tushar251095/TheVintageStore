<template>
  <section class="h-100 p-3" style="background-color: #eee">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black" style="border-radius: 25px">
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                    Sign up
                  </p>

                  <form class="mx-1 mx-md-4">
                    <div class="d-flex flex-row align-items-center mb-4">
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="text"
                          class="form-control"
                          v-model.trim="registerobj.fullname"
                        />
                        <label class="form-label">Full Name</label>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="email"
                          class="form-control"
                          v-model.trim="registerobj.email"
                        />
                        <label class="form-label">Email Address</label>
                      </div>
                    </div>
                    <div class="d-flex flex-row align-items-center mb-4">
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="text"
                          class="form-control"
                          v-model.number="registerobj.conatct"
                        />
                        <label class="form-label">Contact</label>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="password"
                          class="form-control"
                          v-model.trim="registerobj.password"
                        />
                        <label class="form-label">Password</label>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="password"
                          class="form-control"
                          v-model.trim="confirmpassword"
                        />
                        <label class="form-label">Confirm password</label>
                      </div>
                    </div>

                    <div
                      class="d-flex justify-content-center mx-4 mb-3 mb-lg-4"
                    >
                      <button type="button" @click="register()" class="thmbtn1">
                        Register
                      </button>
                    </div>
                  </form>
                </div>
                <div
                  class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2"
                >
                  <img
                    src="../assets/Images/tradeimage.jpg"
                    class="img-fluid"
                    alt="signup image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      registerobj: {},
      confirmpassword: "",
      message: "Successfully Rgistered.",
      alertmsg: "",
    };
  },
  methods: {
    makeToast(append = false) {
      this.toastCount++;
      this.$bvToast.toast(`This is toast number ${this.toastCount}`, {
        title: "BootstrapVue Toast",
        autoHideDelay: 5000,
        appendToast: append,
      });
    },
    register() {
      // this.$toasted.show('hello billo')
      if (this.registerobj.password == this.confirmpassword) {
       // console.log("in if");
        this.$toast.open({
          message: "Registration Successfull!!",
          type: "success",
          position: "top",
        });
      } else {
        //console.log("in else");
        this.$toast.open({
          message: "Something went wrong!",
          type: "error",
          position: "top",
        });
      }
    },
  },
};
</script>
