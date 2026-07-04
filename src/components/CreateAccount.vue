<script setup>
import {ref} from 'vue'
import {AccountType} from "@/enums/AccountType.js";

const emit = defineEmits(['create'])

const owner = ref('')
const initBalance = ref('')
const accountType = ref(AccountType.BASIC)
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
    accountType.value = AccountType.BASIC
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
      <option
          v-for="(item , index) in AccountType"
          :key="index"
          :value="item"
      >
        {{ item }}
      </option>
    </select>

    <input
        v-if="accountType === AccountType.SAVINGS"
        type="number"
        v-model="interestRate"
        placeholder="Interest Rate 0.05"
        step="0.01"
    />

    <button @click="create">Create</button>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>