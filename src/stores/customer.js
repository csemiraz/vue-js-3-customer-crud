import { defineStore } from "pinia";
import axios from 'axios';

export const useCustomerStore = defineStore('customer', {
    state: () => ({
        customers: [],
        customerForm: {},
        errors: {},
        success: false,
        successMessage: '',
        isEdit: false,
        editId: 0,
    }),

    actions: {
        async getAllCustomer() {
            await axios.get('http://localhost/api/customer-api/public/api/customers')
                    .then((response)=> {
                        this.customers = response.data;
                        //console.log(response.data);
                    })
                    .catch((error)=> {
                        console.log(error);
                    })
        },

        async storeCustomer() {
            await axios.post('http://localhost/api/customer-api/public/api/customers', this.customerForm)

            
            .then((response)=> {
                this.customerForm = {};
                this.errors = {};
                this.success = true;
                this.successMessage = response.data.message;

                setInterval(()=> {
                    this.success = false;
                }, 2500);
                this.getAllCustomer();
            })
            .catch((error)=> {
                //console.log(error.response.data.errors);
                this.errors = error.response.data.errors;
            })
        },

        async deleteCustomer(id) {
            await axios.delete(`http://localhost/api/customer-api/public/api/customers/${id}`)

            .then((response)=> {
                this.success = true;
                this.successMessage = response.data.message;
                this.getAllCustomer();
                setInterval(() => {
                    this.success = false;
                }, 2500);
            })
        },

        async getCustomer(id) {
            await axios.get(`http://localhost/api/customer-api/public/api/customers/${id}`)
                .then((response)=> {
                    //console.log(response.data);
                    this.customerForm = response.data.data;
                    this.isEdit = true;
                    this.editId = id;
                })
        },

        async updateCustomer(id) {
            await axios.put(`http://localhost/api/customer-api/public/api/customers/${id}`, this.customerForm)
            .then((response)=> {
                this.customerForm = {};
                this.errors = {};
                this.success = true;
                this.successMessage = response.data.message;
                this.isEdit = false;
                this.getAllCustomer();

                setInterval(()=> {
                    this.success = false;
                }, 2500)
            })
            .catch((error)=> {
                this.errors = error.response.data.errors;
            })
        }


    }
})