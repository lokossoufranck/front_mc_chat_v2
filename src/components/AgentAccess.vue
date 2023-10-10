<template>
	<div class="block grid">
		<div class="col-12">
			<div class="grid">
				<div class="col-12 lg:col-6 xl:col-3">
					<div class="card mb-0">
						<div class="flex justify-content-between ">
							<div>
								<span class="block text-500 font-medium mb-3">Connecté</span>
								<div class="text-900 font-medium text-xl">{{Userstat.comptC}}</div>
							</div>
							<div class="flex align-items-center justify-content-center bg-green-100 border-round" style="width:2.5rem;height:2.5rem">
								<i class="pi pi-window-minimize text-green-500 text-xl"></i>
							</div>
						</div>
					</div>
				</div>

				<div class="col-12 lg:col-6 xl:col-3">
					<div class="card mb-0">
						<div class="flex justify-content-between ">
							<div>
								<span class="block text-500 font-medium mb-3">Déconnecté</span>
								<div class="text-900 font-medium text-xl">{{Userstat.comptD}}</div>
							</div>
							<div class="flex align-items-center justify-content-center bg-pink-100 border-round" style="width:2.5rem;height:2.5rem">
								<i class="pi pi-sign-out text-pink-500 text-xl"></i>
							</div>
						</div><!-- 
						<span class="text-green-500 font-medium">520  </span>
						<span class="text-500">newly registered</span> -->
					</div>
				</div>

				<div class="col-12 lg:col-6 xl:col-3">
					<div class="card mb-0">
						<div class="flex justify-content-between ">
							<div>
								<span class="block text-500 font-medium mb-3">Neutre</span>
								<div class="text-900 font-medium text-xl">{{Userstat.comptN}}</div>
							</div>
							<div class="flex align-items-center justify-content-center bg-orange-100 border-round" style="width:2.5rem;height:2.5rem">
								<i class="pi pi-stop-circle text-orange-500 text-xl"></i>
							</div>
						</div><!-- 
						<span class="text-green-500 font-medium">%52+ </span>
						<span class="text-500">since last week</span> -->
					</div>
				</div>

				
			</div>
			<div class="card">
				<span>{{radioToString}}</span>
				<Dialog header="Reinitialisation" v-model:visible="display" :breakpoints="{'960px': '75vw'}" :style="{width: '30vw'}" :modal="true">
								<p class="line-height-3 m-0">
									Mot de passe de <span class="text-blue-600 font-bold ">{{nameuser}}</span> reinitialisé avec succès
								</p>
								<template #footer>
									<Button label="Ok" @click="close" icon="pi pi-check" class="p-button-outlined"/>
								</template>
							</Dialog>
				<DataTable :value="allusers" :paginator="true" class="p-datatable-gridlines" :rows="10" dataKey="id" :rowHover="true" 
							v-model:filters="filters1" filterDisplay="menu" :loading="loading1" :filters="filters1" responsiveLayout="scroll"
							:globalFilterFields="['name','country.name','representative.name','balance','status']" >
					
					<template #header>
                        <div class="flex justify-content-between flex-column sm:flex-row">
                            <Button type="button" icon="pi pi-filter-slash" label="Défiltrer" class="p-button-outlined p-button-secondary mb-2" @click="clearFilter1()"/>
                            <span class="p-input-icon-left mb-2">
                                <i class="pi pi-search" />
                                <InputText v-model="filters1['global'].value" placeholder="Rechercher" style="width: 100%"/>
                            </span>
                        </div>
                    </template>
                    <template #empty>
                        Aucun agent trouvé.
                    </template>
                    <template #loading>
                        Chargement des agents. Veuillez patienter.
                    </template>
                    <Column field="name" header="Name" style="min-width:12rem">
                        <template #body="{data}">
                            {{data.username}}
                        </template>
                        <template #filter="{filterModel}">
                            <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name"/>
                        </template>
                    </Column>
                    <!-- <Column header="Country" filterField="country.name" style="min-width:12rem">
                        <template #body="{data}">
                            <img src="../assets/demo/flags/flag_placeholder.png" :alt="data.country.name" :class="'flag flag-' + data.country.code" width="30" />
                            <span style="margin-left: .5em; vertical-align: middle" class="image-text">{{data.country.name}}</span>
                        </template>
                        <template #filter="{filterModel}">
                            <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by country"/>
                        </template>
                        <template #filterclear="{filterCallback}">
                            <Button type="button" icon="pi pi-times" @click="filterCallback()" class="p-button-secondary"></Button>
                        </template>
                        <template #filterapply="{filterCallback}">
                            <Button type="button" icon="pi pi-check" @click="filterCallback()" class="p-button-success"></Button>
                        </template>
                    </Column> -->
                    <!-- <Column header="Agent" filterField="representative" :showFilterMatchModes="false" :filterMenuStyle="{'width':'14rem'}" style="min-width:14rem">
                        <template #body="{data}">
                            <img :alt="data.representative.name" :src="'images/avatar/' + data.representative.image" width="32" style="vertical-align: middle" />
                            <span style="margin-left: .5em; vertical-align: middle" class="image-text">{{data.representative.name}}</span>
                        </template> -->
                        <!-- <template #filter="{filterModel}">
                            <div class="mb-3 text-bold">Agent</div>
                            <MultiSelect v-model="filterModel.value" :options="representatives" optionLabel="name" placeholder="Aucun" class="p-column-filter">
                                <template #option="slotProps">
                                    <div class="p-multiselect-representative-option">
                                        <img :alt="slotProps.option.name" :src="'images/avatar/' + slotProps.option.image" width="32" style="vertical-align: middle" />
                                        <span style="margin-left: .5em; vertical-align: middle" class="image-text">{{slotProps.option.name}}</span>
                                    </div>
                                </template>
                            </MultiSelect>
                        </template> 
                    </Column> -->
					<Column header="Date de fin de connexion" filterField="date" dataType="numeric" style="min-width:6rem">
                        <template #body="{data}">
                        <p v-if="data.updated_at">{{(formDate(data.updated_at))}}</p>
						<p v-else>---</p>
                        </template>
						<!-- 
                        <template #filter="{filterModel}">
                            <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
                        </template> -->
                    </Column>
					<Column header="Heure de fin connexion" filterField="balance" dataType="numeric" style="min-width:5rem">
						<template #body="{data}">
							<p v-if="data.updated_at">{{(formHeure(data.updated_at))}}</p>
							<p v-else>---</p>
						</template>
						<!-- <template #filter="{filterModel}">
							<Calendar v-model="filterModel.value" placeholder="Heure" :showTime="true" :timeOnly="true" hourFormat="24" />
						</template>  -->
					</Column>
					<Column field="balance" header="Status" :filterMenuStyle="{'width':'20rem'}" style="min-width:12rem">
                        <template #body="{data}">
							<!-- {{typeof(data.is_on_line)}}	 -->
							<div class="grid col-12">
								<div class="col-12 md:col-4 ">
									<div class="field-radiobutton mb-0">
										<div><RadioButton id="option1" name="option" value=1 v-model="data.is_on_line"  @change="radio_post(data.id,data.is_on_line)" /></div>
									</div>
								</div>
								<div class="col-12 md:col-4 ">
									<div class="field-radiobutton mb-0">
										<div><RadioButton id="option2" name="option" value=2 v-model="data.is_on_line" @change="radio_post(data.id,data.is_on_line)" /></div>
									</div>
								</div>
								<div class="col-12 md:col-4">
									<div class=" field-radiobutton mb-0">
										<div><RadioButton id="option3" name="option" value=0 v-model="data.is_on_line" @change="radio_post(data.id,data.is_on_line)" /></div>
									</div>
								</div>
							</div>
							<div class="grid col-12">
								<div class="col-12 md:col-4 ">
									<div> <label for="option1">ON</label></div>
								</div>
								<div class="col-12 md:col-4 ">
									<div><label for="option2">NE</label></div>
								</div>
								<div class="col-12 md:col-4">
									<div><label for="option3">OFF</label></div>
								</div>
							</div>
                        </template>
                    </Column>
					<Column field="status" header="Mode" :filterMenuStyle="{'width':'14rem'}" style="min-width:5rem">
                        <template #body="{data}">
							<div class="min-w-full border-round bg-green-100 text-green-700 font-medium py-3 px-4 flex align-items-center justify-content-center" v-if="data.is_on_line==1">Connecté</div>
							<div class="min-w-full border-round bg-pink-100 text-pink-500 font-medium py-3 px-4 flex align-items-center justify-content-center" v-else-if="data.is_on_line==0">Eteint</div>
							<div class="min-w-full border-round bg-orange-200 text-orange-700 font-medium py-3 px-4 flex align-items-center justify-content-center" v-else>Neutre</div>
                        </template>
                        <!-- <template #filter="{filterModel}">
                            <Dropdown v-model="filterModel.value" :options="statuses" placeholder="Any" class="p-column-filter" :showClear="true">
                                <template #value="slotProps">
                                    <span :class="'customer-badge status-' + slotProps.value" v-if="slotProps.value">{{slotProps.value}}</span>
                                    <span v-else>{{slotProps.placeholder}}</span>
                                </template>
                                <template #option="slotProps">
                                    <span :class="'customer-badge status-' + slotProps.option">{{slotProps.option}}</span>
                                </template>
                            </Dropdown>
                        </template> -->
                    </Column>
					<Column header="Reinitialiser" filterField="Activity" dataType="numeric" style="min-width:5rem">
						<template #body="{data}">
							<Button @click="ResetMdp(data.id,data.username)" label="Reset" class="p-button-rounded p-button-outlined p-button-secondary" />
						</template>
						<!-- <template #filter="{filterModel}">
							<Calendar v-model="filterModel.value" placeholder="Heure" :showTime="true" :timeOnly="true" hourFormat="24" />
						</template>  -->
					</Column>
					<!-- -------------------------------------------------------------------- -->
					<!-- -------------------------------------------------------------------- -->
					<!-- begin of switch input -->
                    <!-- <Column field="status" header="Status" :filterMenuStyle="{'width':'14rem'}" style="min-width:12rem">
                        <template #body="{data}">
							<div class="">
								<p>{{data.is_on_line}}</p> 
								<InputSwitch  class="" v-model="data.is_on_line" @click="hello(data.is_on_line,data.id)"/>
								<div v-if="data.is_on_line" class="customer-badge status-Connecté">Connecté</div>
								<div v-else class="customer-badge status-Déconnecté">Déconnecté</div>
							</div> 
                        </template>
                        <template #filter="{filterModel}">
                            <Dropdown v-model="filterModel.value" :options="statuses" placeholder="Aucun" class="p-column-filter" :showClear="true">
                                <template #value="slotProps">
                                    <span :class="'customer-badge status-' + slotProps.value" v-if="slotProps.value">{{slotProps.value}}</span>
                                    <span v-else>{{slotProps.placeholder}}</span>
                                </template>
                                <template #option="slotProps">
                                    <span :class="'customer-badge status-' + slotProps.option">{{slotProps.option}}</span>
                                </template>
                            </Dropdown>
                        </template>
                    </Column> -->
					<!-- end of switch input -->
					<!-- -------------------------------------------------------------------- -->
					<!-- -------------------------------------------------------------------- -->
                    <!-- <Column field="activity" header="Activity" :showFilterMatchModes="false" style="min-width:12rem">
                        <template #body="{data}">
                            <ProgressBar :value="data.activity" :showValue="false" style="height:.5rem"></ProgressBar>
                        </template>
                        <template #filter={filterModel}>
                            <Slider v-model="filterModel.value" range class="m-3"></Slider>
                            <div class="flex align-items-center justify-content-between px-2">
                                <span>{{filterModel.value ? filterModel.value[0] : 0}}</span>
                                <span>{{filterModel.value ? filterModel.value[1] : 100}}</span>
                            </div>
                        </template>
                    </Column> -->
                    <!-- <Column field="verified" header="Verified" dataType="boolean" bodyClass="text-center" style="min-width:8rem">
                        <template #body="{data}">
                            <i class="pi" :class="{'text-green-500 pi-check-circle': data.verified, 'text-pink-500 pi-times-circle': !data.verified}"></i>
                        </template>
                        <template #filter={filterModel}>
                            <TriStateCheckbox v-model="filterModel.value" />
                        </template>
                    </Column> -->
				</DataTable>
			</div>
		</div>

<!-- -------------------------------------------- -->

		<!-- <div class="col-12">
			<div class="card">
				<h5>Frozen Columns</h5>
                <ToggleButton v-model="idFrozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="Unfreeze Id" offLabel="Freeze Id" style="width: 10rem" />

                <DataTable :value="customer2" :scrollable="true" scrollHeight="400px" :loading="loading2" scrollDirection="both" class="mt-3">
                    <Column field="name" header="Name" :style="{width:'150px'}" frozen></Column>
                    <Column field="id" header="Id" :style="{width:'100px'}" :frozen="idFrozen"></Column>
                    <Column field="name" header="Name" :style="{width:'200px'}"></Column>
                    <Column field="country.name" header="Country" :style="{width:'200px'}">
						<template #body="{data}">
							<img src="../assets/demo/flags/flag_placeholder.png" :class="'flag flag-' + data.country.code" width="30" />
							<span style="margin-left: .5em; vertical-align: middle" class="image-text">{{data.country.name}}</span>
						</template>
					</Column>
                    <Column field="date" header="Date" :style="{width:'200px'}"></Column>
                    <Column field="company" header="Company" :style="{width:'200px'}"></Column>
                    <Column field="status" header="Status" :style="{width:'200px'}">
						<template #body="{data}">
                            <span :class="'customer-badge status-' + data.status">{{data.status}}</span>
                        </template>
					</Column>
                    <Column field="activity" header="Activity" :style="{width:'200px'}"></Column>
                    <Column field="representative.name" header="Representative" :style="{width:'200px'}">
						<template #body="{data}">
                            <img :alt="data.representative.name" :src="'images/avatar/' + data.representative.image" width="32" style="vertical-align: middle" />
                            <span style="margin-left: .5em; vertical-align: middle" class="image-text">{{data.representative.name}}</span>
                        </template>
					</Column>
                    <Column field="balance" header="Balance" :style="{width:'150px'}" frozen alignFrozen="right">
                        <template #body="{data}">
                            <span class="text-bold">{{formatCurrency(data.balance)}}</span>
                        </template>
                    </Column>
                </DataTable>
			</div>
		</div> -->

<!-- -------------------------------------------- -->

		<!-- <div class="col-12">
			<div class="card">
				<h5>Row Expand</h5>
				<DataTable :value="products" v-model:expandedRows="expandedRows" dataKey="id" responsiveLayout="scroll">
					<template #header>
						<div>
							<Button icon="pi pi-plus" label="Expand All" @click="expandAll" class="mr-2 mb-2" />
							<Button icon="pi pi-minus" label="Collapse All" @click="collapseAll" class="mb-2" />
						</div>
					</template>
					<Column :expander="true" headerStyle="width: 3rem" />
					<Column field="name" header="Name" :sortable="true">
						<template #body="slotProps">
							{{slotProps.data.name}}
						</template>
					</Column>
					<Column header="Image">
						<template #body="slotProps">
							<img :src="'images/product/' + slotProps.data.image" :alt="slotProps.data.image" class="shadow-2" width="100" />
						</template>
					</Column>
					<Column field="price" header="Price" :sortable="true">
						<template #body="slotProps">
							{{formatCurrency(slotProps.data.price)}}
						</template>
					</Column>
					<Column field="category" header="Category" :sortable="true">
					<template #body="slotProps">
							{{formatCurrency(slotProps.data.category)}}
						</template></Column>
					<Column field="rating" header="Reviews" :sortable="true">
						<template #body="slotProps">
							<Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
						</template>
					</Column>
					<Column field="inventoryStatus" header="Status" :sortable="true">
						<template #body="slotProps">
							<span :class="'product-badge status-' + (slotProps.data.inventoryStatus ? slotProps.data.inventoryStatus.toLowerCase() : '')">{{slotProps.data.inventoryStatus}}</span>
						</template>
					</Column> 
					<template #expansion="slotProps">
						<div class="p-3">
							<h5>Orders for {{slotProps.data.name}}</h5>
							<DataTable :value="slotProps.data.orders" responsiveLayout="scroll">
								<Column field="id" header="Id" :sortable="true">
									<template #body="slotProps">
										{{slotProps.data.id}}
									</template>
								</Column>
								<Column field="customer" header="Customer" :sortable="true">
									<template #body="slotProps">
										{{slotProps.data.customer}}
									</template>
								</Column>
								<Column field="date" header="Date" :sortable="true">
									<template #body="slotProps">
										{{slotProps.data.date}}
									</template>
								</Column>
								<Column field="amount" header="Amount" :sortable="true">
									<template #body="slotProps" :sortable="true">
										{{formatCurrency(slotProps.data.amount)}}
									</template>
								</Column>
								<Column field="status" header="Status" :sortable="true">
									<template #body="slotProps">
										<span :class="'order-badge order-' + (slotProps.data.status ? slotProps.data.status.toLowerCase() : '')">{{slotProps.data.status}}</span>
									</template>
								</Column>
								<Column headerStyle="width:4rem">
									<template #body>
										<Button icon="pi pi-search" />
									</template>
								</Column>
							</DataTable>
						</div>
					</template>
				</DataTable>
			</div>
		</div> -->

<!-- -------------------------------------------- -->

		<!-- <div class="col-12">
			<div class="card">
				<h5>Subheader Grouping</h5>
				<DataTable :value="customer3" rowGroupMode="subheader" groupRowsBy="representative.name"
                    sortMode="single" sortField="representative.name" :sortOrder="1" scrollable scrollHeight="400px">
                    <Column field="representative.name" header="Representative"></Column>
                    <Column field="name" header="Name" style="min-width:200px"></Column>
                    <Column field="country" header="Country" style="min-width:200px">
                        <template #body="slotProps">
                            <img src="../assets/demo/flags/flag_placeholder.png" :class="'flag flag-' + slotProps.data.country.code" width="30" />
                            <span class="image-text ml-2">{{slotProps.data.country.name}}</span>
                        </template>
                    </Column>
                    <Column field="company" header="Company" style="min-width:200px"></Column>
                    <Column field="status" header="Status" style="min-width:200px">
                        <template #body="slotProps">
                            <span :class="'customer-badge status-' + slotProps.data.status">{{slotProps.data.status}}</span>
                        </template>
                    </Column>
                    <Column field="date" header="Date" style="min-width:200px"></Column>
                    <template #groupheader="slotProps">
						<img :alt="slotProps.data.representative.name" :src="'images/avatar/' + slotProps.data.representative.image" width="32" style="vertical-align: middle" />
                        <span class="image-text font-bold ml-2">{{slotProps.data.representative.name}}</span>
                    </template>
                    <template #groupfooter="slotProps">
                        <td style="text-align: right" class="text-bold pr-6">Total Customers: {{calculateCustomerTotal(slotProps.data.representative.name)}}</td>
                    </template>
                </DataTable>
			</div>
		</div> -->
	</div>
</template>

<script>
	import { mapActions } from "vuex";
	import { mapState } from "vuex";
	import { mapGetters } from "vuex";
	import {FilterMatchMode,FilterOperator} from 'primevue/api';
	import CustomerService from "../service/CustomerService";
	import UserService from "../service/UserService";
	import ProductService from '../service/ProductService';
	import UIser from "../models/user";
	import axios from 'axios';
	import AuthService from "../service/AuthService";
	/* import InputSwitch from 'primevue/inputswitch'; */
	/* import moment from 'moment'
	import momente from 'moment/min/moment-with-locales' */
	var moment = require("moment");
	moment().locale("fr");
	import { API_URL,  User} from '../settings';
	export default {
		components: {
			/* InputSwitch	 */
		},
		data() {
			return {
				nameuser:'',
				AllUsersOnline: [],
				selectButtonValues1: [
					{name: 'Option 1', code: 'O1'},
					{name: 'Option 2', code: 'O2'},
					{name: 'Option 3', code: 'O3'},
				],
				password: 'moov',
				display: false ,
				user_profile: new UIser("", "", "", ""),
				customer1: null,
				allusers: [],
				customer2: null,
				customer3: null,
				filters1: null,
				filters2: {},
				loading1: true,
				loading2: true,
				idFrozen: false,
				products: null,
				expandedRows: [],
				checked: true,
				dateFormat: Date,
				stat: '',
				is_on_line:'',
				intIsOnLine: null,
				line: '',
				number:1,
				string: "1",
				valeur:"",
				statuses: [
					'unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal'
				],
				/* statuses: [
					'unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal'
				], */
				representatives: [
					{name: "Amy Elsner", image: 'amyelsner.png'},
					{name: "Anna Fali", image: 'annafali.png'},
					{name: "Asiya Javayant", image: 'asiyajavayant.png'},
					{name: "Bernardo Dominic", image: 'bernardodominic.png'},
					{name: "Elwin Sharvill", image: 'elwinsharvill.png'},
					{name: "Ioni Bowcher", image: 'ionibowcher.png'},
					{name: "Ivan Magalhaes",image: 'ivanmagalhaes.png'},
					{name: "Onyama Limba", image: 'onyamalimba.png'},
					{name: "Stephen Shaw", image: 'stephenshaw.png'},
					{name: "XuXue Feng", image: 'xuxuefeng.png'}
				],
			}
		},
		userService: null,
		customerService: null,
		productService: null,
		created() {
			this.customerService = new CustomerService();
			this.userService = new UserService();
			this.productService = new ProductService();
			this.initFilters1();
		},
		mounted() {
			const user = JSON.parse(localStorage.getItem("user"));
    AuthService.finUser(user.userId).then((res) => {
      this.user_profile = res.data;
    });
			/* this.str() */
			/* this.UsersOnline() */
			/* this.productService.getProductsWithOrdersSmall().then(data => this.products = data); */
			this.customerService.getCustomersLarge().then(data => {
				this.customer1 = data; 
				this.loading1 = false;
				//this.customer1.forEach(customer => customer.date = new Date(customer.date));
			});
			this.userService.getAllUsers().then(data => {
				this.allusers = data; 
				this.loading1 = false;
				console.log(this.allusers.length)
				//this.customer1.forEach(customer => customer.date = new Date(customer.date));
			});
			/* this.authService.getAllUsers().then(data => {
				this.allusers = data; 
				this.loading1 = false;
				console.log(this.allusers.length)
				//this.customer1.forEach(customer => customer.date = new Date(customer.date));
			}); */
			console.log(this.allusers)
			/* this.customerService.getCustomersLarge().then(data => this.customer2 = data);
			this.customerService.getCustomersMedium().then(data => this.customer3 = data); */
			this.loading2 = false;
			/* this.convert(); */
		},
		computed: {
			...mapGetters(["auth/get_user"]),
			...mapState({
			user: (state) => state.auth.user,
			}),
			
			count: function() {
				/* for (let user_single of this.allusers) {
						console.log('id ' + user_single.id +' et statut ' + user_single.is_on_line)
					}
				return console.log('allusers' + this.line); */
				return 'hi'
    },
			radioToString: function(){
				for (let user_single of this.allusers) {
					/* console.log(user_single) */
					user_single.is_on_line = String(user_single.is_on_line)
					/* console.log('id ' + user_single.id +' et statut ' + user_single.is_on_line) */
					}
				return console.log("fantastique")
			},
			Userstat: function() {
				
					let comptC=0, comptN=0, comptD=0
					for (let user_single of this.allusers) {
						if(user_single.is_on_line == 1) {
							comptC ++;
						}
						else if(user_single.is_on_line == 0) {
							comptD ++;
						}
						else {
							comptN ++;
						}
					
						}
						return {comptC,comptN,comptD};
					},

		
    },
		methods: {
			...mapActions(["auth/updateUser"]),
			
			ResetMdp(value,thisuser) {
			
			const o = new Object();
			this.user_profile.id = value;
			this.user_profile.password = this.password;
			
			o.id = this.user_profile.id;
			o.password = this.user_profile.password;
			
			this["auth/updateUser"](o);
			this.nameuser = thisuser;
			this.display = true;
			
			
			/* alert('Enregistrement effectué'); */
			},
			radio_post(id,on_line){
				//14/06/2022 recuperation de la connexion et deconnexion
					/* console.log("mon id " + id + " mon statut " + active) */
					this.intIsOnLine = parseInt(on_line)
					axios.put(API_URL + User + id, {
							is_on_line: this.intIsOnLine
					} ).then(response => {
						this.AllUsersOnline = response.data
						console.log(this.AllUsersOnline)
					})
					console.log(id,on_line)
					console.log(this.intIsOnLine + " type " + typeof(this.intIsOnLine))
					console.log(this.allusers)
					
			},
			close(){
					this.display = false;
			},

			form(value){
				return !!parseInt(value)
			},

			formDate(value){
			if (value) {
				return (moment(String(value)).format('MM/DD/YYYY'))
			}
			},

			formHeure(value){
			if (value) {
				return (moment(String(value)).format('HH:MM'))
			}
			},

			initFilters1() {
				this.filters1 = {
					'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
					'name': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
					'country.name': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
					'representative': {value: null, matchMode: FilterMatchMode.IN},
					'date': {operator: FilterOperator.OR, constraints: [{value: null, matchMode: FilterMatchMode.DATE_IS}]},
					'balance': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
					'status': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
					'activity': {value: null, matchMode: FilterMatchMode.BETWEEN},
					'verified': {value: null, matchMode: FilterMatchMode.EQUALS}
				}
			},

			clearFilter1() {
				this.initFilters1();
			},

			expandAll() {
				this.expandedRows = this.products.filter(p => p.id);
			},

			collapseAll() {
				this.expandedRows = null;
			},

			formatHour(value) {
				return value.toLocaleString('fr-FR', {
					hour: '2-digit',
					minute: '2-digit'});
			},
			
			formatDate(value) {
				return value.toLocaleDateString('fr-FR', {
					day: '2-digit',
					month: '2-digit',
					year: 'numeric',
				});
			},

			calculateCustomerTotal(name) {
				let total = 0;
				if (this.customer3) {
					for (let customer of this.customer3) {
						if (customer.representative.name === name) {
							total++;
						}
					}
				}

				return total;
			},

			convert() {
					console.log(this.allusers)
			}
		}
	}
</script>

<style scoped lang="scss">
@import '../assets/demo/badges.scss';

::v-deep(.p-datatable-frozen-tbody) {
    font-weight: bold;
}

::v-deep(.p-datatable-scrollable .p-frozen-column) {
    font-weight: bold;
}

.p-inputswitch:not(.p-disabled):hover .p-inputswitch-slider {
  background: #b6bfc8;
}
.p-inputswitch.p-inputswitch-checked .p-inputswitch-slider {
  background: #000000;
}
</style>
