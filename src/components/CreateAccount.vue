<script setup>
import {ref} from 'vue'

const emit = defineEmits(['create'])

const owner = ref('')
const initBalance = ref('')
const accountType = ref('basic')
const interestRate = ref(0.5)
const error = ref('')

function create() {
  error.value = ''

  try {
    emit('create', {
      owner: owner.value,
      initialBalance: Number(initBalance.value),
      type: accountType.value,
      interestRate: Number(interestRate.value)
    })
    owner.value = ''
    initBalance.value = ''
    accountType.value = 'basic'
    interestRate.value = 0.5
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

    <select v-model="accountType">
      <option value="basic">Basic Account</option>

      <option value="savings">Savings Account</option>
    </select>

    <input
        v-if="accountType === 'savings'"
        type="number"
        v-model="interestRate"
        placeholder="Interest Rate 0.05"
        step="0.01"
    />

    <button @click="create">Create</button>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>