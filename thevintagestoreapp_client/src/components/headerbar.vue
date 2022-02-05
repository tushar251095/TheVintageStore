<template>
  <div>
    <header class="container-fluid mainheader">
      <div class="row p-1">
        <div class="col-sm-5 logo">
          <router-link to="/">
            <img
              src="../assets/Images/logo.png"
              class="float-start ms-4 logoimg"
              alt="logo"
            />
            <h4 class="pt-3 text-light">The Vintage Store</h4>
          </router-link>
        </div>
        <div class="col-sm-7">
          <ul class="headernav list-group list-group-horizontal mt-2">
            <li class="list-group-item">
              <router-link to="/newtrade" class="text-light anchorstyle"
                >Start Trading</router-link
              >
            </li>
            <li class="list-group-item">
              <router-link to="/registration" class="text-light anchorstyle"
                >SignUp</router-link
              >
            </li>
            <li class="list-group-item">
              <router-link to="/" class="text-light anchorstyle"
                >Login</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </header>
  </div>
</template>
<style>
@import "../assets/CSS/common.css";
</style>
