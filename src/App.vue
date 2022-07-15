<template>
  <div class="p-1">
    <button class="btn btn-primary" @click="createNewRequest">Create new Request</button>

    <TableComponent 
      v-if="requestsList.length" 
      :requests="requestsData"
      @onEdit="requestStartEdit"
      @onDelete="requestDelete"
    />
    <p v-else class="text-center">No requests now. <span role="button" @click="createNewRequest">Create new Requst</span></p>

    <ModalComponent v-if="formOpen" @closeModal="formClose" :active="formOpen">
      <template v-slot:body>
        <div class="form_wrapper ">
          <FormComponent 
            :requestData="currentRequest" 
            @onClose="formClose" 
            @onCreate="requestCreate"
            @onSave="requestSave"
          />
        </div>
      </template>
    </ModalComponent>

    <ModalComponent v-if="confirmDelModal" @closeModal="confirmDelModal = false">
      <template v-slot:body>
        <div>
          <h3 class="text-center">Confirm to delete this request</h3>
          <div class="d-flex justify-content-around">
            <button class="btn btn-primary mx-1" @click="confirmDelete">Delete</button>
            <button  class="btn btn-primary mx-1" @click="confirmDelModal = false">Cancel</button>
          </div>
        </div>
      </template>
    </ModalComponent>
  </div>

</template>

<script>
import { mapGetters, mapActions } from "vuex";
import FormComponent from '@/components/FormComponent.vue'
import TableComponent from '@/components/TableComponent.vue'
import ModalComponent from '@/components/ModalComponent.vue'

export default {
  name: 'ListView',
  data() {
    return {
      currentRequest: {},
      formOpen: false,
      requestsData: [],
      confirmDelModal: false,
      idForDelete: null,
    }
  },
  methods: {
    createNewRequest(){
      this.formOpen = !this.formOpen
    },
    requestStartEdit(id){
      const current = this.requestsList.filter(el => el.id === id)
      this.currentRequest = {...current[0]}
      this.formOpen = true
    },
    requestDelete(id){
      // const filtered = this.requestsList.filter(el => el.id !== id)
      // this.requestsUpdate(filtered)
      this.idForDelete = id
      this.confirmDelModal = true
    },
    confirmDelete(){
      const filtered = this.requestsList.filter(el => el.id !== this.idForDelete)
      this.requestsUpdate(filtered)
      this.confirmDelModal = false
    },
    requestCreate(newRequest){
      const requests = this.requestsList.push(newRequest)
      this.requestsUpdate(requests)
      this.formClose()
    },
    requestSave(savedRequest){
      const idx = this.requestsList.findIndex(el => el.id === savedRequest.id)
      const requests = this.requestsList
      requests[idx] = savedRequest

      this.requestsUpdate(requests)
      this.formClose()
    },
    formClose(){
      this.formOpen = false
      this.currentRequest = {}
    },
    updateTable() {
      this.requestsData = [...this.requestsList]
    },
    ...mapActions([
      'requestsGetFromLocal',
      'requestsUpdate',
      'requestCreate',
    ]),
  },
  computed: {
    ...mapGetters(["requestsList"]),
  },
  beforeUpdate() {
    this.updateTable()
  },
  async mounted() {
    this.requestsGetFromLocal()
    this.requestsData = this.requestsList
  },
  components: {
    FormComponent,
    TableComponent,
    ModalComponent,
  },
}

</script>

<style lang="scss">
</style>
