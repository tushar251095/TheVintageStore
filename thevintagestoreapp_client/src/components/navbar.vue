<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light mainnavbar">
      <div class="responsivenav">
        <ul class="navbar-nav me-auto ms-3">
          <li class="nav-item ms-4">
            <router-link class="nav-link text-dark font-weight-bold" to="/">
              <i class="fa fa-home fa-lg" aria-hidden="true"></i>&nbsp;<b>Home</b>
            </router-link>
          </li>

          <li class="nav-item ms-4">
            <router-link
              class="nav-link text-dark font-weight-bold"
              to="/trades"
              ><i class="fa fa-handshake fa-lg"></i>&nbsp;<b>Trades</b></router-link
            >
          </li>
          <li class="nav-item ms-4">
            <router-link class="nav-link text-dark font-weight-bold" to="/edit"
              ><i class="fas fa-edit fa-lg"></i>&nbsp;<b>Edit Trade</b></router-link
            >
          </li>
          <li class="nav-item ms-4">
            <router-link class="nav-link text-dark font-weight-bold" to="/about"
              ><i class="fa fa-info-circle fa-lg"></i>&nbsp;<b>About</b></router-link
            >
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style scoped>
@import "../../public/CSS/common.css";
@media screen and (max-width: 768px) {
  .navbar-nav {
    flex-direction: row;
  }
}
</style>
