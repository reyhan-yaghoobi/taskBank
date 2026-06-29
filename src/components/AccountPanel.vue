<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  account: {
    type: Object,
    required: true
  }
})

const amount = ref('')
const error = ref('')
const historyVersion = ref(0)

const balance = computed(() => {
  historyVersion.value
  return props.account.getBalance()
})

const history = computed(() => {
  historyVersion.value
  return props.account.getHistory()
})

function deposit() {
  error.value = ''

  try {
    props.account.deposit(Number(amount.value))
    amount.value = ''
    historyVersion.value++
  } catch (err) {
    error.value = err.message
  }
}

function withdraw() {
  error.value = ''

  try {
    props.account.withdraw(Number(amount.value))
    amount.value = ''
    historyVersion.value++
  } catch (err) {
    error.value = err.message
  }
}
</script>

<template>
  <div class="account-panel">
    <h3>{{ account.owner }}</h3>

    <p>Balance: {{ balance }}</p>

    <input type="number" v-model="amount" placeholder="Amount" />
    <button @click="deposit">Deposit</button>
    <button @click="withdraw">Withdraw</button>

    <p v-if="error" class="error">{{ error }}</p>

    <ul v-if="history.length">
      <li v-for="(item, index) in history" :key="index">
        {{ item.type }} - {{ item.amount }} - {{ item.date }}
      </li>
    </ul>
  </div>
</template>
