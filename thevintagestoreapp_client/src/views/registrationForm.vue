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
                        <label class="form-label">First Name</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model.trim="registerobj.firstName"
                          :class="{
                            'is-invalid':
                              submitted && $v.registerobj.firstName.$error,
                          }"
                        />
                        <div
                          v-if="submitted && !$v.registerobj.firstName.required"
                          class="invalid-feedback"
                        >
                          First Name is required
                        </div>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <div class="form-outline flex-fill mb-0">
                        <label class="form-label">Last Name</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model.trim="registerobj.lastName"
                          :class="{
                            'is-invalid':
                              submitted && $v.registerobj.lastName.$error,
                          }"
                        />
                        <div
                          v-if="submitted && !$v.registerobj.lastName.required"
                          class="invalid-feedback"
                        >
                          Last Name is required
                        </div>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <div class="form-outline flex-fill mb-0">
                        <label class="form-label">Email Address</label>
                        <input
                          type="email"
                          class="form-control"
                          v-model.trim="registerobj.email"
                          :class="{
                            'is-invalid':
                              submitted && $v.registerobj.email.$error,
                          }"
                        />
                        <div
                          v-if="submitted && $v.registerobj.email.$error"
                          class="invalid-feedback"
                        >
                          <span v-if="!$v.registerobj.email.required"
                            >Email is required</span
                          >
                          <span v-if="!$v.registerobj.email.email"
                            >Must be valid Email</span
                          >
                        </div>
                      </div>
                    </div>
                    <div class="d-flex flex-row align-items-center mb-4">
                      <div class="form-outline flex-fill mb-0">
                        <label class="form-label">Contact</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model.number="registerobj.contact"
                          :class="{
                            'is-invalid':
                              submitted && $v.registerobj.contact.$error,
                          }"
                        />
                        <div
                          v-if="submitted && $v.registerobj.contact.$error"
                          class="invalid-feedback"
                        >
                          <span v-if="!$v.registerobj.contact.required"
                            >Contact is required</span
                          >
                          <span v-if="!$v.registerobj.contact.minLength"
                            >Contact must be at least 10 characters</span
                          >
                          <span v-if="!$v.registerobj.contact.maxLength"
                            >Contact must be at atmost 10 characters</span
                          >
                        </div>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <div class="form-outline flex-fill mb-0">
                        <label class="form-label">Password</label>
                        <input
                          type="password"
                          class="form-control"
                          v-model.trim="registerobj.password"
                          :class="{
                            'is-invalid':
                              submitted && $v.registerobj.password.$error,
                          }"
                        />
                        <div
                          v-if="submitted && $v.registerobj.password.$error"
                          class="invalid-feedback"
                        >
                          <span v-if="!$v.registerobj.password.required"
                            >Password is required</span
                          >
                          <span v-if="!$v.registerobj.password.minLength"
                            >Password must be at least 8 characters</span
                          >
                          <span v-if="!$v.registerobj.password.maxLength"
                            >Password must be at atmost 16 characters</span
                          >
                        </div>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <div class="form-outline flex-fill mb-0">
                        <label class="form-label">Confirm password</label>
                        <input
                          type="password"
                          class="form-control"
                          v-model.trim="registerobj.confirmPassword"
                          :class="{
                            'is-invalid':
                              submitted && $v.registerobj.confirmPassword.$error,
                          }"
                        />
                        <div v-if="this.submitted && $v.registerobj.confirmPassword.$error" class="invalid-feedback left">
          <span v-if="!$v.registerobj.confirmPassword.required">Confirm Password is required</span>
          <span v-if="registerobj.confirmPassword && !$v.registerobj.confirmPassword.sameAsPassword">Password and Confirm Password should match</span>
        </div>
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
import UserServices from "@/services/userService.js";
import { required, minLength, maxLength,sameAs,email } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      submitted: false,
      registerobj: {},
      message: "Successfully Rgistered.",
      alertmsg: "",
    };
  },
  validations: {
    registerobj: {
      firstName: { required },
      lastName: { required },
      password: { required, minLength: minLength(8), maxLength: maxLength(16) },
      email: { required,email },
      contact: { required,minLength: minLength(10), maxLength: maxLength(10) },
      confirmPassword: { required, sameAsPassword: sameAs('password') }
    },
  },
  methods: {
    async register() {
      this.submitted = true;
      this.$v.registerobj.$touch();
      if (this.$v.registerobj.$invalid) {
        return;
      }
      await UserServices.registerUser(this.registerobj).then((data) => {
        if (data == "SUCCESS") {
          this.$toast.open({
            message: "Registration Successful",
            type: "success",
            position: "top",
          });
          this.$router.push({ path: "/login" });
        } else if (typeof(data)=="string") {
          this.$toast.open({
            message:data,
            type: "error",
            position: "top",
          });
        }else{
          console.log(data)
          data.errors.forEach(element => {
            this.$toast.open({
            message:element.msg,
            type: "error",
            position: "top",
          });
          });
        }
      });
    },
  },
};
</script>
