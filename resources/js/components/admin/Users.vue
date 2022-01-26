<template>
    <div class="container">
        <div class="row mt-5">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Admin</h3>

                <div class="card-tools">
                    <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                      <span class="white">Add New Admin </span><i class="fas fa-user-plus white"></i>
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
                      <th>Type</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>183</td>
                      <td>John Doe</td>
                      <td>11-7-2014</td>
                      <td><span class="tag tag-success">Approved</span></td>
                      <td>
                          <a href="#">
                              <i class="fa fa-edit blue"></i>
                          </a>
                          /
                          <a href="#">
                              <i class="fa fa-trash red"></i>
                          </a>
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
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add New Admin</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
            
                    <form @submit.prevent="createAdmin" @keydown="form.onKeydown($event)">
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
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Form from 'vform'

    export default {
        data: () => ({
            form: new Form({
                name: '',
                email: '',
                phone_no: '',
                password: ''
            })
        }),

        methods: {
            async createAdmin () {
                const response = await this.form.post('/api/adminuser')
                // ...
            }
        },

        mounted () {
            console.log('Component Mounted');
        }
    }
</script>
