const Modal = {
  showModal() {
    // ADD or REMOVE class "active" to the modalOverlay
    document.querySelector('.modalOverlay').classList.toggle('active')
  }
}

const Storage = {
  get() {
    return JSON.parse(localStorage.getItem('dev.finances:transactions')) || []
  },

  set(transactions) {
    localStorage.setItem('dev.finances:transactions', JSON.stringify(transactions))
  }
}

const Transaction = {
  all: Storage.get(),
  
  add(transaction) {
    Transaction.all.unshift(transaction)
    App.reload()
  },

  remove(index) {
    Transaction.all.splice(index, 1)
    App.reload()
  },

  sumIncomes() {
    let income = 0

    Transaction.all.forEach(transaction => {
      if (transaction.amount > 0) {
        income += transaction.amount
      }
    })

    return income
  },

  sumExpenses() {
    let expense = 0

    Transaction.all.forEach(transaction => {
      if (transaction.amount < 0) {
        expense += transaction.amount
      }
    })

    return expense
  },

  totalExpenses() {
    return Transaction.sumIncomes() + Transaction.sumExpenses()
  }
}

const DOM = {
  transactionsContainer: document.querySelector('#dataTable tbody'),

  addTransaction(transaction, index) {
    const tr = document.createElement('tr')
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
    tr.dataset.index = index

    DOM.transactionsContainer.appendChild(tr)
  },

  innerHTMLTransaction(transaction, index) {
    const CSSclass = transaction.amount > 0 ? 'income' : 'expense'

    const amount = Utils.formatCurrency(transaction.amount)

    const html = `
      <td class="description">${transaction.description}</td>
      <td class="${CSSclass}">${amount}</td>
      <td class="date">${transaction.date}</td>
      <td> <img onclick="Transaction.remove(${index})" src="./images/minus.svg" alt="Minus Signal"> </td>
    `
    return html
  },

  updateBalance() {
    document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.sumIncomes())
    document.getElementById('expenseDisplay').innerHTML = Utils.formatCurrency(Transaction.sumExpenses()) 
    document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.totalExpenses()) 
  },

  clearTransactions() {
    DOM.transactionsContainer.innerHTML = ''
  }
}

const Utils = {
  formatAmount(value) {
    value = value * 100

    return Math.round(value)
  },

  formatDate(date) {
    const splittedDate = date.split('-')
    return `${splittedDate[1]}/${splittedDate[2]}/${splittedDate[0]}`
  },

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

const Form = {
  description: document.querySelector('input#description'),
  amount: document.querySelector('input#amount'),
  date: document.querySelector('input#date'),

  getValues() {
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value,
    }
  },

  validateFields() {
    const { description, amount, date } = Form.getValues()

    if (description.trim() === '' || amount.trim() === '' || date.trim() === '') {
      throw new Error('Please fill in all fields')
    }
  },

  formatValues() {
    let { description, amount, date } = Form.getValues()

    amount = Utils.formatAmount(amount)
    date = Utils.formatDate(date)

    return {
      description,
      amount,
      date
    }
  },

  clearFields() {
    Form.description.value = ''
    Form.amount.value = ''
    Form.date.value = ''
  },

  submit(event) {
    event.preventDefault()

    try{
      Form.validateFields()
      const transaction = Form.formatValues()
      Transaction.add(transaction)
      Form.clearFields()
      Modal.showModal()
    } catch(error) {
      alert(error.message)
    }
  }
}

const App = {
  init() {
    Transaction.all.forEach(DOM.addTransaction)
    DOM.updateBalance()

    Storage.set(Transaction.all)
  },

  reload() {
    DOM.clearTransactions()
    App.init()
  }
}

App.init()