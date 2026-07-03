<script setup>
import {ref, markRaw} from 'vue'
import BankAccount from '@/classes/BankAccount.js'
import SavingsAccount from '@/classes/SavingsAccount.js'
import {AccountType} from "@/enums/AccountType.js";
import CreateAccount from '@/components/CreateAccount.vue'
import AccountPanel from '@/components/AccountPanel.vue'

const accounts = ref([])
const error = ref('')

function createAccount(data) {
  error.value = ''

  try {
    let account;

    if (data.type === AccountType.SAVINGS) {
      account = new SavingsAccount(data.owner, data.initialBalance, data.interestRate)
    } else {
      account = new BankAccount(data.owner, data.initialBalance)
    }

    accounts.value = [...accounts.value, markRaw(account)]
  } catch (err) {
    error.value = err.message
  }
}
</script>

<template>
  <div class="app">
    <h1>Bank</h1>

    <CreateAccount @create="createAccount"/>

    <p v-if="error" class="error">{{ error }}</p>

    <div class="accounts-list" v-if="accounts.length">
      <h2>Accounts</h2>

      <AccountPanel
          v-for="(account, index) in accounts"
          :key="index"
          :account="account"
      />
    </div>
  </div>
</template>