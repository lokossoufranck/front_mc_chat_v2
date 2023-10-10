<template>
  <div class="block grid">
    <div class="block text-700 text-center">


    <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
            <div class="flex justify-content-center flex-wrap card-container yellow-container">
                <div class="flex align-items-center justify-content-center w-4rem h-4rem font-bold text-gray-900 border-round m-2">
                    <img src="images/mc_chat.svg" alt="Image" class="scalein animation-ease-in-1000 animation-delay-4000 animation-duration-3000 animation-iteration-infinite logo_w logo_h ">
                </div>
            </div>
            <div class="mt-8 text-900 font-bold text-5xl mb-3">BIENVENUE SUR MC CHAT !</div>
            <div class="text-700 text-2xl mb-5"> <span style="color:black">{{user.username}}</span>  vous êtes connecté en tant que </div>
            <Button v-if="user.type_id==1" label="Superviseur" icon="pi pi-discord" class=" text-black font-bold px-5 py-3  p-button-rounded white-space-nowrap"></Button>
            <Button v-else-if="user.type_id==3" label="Reporting" icon="pi pi-discord" class=" text-black font-bold px-5 py-3  p-button-rounded white-space-nowrap"></Button>
            <Button   v-else label="Conseiller" icon="pi pi-discord" class="font-bold px-5 py-3  p-button-rounded white-space-nowrap"></Button>
        </div>
    </div>
    <!-- <div class="col-12">
      <div class="card">
        <h5>MCB</h5>
        <p>BIENVENUE SUR MC CHAT</p>
        <p>VOUS ETES CONNECTE EN TANT QUE [ {{user.username}} ] 
<span v-if="user.type_id==1">@<span style="border-style: none; padding:0.5rem; color:green">SUPERVISEUR </span> </span>
<span v-else>@<span style="border-style: none; padding:0.5rem; color:green">CONSEILLER </span> </span>
           <span v-if="user.type_id==1">@<span style="padding-right:1rem"></span> <button style="border-style: none; padding:0.5rem;background-color:green; color:white">SUPERVISEUR </button> </span>
<span v-else>@<span style="padding-right:1rem"></span> <button style="border-style: none; padding:0.5rem;background-color:green; color:white">CONSEILLER </button> </span> 
        </p>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
    }
  },
  mounted() {
    const o = JSON.parse(localStorage.getItem("user"));
    this.user = o;
  },
};
</script>
<style scoped>
.logo_h {
    height: 20vh !important;
}
.logo_w {
    width: 20vh !important;
}
</style>
