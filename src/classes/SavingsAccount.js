import BankAccount from './BankAccount.js'

export default class SavingsAccount extends BankAccount {

    constructor(owner, initialBalance = 0, interestRate = 0.5) {
        super(owner, initialBalance)

        this.account = BankAccount;

        this.interestRate = interestRate
    }

    applyInterest() {
        const balance = this.getBalance()

        const interest = balance * this.interestRate

        this.deposit(interest)
    }
}