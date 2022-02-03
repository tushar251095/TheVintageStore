<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light mainnavbar">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto ml-3">
          <li class="nav-item ml-4">
            <router-link class="nav-link text-dark font-weight-bold" to="/">
              <i class="fa fa-home fa-lg" aria-hidden="true"></i>&nbsp;Home
            </router-link>
          </li>

          <li class="nav-item ml-4">
            <router-link
              class="nav-link text-dark font-weight-bold"
              to="/trades"
              ><i class="fa fa-handshake fa-lg"></i>&nbsp;Trades</router-link
            >
          </li>
          <li class="nav-item ml-4">
            <router-link class="nav-link text-dark font-weight-bold" to="/edit"
              ><i class="fas fa-edit fa-lg"></i>&nbsp;Edit Trade</router-link
            >
          </li>
          <li class="nav-item ml-4">
            <router-link class="nav-link text-dark font-weight-bold" to="/about"
              ><i class="fa fa-info-circle fa-lg"></i>&nbsp;About</router-link
            >
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style scoped>
@import "../assets/CSS/about.css";
</style>
