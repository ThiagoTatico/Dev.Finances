const Modal = {
  showModal() {
    // ADD or REMOVE class "active" to the modalOverlay
    document.querySelector('.modalOverlay').classList.toggle('active')
  }
}

const transactions = [
  {
    id: 1,
    description: 'Luz',
    amount: -50000,
    date: '23/01/2021'
  },
  {
    id: 2,
    description: 'Website',
    amount: 500000,
    date: '23/01/2021'
  },
  {
    id: 3,
    description: 'Internet',
    amount: -20000,
    date: '23/01/2021'
  }
]

const Transition = {
  sumIncomes() {},

  sumExpenses() {},

  totalExpenses() {}
}

const DOM = {
  transactionsContainer: document.querySelector('#dataTable tbody'),

  addTransaction(transaction, index) {
    const tr = document.createElement('tr')
    tr.innerHTML = DOM.innerHTMLTransaction(transaction)
    DOM.transactionsContainer.appendChild(tr)
  },

  innerHTMLTransaction(transaction) {
    const CSSclass = transaction.amount > 0 ? 'income' : 'expense'

    const amount = Utils.formatCurrency(transaction.amount)

    const html = `
      <td class="description">${transaction.description}</td>
      <td class="${CSSclass}">${amount}</td>
      <td class="date">${transaction.date}</td>
      <td> <img src="./images/minus.svg" alt="Minus Signal"> </td>
    `
    return html
  },

  updateBalance() {
    
  }
}

const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? '-' : ''

    value = String(value).replace(/\D/g, '')

    value = Number(value) / 100

    value = value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })

    return signal + value
  }
}

transactions.forEach(function (transaction) {
  DOM.addTransaction(transaction)
})
