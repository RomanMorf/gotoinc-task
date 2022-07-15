<template>
  <div class="modal_wrapper" @click="closeModal">
    <div class="modal_body">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>

export default {
  props: ['active'],
  methods: {
    closeModal(e){
      if (e.target.className === 'modal_wrapper') {
        this.$emit('closeModal')
      }
    }
  },
}
</script>