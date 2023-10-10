<template>
    <div class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
            <div class="col-12 mt-5 xl:mt-0 text-center">
                <img :src="'layout/images/logo-' + logoColor + '.png'" alt="Sakai logo" class="mb-5">
            </div>
            <div class="col-12 xl:col-6" style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);">
                <div class="h-full w-full m-0 py-7 px-4" style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
                     <div class="text-center mb-5">
                        <img src="layout/images/logo_mc_chat.png" alt="Image" height="50" class="mb-3">
                        <div class="text-900 text-3xl font-medium mb-3">MC Chat</div>
                        <span class="text-600 font-medium">Connectez-vous pour continuer</span>
                    </div>
                    <Toast />
                    <div class="w-full md:w-10 mx-auto">
                        <form> 
                        <label for="username" class="block text-900 text-xl font-medium mb-2">Username</label>
                        <InputText id="username" v-model="user.username" type="text" class="w-full mb-3" placeholder="Username" style="padding:1rem;" />
                
                        <label for="password" class="block text-900 font-medium text-xl mb-2">Password</label>
                        <Password id="password" v-model="user.password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>
                
                        <div class="flex align-items-center justify-content-between mb-5">
                            <div class="flex align-items-center">
                                <Checkbox id="rememberme1" v-model="checked" :binary="true" class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a>
                        </div>
                        <Button @click="login" label="Sign In" class="w-full p-3 text-xl"></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import User from '../models/user';
export default {
    data() {
        return {
            message: [],
            user:new User('',''),
            email: '',
            password: '',
            checked: false
        }
    },
    methods:{
        login(){
            this.$store.dispatch('auth/login', this.user).then(
          () => {
              //page de redirection au cas ou tout se passe bien
            
            this.$router.push('/');
          },
          error => {
            this.loading = false;
            this.message = error.message;
            this.$toast.add({severity:'error', summary: 'Error Message', detail: this.message , life: 3000});
            
          }
        );
    
        }
    },
    computed: {
        logoColor() {
            if (this.$appState.darkTheme) return 'white';
            return 'dark';
        }
    }
}
</script>

<style scoped>
.pi-eye {
    transform:scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform:scale(1.6);
    margin-right: 1rem;
}
</style>