<template>
  <div class="layout-topbar">
    <router-link to="/" class="layout-topbar-logo">
      <img alt="Logo" :src="topbarImage()" />
      <span>CHAT</span>
    </router-link>

    <button
      class="p-link layout-topbar-menu-button layout-topbar-button"
      v-styleclass="{
        selector: '@next',
        enterClass: 'hidden',
        enterActiveClass: 'scalein',
        leaveToClass: 'hidden',
        leaveActiveClass: 'fadeout',
        hideOnOutsideClick: true,
      }"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button>
    <ul class="layout-topbar-menu hidden lg:flex origin-top">
      <!-- <li>
        <button class="p-link layout-topbar-button">
          <i class="pi pi-calendar"></i>
          <span>Events</span>
        </button>
      </li>
      <li>
        <button class="p-link layout-topbar-button">
          <i class="pi pi-cog"></i>
          <span>Settings</span>
        </button>
      </li> -->
     <!-- <li>
        <button class="p-link layout-topbar-button">
          <i class="pi pi-user"></i>
          <span>Profile</span>
        </button>
      </li>-->
       
      <li>
        <button
          class="p-link layout-menu-button layout-topbar-button"
          @click="onMenuToggle"
        >
          <i class="pi pi-bars"></i>
        </button>
      </li>
      <li>
        <router-link to="/profile" >
          <button
            @click="profil"
            title="Profil"
            class="p-link layout-topbar-button"
          >
            <i class="pi pi-fw pi-user"></i>
            <span>Profil</span>
          </button>
        </router-link>
      </li>
      <li>
        <button
          @click="signout"
          title="Déconnexion"
          class="p-link layout-topbar-button"
        >
          <i class="pi pi-fw pi-sign-in"></i>
          <span>Déconnexion</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    signout() {
      const user = JSON.parse(localStorage.getItem("user"));
      var user_connected = new Object();
      user_connected.id = user.userId;
      this.$store.dispatch("auth/logout", user_connected).then((response) => {
        if (response.error == false) {
          this.$router.go();
        }
      });

      //this.$router.go(this.$router.currentRoute);
    },
    onMenuToggle(event) {
      this.$emit("menu-toggle", event);
    },
    onTopbarMenuToggle(event) {
      this.$emit("topbar-menu-toggle", event);
    },
    topbarImage() {
      return this.$appState.darkTheme
        ? "images/logo-white.svg"
        : "images/logo_mc_chat.png";
    },
  },
  computed: {
    darkTheme() {
      return this.$appState.darkTheme;
    },
  },
};
</script>