export default class BankAccount {
    #balance = 0;

    constructor(owner, initialBalance = 0) {
        if (!owner) {
            throw new Error('owner must be a string')
        }

        if (initialBalance < 0) {
            throw new Error('initial balance must be a positive number')
        }

        this.owner = owner
        this.#balance = initialBalance
        this.history = []
    }

    deposit(amount) {
        if (amount <= 0) {
            throw new Error('deposit amount must be greater than 0')
        }

        this.#balance += amount
        this.#addHistory('deposit', amount);
    }

    withdraw(amount) {
        if (amount <= 0) {
            throw new Error('withdraw amount must be greater than 0')
        }

        if (amount > this.#balance) {
            throw new Error('Insufficient balance')
        }

        this.#balance -= amount
        this.#addHistory('withdraw', amount);
    }

    getBalance() {
        return this.#balance;
    }

    getHistory() {
        return this.history
    }

    #addHistory(type, amount) {
        this.history.push({
            type,
            amount,
        })
    }
}