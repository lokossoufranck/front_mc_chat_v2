<template>
  <div class="grid p-fluid">
    <div class="col-12 md:col-6">
      <div class="card">
        <h5>Reporting</h5>

        <h5>Date de début</h5>
        <Calendar
          :showIcon="true"
          :showButtonBar="true"
          v-model="datedebut"
        ></Calendar>

        <h5>Date de fin</h5>
        <Calendar
          :showIcon="true"
          :showButtonBar="true"
          v-model="datefin"
        ></Calendar>

        <h5>Conseiller</h5>
        <MultiSelect
          v-model="agent"
          :options="users"
          optionLabel="username"
          placeholder="Veuillez selectionner un agent"
          :filter="true"
        >
          <template #value="slotProps">
            <div
              class="
                inline-flex
                align-items-center
                py-1
                px-2
                bg-primary
                text-primary
                border-round
                mr-2
              "
              v-for="option of slotProps.value"
              :key="option.id"
            >
              <!-- <span
                :class="'mr-2 flag flag-' + option.name.toLowerCase()"
                style="width: 18px; height: 12px"
              /> -->
              <i class="pi pi-check"></i>
              <div>{{ option.username }}</div>
            </div>
            <template v-if="!slotProps.value || slotProps.value.length === 0">
              <div class="p-1">Veuillez selectionner un agent</div>
            </template>
          </template>
          <template #option="slotProps">
            <div class="flex align-items-center">
              <span
                :class="
                  'mr-2 flag flag-' + slotProps.option.username.toLowerCase()
                "
                style="width: 18px; height: 12px"
              />
              <div>{{ slotProps.option.username }}</div>
            </div>
          </template>
        </MultiSelect>

        <span class="p-buttonset mt-4">
          <Button
            label="Reporting détaillé"
            @click="reporting"
            :loading="loading[0]"
            icon="pi pi-book"
            class="p-button-success"
          />
          <Button
            label="Reporting groupé par motif"
            @click="reporting_parmotif"
            :loading="loading[1]"
            icon="pi pi-chart-bar"
            class="p-button-secondary"
          />
          <Button
            label="Reporting groupé par numéro"
            :loading="loading[2]"
            @click="reporting_parnumero"
            icon="pi pi-phone"
            class="p-button-info"
          />
        </span>
        <!-- <div class="card">
                <Button
                  label="Afficher"
                  @click="afficher"
                  class="p-button-success mt-4 mr-2 mb-2"
                />
                <Button
                  label="Rapport Groupé"
                
                  class="p-button-success mt-4 mr-2 mb-2"
                />
        </div> -->
      </div>
    </div>

    <div class="col-12 xl:col-12">
      <div class="card">
        <h5>Statistiques</h5>

        <DataTable
       
          v-if="Closediscussions.length > 0 && typeReport =='DetailedReport'"
          id="datatable_statistique"
          ref="dt"
          :value="Closediscussions"
          :rows="5000"
          :paginator="true"
          responsiveLayout="scroll"
        >
          <Column
            field="id"
            header="ID"
            :sortable="true"
            style="width: 5%"
          ></Column>

          <Column
            field="ABONNE"
            header="ABONNE"
            :sortable="true"
            style="width: 5%"
          ></Column>

          <Column
            field="HEURE_RECEPTION_PREMIER_MSG"
            header="HEURE DE RECEPTION DU MESSAGE DE L'ABONNE"
            :sortable="true"
            style="width: 5%"
          >
            <template #body="slotProps">
              {{ slotProps.data.HEURE_RECEPTION_PREMIER_MSG }}
            </template>
          </Column>

          <Column
            field="HEURE_ENVOIE_PREMIERE_MSG"
            header="HEURE D'ENVOI DE LA PREMIERE REPONSE"
            :sortable="true"
            style="width: 5%"
          >
            <template #body="slotProps">
              {{ slotProps.data.HEURE_ENVOIE_PREMIERE_MSG }}
            </template>
          </Column>

          <Column
            field="HEURE_DEMANDE"
            header="HEURE DE LA DEMANDE"
            :sortable="true"
            style="width: 5%"
          >
            <template #body="slotProps">
              {{ slotProps.data.HEURE_DEMANDE }}
            </template>
          </Column>

          <Column
            field="HEURE_CLOTURE"
            header="HEURE DE CLOTURE DE LA CONVERSATION (HEURE DE TRAITEMENT)"
            :sortable="true"
            style="width: 5%"
          >
            <template #body="slotProps">
              {{ slotProps.data.HEURE_CLOTURE }}
            </template>
          </Column>

          <!--
          <Column
            field="DARR"
            header="DARR"
            :sortable="true"
            style="width: 35%"
          >
            <template #body="slotProps">
              {{ slotProps.data.DARR }}
            </template>
          </Column>
-->

          <Column
            field="libelle"
            header="STATUS"
            :sortable="true"
            style="width: 35%"
          >
            <template #body="slotProps">
              {{ slotProps.data.libelle }}
            </template>
          </Column>

          <Column
            field="DPRT"
            header="DELAI DE 1ERE REPONSE"
            :sortable="true"
            style="width: 35%"
          >
            <template #body="slotProps">
              {{ slotProps.data.DPRT }}
            </template>
          </Column>

          <Column
            field="TMTD"
            header="TEMPS DE TRAITEMENT"
            :sortable="true"
            style="width: 35%"
          >
            <template #body="slotProps">
              {{ slotProps.data.TMTD }}
            </template>
          </Column>

          <Column
            field="username"
            header="AGENT"
            :sortable="true"
            style="width: 35%"
          >
            <template #body="slotProps">
              {{ slotProps.data.username }}
            </template>
          </Column>

          <!-- <Column
            field="id"
            header="DATE"
            :sortable="true"
            style="width: 35%"
          >
            <template #body="slotProps">
              {{ this.myDateFormatter(slotProps.data.created_at) }}
            </template>
          </Column> -->
        </DataTable>

        <DataTable
          v-if="ByQuaData.length > 0 && typeReport =='GroupByQuaReport'"
          id="datatable_statistique"
          ref="dt"
          :value="ByQuaData"
          :rows="5000"
          :paginator="true"
          responsiveLayout="scroll"
        >
          <Column
            field="status_id"
            header="ID"
            :sortable="true"
            style="width: 5%"
          ></Column>

          <Column
            field="libelle"
            header="LIBELLE"
            :sortable="true"
            style="width: 5%"
          ></Column>

          <Column
            field="nb"
            header="OCCURENCE"
            :sortable="true"
            style="width: 5%"
          ></Column>
        </DataTable>

        <DataTable
          v-if="ByNumData.length > 0  && typeReport =='GroupByNumReport'"
          id="datatable_statistique"
          ref="dt"
          :value="ByNumData"
          :rows="5000"
          :paginator="true"
          responsiveLayout="scroll"
        >
        
          <Column
            field="wp_number_receiver"
            header="NUMERO"
            :sortable="true"
            style="width: 5%"
          ></Column>

          <Column
            field="nb"
            header="OCCURENCE"
            :sortable="true"
            style="width: 5%"
          ></Column>
        </DataTable>

        <div v-if="Closediscussions.length > 0">
          <Button
            label="Exporter CSV"
            icon="pi pi-file-excel"
            class="p-button-success p-button-sm"
            @click="exportCSV($event)"
          />
          <Button
            label="Exporter PDF"
            icon="pi pi-file-pdf"
            class="p-button-secondary p-button-sm mt-2"
            @click="exportPDF"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { mapState } from "vuex";
import jsPDF from "jspdf";
import "jspdf-autotable";
var moment = require("moment");
moment().locale("fr");
export default {
  data() {
    return {
      agent: null,
      datedebut: new Date(),
      datefin: new Date(),
      loading: [false, false, false],
      typeReport: "DetailedReport",
    };
  },
  methods: {
    ...mapActions([
      "discussion/getClosedDiscussions",
      "discussion/getClosedDiscussionsByUser",
      "discussion/getReportGroupByNumber",
      "discussion/getReportGroupByQualification",
      "auth/getUsers",
      "auth/getUsersBy",
    ]),
    reporting() {
      this.typeReport = "DetailedReport";
      this.loading[0] = true;
      const o = new Object();
      o.datedebut = moment(this.datedebut).format("YYYY/MM/DD 00:00:00");
      o.datefin = moment(this.datefin).format("YYYY/MM/DD 23:59:59");
      let str_users = "(";
      if (this.agent != null) {
        this.agent.forEach((element) => {
          str_users += element.id + ",";
        });
        str_users += "0)";
        o.user_id = str_users;
      } else {
        o.user_id = "(0)";
      }

      this["discussion/getClosedDiscussionsByUser"](o)
        .then((response) => {
          console.log(response);
        })
        .finally(() => {
          console.log("finally");
        });
    },
    reporting_parmotif() {
      this.typeReport = "GroupByQuaReport";
      this.loading[1] = true;
      const o = new Object();
      o.datedebut = moment(this.datedebut).format("YYYY/MM/DD 00:00:00");
      o.datefin = moment(this.datefin).format("YYYY/MM/DD 23:59:59");
      let str_users = "(";
      if (this.agent != null) {
        this.agent.forEach((element) => {
          str_users += element.id + ",";
        });
        str_users += "0)";
        o.user_id = str_users;
      } else {
        o.user_id = "(0)";
      }
      this["discussion/getReportGroupByQualification"](o);
    },
    reporting_parnumero() {
      this.typeReport = "GroupByNumReport";
      this.loading[2] = true;
      const o = new Object();
      o.datedebut = moment(this.datedebut).format("YYYY/MM/DD 00:00:00");
      o.datefin = moment(this.datefin).format("YYYY/MM/DD 23:59:59");
      let str_users = "(";
      if (this.agent != null) {
        this.agent.forEach((element) => {
          str_users += element.id + ",";
        });
        str_users += "0)";
        o.user_id = str_users;
      } else {
        o.user_id = "(0)";
      }
      this["discussion/getReportGroupByNumber"](o);
    },
    exportCSV() {
      this.$refs.dt.exportCSV();
    },
    exportPDF() {
      var doc = new jsPDF("p", "pt", "letter");
      doc.setFontSize(12);
      doc.setFontSize(10);
      doc.text(50, 50, "STATISTIQUES");
      doc.text(250, 50, "WHATSAPP");
      doc.text(
        "STATISTIQUES WHATSAPP DU " +
          this.myDateFormatter(this.datedebut) +
          " AU " +
          this.myDateFormatter(this.datefin),
        180,
        80
      );
      doc.autoTable({
        html: ".p-datatable-table",
        margin: { top: 100 },
        showFoot: "lastPage",
      });
      var NomFichier =
        "STATISTIQUES_WHATSAPP " + "_" + moment().format("DDMMYYYY") + ".pdf";
      const pages = doc.internal.getNumberOfPages();
      const pageWidth = doc.internal.pageSize.width; //Optional
      const pageHeight = doc.internal.pageSize.height; //Optional
      doc.setFontSize(10); //Optional

      for (let j = 1; j < pages + 1; j++) {
        let horizontalPos = pageWidth / 2; //Can be fixed number
        let verticalPos = pageHeight - 10; //Can be fixed number
        doc.setPage(j);
        doc.text(`${j} / ${pages}`, horizontalPos, verticalPos, {
          align: "center",
        });
      }
      doc.save(NomFichier);
    },
    myDateFormatter(date) {
      const dateTimeAgo = moment(date).format("DD/MM/YYYY");
      return dateTimeAgo;
    },

    myTimeFormatter(date) {
      var d = new Date(date);
      d = new Date(d.getTime() - 3000000);
      var date_format_str =
        d.getFullYear().toString() +
        "-" +
        ((d.getMonth() + 1).toString().length == 2
          ? (d.getMonth() + 1).toString()
          : "0" + (d.getMonth() + 1).toString()) +
        "-" +
        (d.getDate().toString().length == 2
          ? d.getDate().toString()
          : "0" + d.getDate().toString()) +
        " " +
        (d.getHours().toString().length == 2
          ? d.getHours().toString()
          : "0" + d.getHours().toString()) +
        ":" +
        ((parseInt(d.getMinutes() / 5) * 5).toString().length == 2
          ? (parseInt(d.getMinutes() / 5) * 5).toString()
          : "0" + (parseInt(d.getMinutes() / 5) * 5).toString()) +
        ":00";
      console.log(date_format_str);
      /*console.log(d.getUTCHours()); // Hours
console.log(d.getUTCMinutes());
console.log(d.getUTCSeconds());*/
      //  const dateTimeAgo = moment(d).format("DD/MM/YYYY HH:MM:SS");
      //  const dateTimeAgo = moment(date).locale("fr").fromNow();
      return date_format_str;
    },
  },
  watch: {
    //whenever Closediscussions change
    Closediscussions(newClosediscussions) {
      if (newClosediscussions.length > 0) {
        this.loading[0] = false;
      }
    },
    ByQuaData(NewByQuaData) {
      if (NewByQuaData.length > 0) {
        this.loading[1] = false;
      }
    },
    ByNumData(NewByNumData) {
      if (NewByNumData.length > 0) {
        this.loading[2] = false;
      }
    },
  },
  computed: {
    ...mapState({
      Closediscussions: (state) => state.discussion.Closediscussions,
      ByQuaData: (state) => state.discussion.ByQuaData,
      ByNumData: (state) => state.discussion.ByNumData,
      users: (state) => state.auth.users,
    }),
  },

  created() {
    const user = JSON.parse(localStorage.getItem("user"));
    const o = new Object();
    o.user_id = user.userId;
    this["auth/getUsersBy"](o);
  },
  mounted() {},
};
</script>
