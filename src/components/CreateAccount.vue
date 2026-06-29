<script setup>
import {ref} from 'vue'

const emit = defineEmits(['create'])

const owner = ref('')
const initBalance = ref('')
const error = ref('')

function create() {
  error.value = ''

  try {
    emit('create', owner.value, Number(initBalance.value))
    owner.value = ''
    initBalance.value = ''
  } catch (err) {
    error.value = err.message
  }
}
</script>

<template>
  <div class="create-account">
    <h2>Create Account</h2>

    <input v-model="owner" placeholder="Owner name"/>
    <input type="number" v-model="initBalance" placeholder="Initial balance"/>

    <button @click="create">Create</button>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>
