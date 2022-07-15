<template>
<table class="table">
  <thead>
    <tr>
      <th scope="col">#ID</th>
      <th scope="col">Created on</th>
      <th scope="col">City to</th>
      <th scope="col">City from</th>
      <th scope="col">Type of parcel</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(parcel, idx) in requests" :key="parcel.id">
      <th scope="row">{{ idx +1 }}</th>
      <td>{{ date(parcel.createOn) }}</td>
      <td>{{ parcel.cityTo }}</td>
      <td>{{ parcel.cityFrom }}</td>
      <td>{{ parcel.parcelType }}</td>
      <td>
        <span role="button" class="material-symbols-outlined" @click="editRequest(parcel.id)">edit</span>
        <span role="button" class="material-symbols-outlined ms-3" @click="deleteRequest(parcel.id)">delete</span>
      </td>
    </tr>
  </tbody>
</table>
</template>

<script>
import { getDate } from '@/helpers/getDate.js'

export default {
  props: ['requests'],
  methods: {
    editRequest(id){
      this.$emit('onEdit', id)
    },
    deleteRequest(id){
      this.$emit('onDelete', id)
    },
    date(date){
      return getDate(date)
    }
  },
}
</script>