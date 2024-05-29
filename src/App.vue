<script setup>
  import { useCustomerStore } from './stores/customer';
  import { onMounted } from 'vue';
  const customerStore = useCustomerStore();

  onMounted(() => {
    customerStore.getAllCustomer();
  })
</script>
<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <h2 class="text-center">Todo App</h2>
      </div>
    </div>
  </div>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-2">
        <div class="alert alert-success" v-if="customerStore.success">{{ customerStore.successMessage }}</div>
        <div class="card">
          <div class="card-title text-center">
            <span v-if="!customerStore.isEdit">Create Customer</span>
            <span v-else>Edit Customer</span>
          </div>
              <div class="card-body">
                <form>
                  <div class="mb-3">
                    <label class="form-label">Customer Name</label>
                    <input type="text" class="form-control" v-model="customerStore.customerForm.name">
                    <span class="text-danger" v-if="customerStore.errors.name">{{ customerStore.errors.name[0] }}</span>
                  </div>
                  <div class="mb-3">
                      <label class="form-label">Customer Email</label>
                      <input type="text" class="form-control" v-model="customerStore.customerForm.email">
                      <span class="text-danger" v-if="customerStore.errors.email">{{ customerStore.errors.email[0] }}</span>
                  </div>
                  <div>
                    <button v-if="!customerStore.isEdit" type="submit" class="btn btn-primary" @click.prevent="customerStore.storeCustomer">Create Customer</button>
                    <button v-else type="submit" class="btn btn-primary" @click.prevent="customerStore.updateCustomer(customerStore.editId)">Update Customer</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container mt-5">
        <div class="row">
          <div class="col-md-8 offset-2">
            <table class="table table-striped">
              <tr>
                <th>SL</th>
                <th>Customer Name</th>
                <th>Customer Email</th>
                <th>Action</th>
              </tr>
              <tr v-for="(customer,index) in customerStore.customers.data" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ customer.name }}</td>
                <td>{{ customer.email }}</td>
                <td>
                  <button class="btn btn-sm btn-primary" @click.prevent="customerStore.getCustomer(customer.id)">Edit</button>
                  <button class="btn btn-sm btn-danger" @click.prevent="customerStore.deleteCustomer(customer.id)">Delete</button>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
</template>