<template>
    <div class="container">
        <div class="row mt-4">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Admin</h3>

                <div class="card-tools">
                    <button type="button" class="btn btn-success" @click="newModal">
                      <span  class="white">Add New Admin </span><i class="fas fa-user-plus white"></i>
                    </button>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone No</th>
                      <th>Created At</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody >
                    <tr v-for="admin in admins.data" :key="admin.id">
                      <td>{{ admin.id }}</td>
                      <td>{{ admin.name }}</td>
                      <td>{{ admin.email }}</td>
                      <td>{{ admin.phone_no }}</td>
                      <td>{{ admin.created_at }}d>
                      <td>
                          <a href="#" @click="editModal(admin)">
                              <i class="fa fa-edit blue"></i>
                          </a>
                          /
                          <a href="#" @click="deleteAdmin(admin.id)">
                              <i class="fa fa-trash red"></i>
                          </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
              <div class="card-footer">
                    <pagination :data="admins" @pagination-change-page="getResults">
                        <span slot="prev-nav">&lt; Previous</span>
	                    <span slot="next-nav">Next &gt;</span>
                    </pagination>
              </div>
            </div>
            <!-- /.card -->
          </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="addNew" tabindex="-1"  role="dialog" aria-labelledby="addNewLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" v-show="!editmode" id="addNewLabel">Add New Admin</h5>
                <h5 class="modal-title" v-show="editmode" id="addNewLabel">Update Admin Info</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
             <form @submit.prevent="editmode ? updateAmdin() : createAdmin()">
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
                            <button v-show="editmode" type="submit" class="btn btn-success">Update</button>
                            <button v-show="!editmode" type="submit" class="btn btn-primary">Save</button>
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
    import $ from 'jquery'

    export default {
        data: () => ({
            editmode: false,

            admins: {},

            form: new Form({
                id: '',
                name: '',
                email: '',
                phone_no: '',
                password: ''
            })
        }),

        methods: {

             // This method is for pagination
            getResults(page = 1) {
			axios.get('api/adminuser?page=' + page)
				.then(response => {
					this.admins = response.data;
				});
		    },

            // Open new modal
            newModal () {
                this.form.reset();
                $('#addNew').modal('show');
            },

            updateAmdin() {
                // console.log('editing data');
                this.$Progress.start();
                this.form.put('/api/adminuser/'+this.form.id)
                .then(() => {
                    $('#addNew').modal('hide');
                    Swal.fire(
                        'Updated!',
                        'Your info has been updated.',
                        'success'
                    )
                    Fire.$emit('AfterCreate');
                })
                .catch(() => {
                    this.$Progress.fail();
                })
            },

            editModal (admin) {
                this.editmode = true;
                this.form.reset();
                $('#addNew').modal('show');
                this.form.fill(admin);
            },

            // delete Admin
            deleteAdmin (id) {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                    })
                    .then((result) => {

                        if (result.value) {
                            this.form.delete('/api/adminuser/'+id).
                            then(() => {  
                                Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                                )   
                                Fire.$emit('AfterCreate');
                            })
                            .catch(() => {
                                Swal.fire(
                                    'Failed!',
                                    'There was something wrong.',
                                    'warning'
                                )
                            })
                        }
                    })
            },

            // get admin
            loadAdmin () {
                axios.get("/api/adminuser").then(({ data }) => (this.admins = data));
            },

            // create admin
            async createAdmin () {
                this.editmode = false;
                this.$Progress.start();
                const response = await this.form.post('/api/adminuser')
                .then(() => {
                    Fire.$emit('AfterCreate');
                    $('#addNew').modal('hide');
                    
                    Toast.fire({
                        icon: 'success',
                        title: 'Created in successfully'
                    });

                    this.$Progress.finish();
                })
                .catch(() => {

                })
            }
        },

        created () {
            this.loadAdmin();
            Fire.$on('AfterCreate', () => {
                this.loadAdmin();
            })
            // setInterval(()=> this.loadAdmin(), 3000);
        },
    }
</script>
 