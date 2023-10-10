<template>
  <div class="grid p-fluid ">
    <div class="col-12 md:col-6">
      <div class="column-gap-4 card ">
        <h5>Profile utilisateur</h5>
        <span class="p-float-label pb-20">
          <InputText
            id="username"
            v-model="user_profile.username"
            type="text"
            disabled
          />
        </span>
        <br />
        <br />
        <span class="p-float-label">
          <InputText id="name" type="text" v-model="user_profile.name" />
          <label for="name">Nom</label>
          <small
            :class="{ 'p-invalid': submitted && !user_profile.name }"
            v-if="submitted && !user_profile.name"
            >Le nom est requis.</small
          >
        </span>
        <br />
        <br />
        <span class="p-float-label">
          <InputText
            id="firstname"
            type="text"
            v-model="user_profile.firstname"
          />
          <label for="firstname">Prenoms</label>
          <small
            :class="{ 'p-invalid': submitted && !user_profile.firstname }"
            v-if="submitted && !user_profile.firstname"
            >Le prénom est requis.</small
          >
        </span>

        <br />
        <br />
        <span class="p-float-label">
          <InputText
            required="true"
            id="email"
            type="text"
            v-model="user_profile.email"
          />
          <label for="firstname">Email</label>
          <small
            :class="{ 'p-invalid': submitted && !user_profile.email }"
            v-if="submitted && !user_profile.email"
            >L'adresse email est requise.</small
          >
        </span>

        <br />
        <span class="p-float-label">
          <Password
            id="password"
            v-model="password"
            :toggleMask="true"
            class="w-full mb-3"
            inputClass="w-full"
            inputStyle="padding:1rem"
          ></Password>
          <label for="password">Password</label>
        </span> 
        <br />
        <Button
          label="Enregistrer"
          @click="save"
          icon="pi pi-chevron-right"
          class="p-button-success"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import User from "../models/user";
import AuthService from "../service/AuthService";
export default {
  data() {
    return {
      message: [],
      submitted: false,
      password: "",
      user_profile: new User("", "", "", ""),
    };
  },
  methods: {
    ...mapActions(["auth/updateUser"]),
    ...mapActions(["auth/updateUserPassword"]),

    save() {

      this.submitted = true;
      const o = new Object();
      o.id = this.user_profile.id;
      o.name = this.user_profile.name;
      o.firstname = this.user_profile.firstname;/* 
      this["auth/updateUser"](o); */

      if (this.password != "") {
        o.password = this.password;
      }
      this["auth/updateUser"](o);
      alert('Enregistrement effectué');
    }
   
  },

  computed: {
    ...mapGetters(["auth/get_user"]),
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  beforeMount() {},
  updated() {},
  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    AuthService.finUser(user.userId).then((res) => {
      this.user_profile = res.data;
    });
  },
};
</script>
