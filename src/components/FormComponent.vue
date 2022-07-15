<template>
  <form class="form" @submit="preventDefault()" >
    <div class="mb-4">
      <h2 class="text-center" v-if="requestData.id">Edit request</h2>
      <h2 class="text-center" v-else>Create new request</h2>
    </div>
    <div class="mb-4 position-relative">
      <label for="city-to" class="form-label">Delivery to*</label>
      <input 
        type="text" 
        v-model="cityTo" 
        :class="`form-control ${($v.cityTo.$dirty && !$v.cityTo.required) || ($v.cityTo.$dirty && !$v.cityTo.minLength) ? 'is-invalid' : ''}`" 
        id="city-to" 
        placeholder="Enter destenation city name." 
        aria-describedby="city name" 
      >
      <small v-if="$v.cityTo.$dirty && !$v.cityTo.required" class="invalid-feedback position-absolute">Enter destenation city name.</small>
      <small v-if="$v.cityTo.$dirty && !$v.cityTo.minLength" class="invalid-feedback position-absolute">
        {{`City name mast be ${this.$v.cityTo.$params.minLength.min} symbols minimum, now ${this.cityTo.length}`}}
      </small>
    </div>
    <div class="mb-4 position-relative">
      <label for="city-from" class="form-label">Delivery from*</label>
      <input 
        type="text" 
        v-model="cityFrom"
        :class="`form-control ${($v.cityFrom.$dirty && !$v.cityFrom.required) || ($v.cityFrom.$dirty && !$v.cityFrom.minLength) ? 'is-invalid' : ''}`" 
        id="city-from" 
        aria-describedby="city name"
        placeholder="Enter your current city name."
      >
      <small v-if="$v.cityFrom.$dirty && !$v.cityFrom.required" class="invalid-feedback position-absolute">Enter your current city name.</small>
      <small v-if="$v.cityFrom.$dirty && !$v.cityFrom.minLength" class="invalid-feedback position-absolute">
        {{`City name mast be ${this.$v.cityFrom.$params.minLength.min} symbols minimum, now ${this.cityFrom.length}`}}
      </small>
    </div>
    <div class="mb-4 position-relative">
      <label for="type" class="form-label">Type of parcel*</label>
      <select 
        id="type" 
        v-model="parcelType" 
        :class="`form-select ${($v.parcelType.$dirty && !$v.parcelType.required) ? 'is-invalid' : ''}`" 
        aria-label="select type of parcel"
      >
        <option disabled selected> a type of parcel</option>
        <option value="gadgets">Gadgets</option>
        <option value="drinks">Drinks</option>
        <option value="clothes">Clothes</option>
        <option value="medicines">Medicines</option>
        <option value="other">Other</option>
      </select>
      <small v-if="$v.parcelType.$dirty && !$v.parcelType.required" class="invalid-feedback position-absolute">Please select the type of parcel</small>
    </div>
    <div class="mb-4">
      <label for="dispath" class="form-label">Date of dispatch</label>
      <input 
        type="datetime-local" 
        v-model="dispatchTill" 
        name="dispatch-to" 
        class="form-control" 
        id="dispath"
      >
    </div>
    <div class="mb-4">
      <label for="parcel-des" class="form-label">Description from parcel</label>
      <textarea v-model="parcelDes" class="form-control" id="parcel-des" rows="3"></textarea>
      <div class="form-text">Enter description for this parcel.</div>
    </div>
    <div class="d-flex justify-content-around">
      <button class="btn btn-primary mx-1" data-type="save" @click="handeSubmit" v-if="requestData.id">Save</button>
      <button class="btn btn-primary mx-1" data-type="create" @click="handeSubmit" v-else>Create</button>
      <button class="btn btn-primary mx-1" data-type="cancel" @click="handeSubmit">Cancel</button>
    </div>
  </form>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'

import { getDateStringForInput } from '@/helpers/getDateStringForInput'

export default {
  props: ['requestData'],
  data() {
    return {
      cityTo: '',
      cityFrom: '',
      parcelDes: '',
      dispatchTill: null,
      parcelType: '',
    }
  },
  validations: {
    cityTo: {
      required,
      minLength: minLength(4)
    },
    cityFrom: {
      required,
      minLength: minLength(4)
    },    
    parcelType: {
      required,
    },
  },
  methods: {
    handeSubmit(e){
      e.preventDefault();

      switch (e.target.dataset.type) {
        case 'cancel':
          this.closeForm()
        break;

        case 'save':
          this.saveRequest()
          break;

        case 'create':
          this.createNew()
          break;

        default:
          break;
      }
    },
    async createNew() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const newRequest = {
          id: `${Date.now()}`,
          cityTo: this.cityTo,
          cityFrom: this.cityFrom,
          parcelDes: this.parcelDes,
          dispatchTill: new Date(this.dispatchTill),
          parcelType: this.parcelType,
          createOn: new Date()
        }

        this.$emit('onCreate', newRequest)
        this.$emit('onClose')
      } catch (e) {
        console.log(e);
        throw e
      }
    },
    saveRequest(){
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const savedRequest = {
          id: this.requestData.id,
          createOn: this.requestData.createOn,

          cityTo: this.cityTo,
          cityFrom: this.cityFrom,
          parcelDes: this.parcelDes,
          parcelType: this.parcelType,
          dispatchTill: new Date(this.dispatchTill),
        }

        this.$emit('onSave', savedRequest)
      } catch (e) {
        console.log(e);
        throw e
      }
    },
    closeForm() {
      this.$emit('onClose')
    },
  },
  mounted() {
    if (Object.keys(this.requestData).length > 0) {
      this.cityTo = this.requestData.cityTo
      this.cityFrom = this.requestData.cityFrom
      this.parcelDes = this.requestData.parcelDes
      this.parcelType = this.requestData.parcelType
      this.dispatchTill = getDateStringForInput(this.requestData.dispatchTill)
    }
  },
}
</script>