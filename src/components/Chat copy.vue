<template>
  <div class="grid">
    <div class="col-4">
      <div class="card">
        <div class="flex align-items-center justify-content-between mb-4">
          <h5>Discussions {{ this.mode }}</h5>
          <div>
            <Button
              icon="pi pi-ellipsis-v"
              class="p-button-text p-button-plain p-button-rounded"
              @click="$refs.menu1.toggle($event)"
            ></Button>
            <Menu ref="menu1" :popup="true" :model="items"></Menu>
          </div>
        </div>

        <ul class="p-0 mx-0 mt-0 mb-4 list-none">
          <li
            v-for="(item, index) in latestInputmessages"
            :key="index"
            class="flex align-items-center py-2 border-bottom-1 surface-border"
            style="cursor: pointer"
            @click="changeChat(item)"
          >
            <div
              class="
                w-3rem
                h-3rem
                flex
                align-items-center
                justify-content-center
                bg-blue-100
                border-circle
                mr-3
                flex-shrink-0
              "
            >
              <i class="pi pi-whatsapp text-xl text-blue-500"></i>
            </div>
            <span class="text-500 line-height-3">
              <span class="text-blue-500">{{ item.wp_number_sender }}</span>
              <br />
              <span class="text-00">{{ item.body }} </span>
              <br />

              <span class="text-green-500 text-xm font-italic"
                >{{ this.myDateAgoFormatter(item.created_at) }}
              </span>

              <br />
              <Badge
                v-if="item.news_msg_count > 0"
                :value="item.news_msg_count"
                severity="success"
                class="mr-2"
              ></Badge>
            </span>
          </li>
        </ul>
      </div>
    </div>

    <div
      v-if="this.mode == 'discussion_affiche'"
      class="col-8"
      style="height: 300px overflow: scroll"
    >
      <div class="col-12">
        <div class="card">
          <h5>Menu</h5>
          <Toolbar>
            <template v-slot:start>
              <Button
                label="Statuer"
                icon="pi pi-plus"
                class="p-button-secondary mr-2"
                @click="openNew"
              />

              <!-- 	<Button icon="pi pi-check" class="p-button-success mr-2" />
						<Button icon="pi pi-trash" class="p-button-warning mr-2" />
						<Button icon="pi pi-print" class="p-button-danger" /> -->
            </template>
            <template v-slot:end>
              <Button
                label="Fermer"
                icon="pi pi-times-circle"
                @click="fermer"
                class="p-button-danger mr-2"
              />
              <!-- <SplitButton label="Options" :model="toolbarItems"></SplitButton> -->
            </template>
          </Toolbar>
          <Dialog
            v-model:visible="statuerDialog"
            :style="{ width: '450px' }"
            header="Statuer une discussion"
            :modal="true"
            class="p-fluid"
          >
            <!-- <div class="field">
              <label for="name">Nom abonnée</label>
              <InputText
                id="name"
                v-model.trim="discussion.name"
                required="false"
                autofocus
                :class="{ 'p-invalid': submitted && !discussion.name }"
              />
              <small class="p-invalid" v-if="submitted && !discussion.name"
                >Le nom de l'abonné est requis.</small
              >
            </div>
            <div class="field">
              <label for="description">Description</label>
              <Textarea
                id="description"
                v-model="discussion.description"
                required="true"
                rows="3"
                cols="20"
              />
            </div> -->

            <div class="field">
              <label for="inventoryStatus" class="mb-3">Status</label>

              <Dropdown
                v-model="status_selected"
                :options="allStatus"
                optionLabel="libelle"
                :class="{ 'p-invalid': submitted && !status_selected }"
                placeholder="Veuillez sélectionner le status"
              />
              <small class="p-invalid" v-if="submitted && !status_selected"
                >Veuillez sélectionner le status.</small
              >
            </div>

            <template #footer>
              <Button
                label="Annuler"
                icon="pi pi-times"
                class="p-button-text"
                @click="hideDialog"
              />
              <Button
                label="Enregistrer"
                icon="pi pi-check"
                class="p-button-text"
                @click="saveStatus"
              />
            </template>
          </Dialog>
        </div>
      </div>

      <div v-for="(oneMsg, ind) in messagesBySubcriber" :key="ind">
        <div
          v-if="oneMsg.sender == 1"
          class="
            col-12
            flex
            justify-content-end
            flex-wrap
            card-container
            yellow-container
          "
        >
          <div class="col-8 lg:col-8 xl:col-8">
            <div class="card mb-0 bg-blue-500">
              <div class="flex justify-content-between mb-3">
                <div>
                  <div>
                    <span class="block text-xm font-medium mb-3 text-white">{{
                      oneMsg.wp_number_sender
                    }}</span>

                    <!-- DEBUT Si image -->
                    <div
                      v-if="oneMsg.type == 'image'"
                      class="text-900 font-medium text-xl"
                    >
                      <Button
                        type="button"
                        icon="pi pi-image"
                        label="Image"
                        @click="toggle"
                        class="p-button-success xs"
                      />
                      <OverlayPanel
                        ref="op"
                        appendTo="body"
                        :showCloseIcon="true"
                      >
                        <img :src="API_URL + oneMsg.filename" alt="Nature 9" />
                      </OverlayPanel>
                    </div>
                    <!-- FIN Si image -->

                    <!-- DEBUT Si audio -->
                    <div
                      v-if="oneMsg.type == 'ptt'"
                      class="text-900 font-medium text-xl"
                    >
                      <Button
                        type="button"
                        label="Audio"
                        @click="toggle"
                        icon="pi pi-play"
                        class="p-button-success"
                      />
                      <OverlayPanel
                        ref="op"
                        appendTo="body"
                        :showCloseIcon="true"
                      >
                        <img src="images/nature/nature9.jpg" alt="Nature 9" />
                      </OverlayPanel>
                    </div>
                    <!-- FIN Si audio -->

                    <!-- DEBUT Si Text -->
                    <div
                      v-else-if="oneMsg.type == 'chat'"
                      class="text-900 font-medium text-xm"
                    >
                      {{ oneMsg.body }}
                    </div>
                    <!-- FIN Si Text -->
                  </div>
                </div>
                <div
                  class="
                    flex
                    align-items-center
                    justify-content-center
                    bg-blue-100
                    border-round
                  "
                  style="width: 2.5rem; height: 2.5rem"
                >
                  <i class="pi pi-user text-blue-500"></i>
                </div>
              </div>
              <span class="text-green text-xs font-italic">
                {{ this.myDateAgoFormatter(oneMsg.created_at) }}
                <!--  {{ new Date(oneMsg.created_at).toLocaleDateString() }}
                {{ new Date(oneMsg.created_at).toLocaleTimeString() }} -->
              </span>
            </div>
          </div>
        </div>

        <div
          v-else
          class="
            col-12
            flex
            justify-content-start
            flex-wrap
            card-container
            yellow-container
          "
        >
          <div class="col-8 lg:col-8 xl:col-8">
            <div class="card mb-0">
              <div class="flex justify-content-between mb-3">
                <div>
                  <span class="block font-medium mb-3"> CONSEILLER </span>
                  <div class="text-500 text-blue-500">
                    {{ oneMsg.body }}
                  </div>
                </div>
                <div
                  class="
                    flex
                    align-items-center
                    justify-content-center
                    bg-blue-100
                    border-round
                  "
                  style="width: 2.5rem; height: 2.5rem"
                >
                  <i class="pi pi-key text-blue-500 text-xl"></i>
                </div>
              </div>
              <!-- <span class="text-green-500 font-medium">24 new </span> -->
              <span class="text-xs font-italic">
                {{ this.myDateAgoFormatter(oneMsg.created_at) }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="this.mode == 'discussion_affiche'" class="grid p-fluid">
        <div class="col-12">
          <div class="card">
            <h5>Message</h5>
            <Textarea
              v-model="body_new_msg"
              placeholder="Votre Message"
              :autoResize="true"
              rows="3"
              cols="30"
            />

            <Button
              @click.prevent="envoyerMessage"
              label="Envoyer"
              class="p-button-success mr-2 mb-2"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from "@/AppEventBus";
var moment = require("moment");
moment().locale("fr");
import ProductService from "../service/ProductService";
import MessageService from "../service/MessageService";
//import DiscussionStatusService from "../service/DiscussionStatusService";
import { mapActions } from "vuex";
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import io from "socket.io-client";
import { API_URL } from "../settings";
export default {
  data() {
    return {
      message: [],
      API_URL: API_URL,
      display: false,
      displayConfirmation: false,
      visibleLeft: false,
      visibleRight: false,
      visibleTop: false,
      visibleBottom: false,
      visibleFull: false,
      body_new_msg: "",
      statuerDialog: false,
      discussion: {},
      submitted: false,
      status_selected: false,
      dropdownValues: [
        { name: "New York", code: "NY" },
        { name: "Rome", code: "RM" },
        { name: "London", code: "LDN" },
        { name: "Istanbul", code: "IST" },
        { name: "Paris", code: "PRS" },
      ],

      toolbarItems: [
        {
          label: "Save",
          icon: "pi pi-check",
        },
        {
          label: "Update",
          icon: "pi pi-upload",
        },
        {
          label: "Delete",
          icon: "pi pi-trash",
        },
        {
          label: "Home Page",
          icon: "pi pi-home",
        },
      ],
      cardMenu: [
        { label: "Save", icon: "pi pi-fw pi-check" },
        { label: "Update", icon: "pi pi-fw pi-refresh" },
        { label: "Delete", icon: "pi pi-fw pi-trash" },
      ],
      products: null,
      lineData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: "Revenue",
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: "#2f4860",
            borderColor: "#2f4860",
            tension: 0.4,
          },
          {
            label: "Sales",
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: "#00bb7e",
            borderColor: "#00bb7e",
            tension: 0.4,
          },
        ],
      },
      items: [
        { label: "Add New", icon: "pi pi-fw pi-plus" },
        { label: "Remove", icon: "pi pi-fw pi-minus" },
      ],
      lineOptions: null,
    };
  },
  computed: {
    ...mapGetters(["message/getMode"]),
    ...mapState({
      latestInputmessages: (state) => state.message.latestInputmessages,
      messagesBySubcriber: (state) => state.message.messagesBySubcriber,
      mode: (state) => state.message.mode,
      displayMessage: (state) => state.message.displayMessage,
      allStatus: (state) => state.message.allStatus,
      user: (state) => state.auth.user,
      status: (state) => state.discussion_status.status,
    }),
  },
  productService: null,
  themeChangeListener: null,
  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    const o = new Object();
    o.user_id = user.userId;
    this["message/getLatestInputmessages"](o);
    console.log(this["message/getMode"]);
    this["message/getAllStatus"]();
    this.productService
      .getProductsSmall()
      .then((data) => (this.products = data));

    this.themeChangeListener = (event) => {
      if (event.dark) this.applyDarkTheme();
      else this.applyLightTheme();
    };
    EventBus.on("change-theme", this.themeChangeListener);

    if (this.isDarkTheme()) {
      this.applyDarkTheme();
    } else {
      this.applyLightTheme();
    }
  },
  beforeUnmount() {
    EventBus.off("change-theme", this.themeChangeListener);
  },
  created() {
    this.productService = new ProductService();
    this.join();
  },
  methods: {
    ...mapActions([
      "message/getLatestInputmessages",
      "message/getMessagesBySubcriber",
      "message/readMessagesBySubcriber",
      "message/getAllStatus",
      "message/setupDisplayMessage",
      "message/sendMessage",
      "discussion_status/create",
    ]),
    join() {
      this.joined = true;
      this.socketInstance = io(API_URL);

      this.socketInstance.on("message:received", (data) => {
        this.messages = this.messages.concat(data);
      });

      this.socketInstance.on("disconnect", () => {
        const user = JSON.parse(localStorage.getItem("user"));
        var user_connected = new Object();
        user_connected.id = user.userId;
        this.$store.dispatch("auth/logout", user_connected);
      });

      this.socketInstance.on("news_message", (new_msg) => {
        //actualisation de la file de discution (Actualisation du nombre de message non lu)
        const user = JSON.parse(localStorage.getItem("user"));
        const o = new Object();
        o.user_id = user.userId;
        this["message/getLatestInputmessages"](o);
        if (this.mode == "discussion_affiche") {
          console.log(this.mode);
          // Une conversation est affiché
          if (
            new_msg.wp_number_sender == this.displayMessage.wp_number_sender
          ) {
            //Actualisation de la file de
            // Affichage actualisé du détail de la discution
            this["message/getMessagesBySubcriber"](this.displayMessage);
          }
        }
      });
    },
    saveStatus() {
      this.submitted = true;

      if (!this.user.userId) {
        alert("Problème de récuperation de l'utilisateur");
      }
      if (!this.displayMessage.discussion_id) {
        alert("Problème de récuperation de la conversation");
      }

      if (this.status_selected) {
        const ostatus = new Object();
        ostatus.user_id = this.user.userId;
        ostatus.discussion_id = this.displayMessage.discussion_id;
        ostatus.status_id = this.status_selected.id;
        this["discussion_status/create"](ostatus);
        this.$store.commit("message/setMode", "simple");
        this["message/getLatestInputmessages"](ostatus);
        this.status_selected = null;
        this.submitted = false;
      }
    },
    fermer() {
      const ostatus = new Object();
      ostatus.user_id = this.user.userId;
      this.status_selected = null;
      this["discussion_status/create"](ostatus);
      this.$store.commit("message/setMode", "simple");
      this["message/getLatestInputmessages"](ostatus);
      this.status_selected = null;
      this.submitted = false;
    },
    openNew() {
      this.discussion = {};
      this.submitted = false;
      this.statuerDialog = true;
    },
    hideDialog() {
      this.statuerDialog = false;
      this.submitted = false;
    },
    open() {
      this.display = true;
    },
    close() {
      this.display = false;
    },
    openConfirmation() {
      this.displayConfirmation = true;
    },
    closeConfirmation() {
      this.displayConfirmation = false;
    },
    toggle(event) {
      this.$refs.op.toggle(event);
    },

    changeChat(subcriber) {
      this.$store.commit("message/setMode", "discussion_affiche");
      //Conservation de discution sur laquelle l'utilisateur a cliqué
      this["message/setupDisplayMessage"](subcriber);
      //update de la colone read
      this["message/readMessagesBySubcriber"](subcriber);
      // Affcichage du détail de la discution
      this["message/getMessagesBySubcriber"](subcriber);
      const user = JSON.parse(localStorage.getItem("user"));
      const o = new Object();
      o.user_id = user.userId;
      //Mise à jours de la file de discussion
      this["message/getLatestInputmessages"](o);
    },
    envoyerMessage() {
      const user = JSON.parse(localStorage.getItem("user"));
      const lemessage = new Object();
      lemessage.user_id = user.userId;
      lemessage.body = this.body_new_msg;
      lemessage.wp_number_sender = this.displayMessage.wp_number_receiver;
      lemessage.wp_number_receiver = this.displayMessage.wp_number_sender;
      lemessage.discussion_id = this.displayMessage.discussion_id;
      lemessage.has_media = "";
      lemessage.filename = "";
      lemessage.mimetype = "";
      if (this.body_new_msg.length > 0)
        MessageService.sendMessage(lemessage).then((response) => {
          if (response) {
            this["message/getMessagesBySubcriber"](this.displayMessage);
            this.body_new_msg = "";
          }
          //
        });

      /* this["message/sendMessage"](lemessage).then((res) => {
        console.log(res);
      });*/

      // Affcichage du détail de la discution
      //
    },
    formatCurrency(value) {
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },
    myDateAgoFormatter(date) {
      const dateTimeAgo = moment(date).locale("fr").fromNow();
      return dateTimeAgo;
    },
    isDarkTheme() {
      return this.$appState.darkTheme === true;
    },
    applyLightTheme() {
      this.lineOptions = {
        plugins: {
          legend: {
            labels: {
              color: "#495057",
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#495057",
            },
            grid: {
              color: "#ebedef",
            },
          },
          y: {
            ticks: {
              color: "#495057",
            },
            grid: {
              color: "#ebedef",
            },
          },
        },
      };
    },
    applyDarkTheme() {
      this.lineOptions = {
        plugins: {
          legend: {
            labels: {
              color: "#ebedef",
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#ebedef",
            },
            grid: {
              color: "rgba(160, 167, 181, .3)",
            },
          },
          y: {
            ticks: {
              color: "#ebedef",
            },
            grid: {
              color: "rgba(160, 167, 181, .3)",
            },
          },
        },
      };
    },
  },
};
</script>
