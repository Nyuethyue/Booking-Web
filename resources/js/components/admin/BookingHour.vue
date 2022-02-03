<template>
    <div class="container">
        <div class="row mt-5">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Admin</h3>

                <div class="card-tools">
                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#staticBackdrop">
                      <span class="white">Add New Admin </span><i class="fas fa-user-plus white"></i>
                    </button>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      <th>Sl No</th>
                      <th>Time</th>
                      <th>ACtions</th>
                    </tr>
                  </thead>
                  <tbody >
                    <tr v-for="admin in admins" :key="admin.id">
                      <td>{{ admin.id }}</td>
                      <td>{{ admin.name }}</td>
                      <td>
                          <button class="btn btn-success btn-sm">Confirm</button>
                          <button class="btn btn-danger btn-sm">Cancel</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Add New Admin</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
             <form @submit.prevent="createAdmin">
                        <div class="modal-body">
                            <div class="form-group">
                                <input id="name" v-model="form.name" type="text" name="name" placeholder="Name" class="form-control">
                                <div v-if="form.errors.has('name')" v-html="form.errors.get('name')" />
                            </div>
                            <div class="form-group">
                                <input id="email" v-model="form.email" type="email" name="email" placeholder="Email" class="form-control">
                                <div v-if="form.errors.has('email')" v-html="form.errors.get('email')" />
                            </div>
                            <div class="form-group">
                                <input id="phone_no" v-model="form.phone_no" type="text" name="phone_no" placeholder="Enter Mobile Number" class="form-control">
                                <div v-if="form.errors.has('phone_no')" v-html="form.errors.get('phone_no')" />
                            </div>

                            <div class="form-group">
                                <input id="password" v-model="form.password" type="password" name="password" placeholder="Password" class="form-control">
                                <div v-if="form.errors.has('password')" v-html="form.errors.get('password')" />
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary" :disabled="form.busy">Save</button>
                        </div>
                    </form>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
    import Form from 'vform'
    import axios from 'axios'

    export default {
        data: () => ({
            admins: {},

            form: new Form({
                name: '',
            })
        }),

        methods: {

            // delete Admin
            async deleteAdmin (id) {
                const response = await this.form.delete('/api/adminuser/'+id)
                
            },
            // get admin
            loadAdmin () {
                axios.get("/api/adminuser").then(({ data }) => (this.admins = data.data));
            },

            // create admin
            async createAdmin () {

                const response = await this.form.post('/api/adminuser')
                $('#staticBackdrop').modal('hide');
            }
        },

        created () {
            this.loadAdmin();
            setInterval(()=> this.loadAdmin(), 3000);
        }
    }
</script>
 