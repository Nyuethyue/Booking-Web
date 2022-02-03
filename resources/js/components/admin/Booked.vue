<template>
    <div class="container">
        <div class="row mt-5">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Book Now</h3>

                <div class="card-tools">
                    <button type="button" class="btn btn-success" data-toggle="modal" data-target="#staticBackdrop">
                      <span class="white">Book Now </span><i class="fas fa-user-plus white"></i>
                    </button>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      <th>SL No</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone No</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody >
                    <tr v-for="booked in bookeds" :key="booked.id">
                      <td>{{ booked.id}}</td>
                      <td>{{ booked.name}}</td>
                      <td>{{ booked.email}}</td>
                      <td>{{ booked.phone}}</td>
                      <td>{{ booked.date}}</td>
                      <td>{{ booked.time}}</td>
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
                <h5 class="modal-title" id="staticBackdropLabel">Book Now</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
             <form @submit.prevent="createBooked">
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
                                <input id="phone" v-model="form.phone" type="text" name="phone" placeholder="Enter Mobile Number" class="form-control">
                                <div v-if="form.errors.has('phone')" v-html="form.errors.get('phone')" />
                            </div>

                            <div class="form-group">
                                <input id="date" v-model="form.date" type="date" name="date" placeholder="Enter Date" class="form-control">
                                <div v-if="form.errors.has('date')" v-html="form.errors.get('date')" />
                            </div>

                            <div class="form-group">
                                <input id="time" v-model="form.time" type="time" name="time" placeholder="Enter Time" class="form-control">
                                <div v-if="form.errors.has('time')" v-html="form.errors.get('time')" />
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
            bookeds: {},

            form: new Form({
                name: '',
                email: '',
                phone: '',
                date: '',
                time: '',
            })
        }),

        methods: {

            // delete Admin
            async deleteAdmin (id) {
                const response = await this.form.delete('/api/adminuser/'+id)
                
            },

            // get admin
            getBooked () {
                axios.get("/api/booked").then(({ data }) => (this.bookeds = data.data));
            },

            // create admin
            async createBooked () {

                const response = await this.form.post('/api/booked')
                $('#staticBackdrop').modal('hide');
            }
        },

        created () {
            this.getBooked();
            setInterval(()=> this.getBooked(), 3000);
        }
    }
</script>
 