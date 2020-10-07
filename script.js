const total       = document.querySelector('#netWorth'),
      description = document.querySelector('#description'),
      incomeType  = document.querySelector('#incomeType'),
      expenseType = document.querySelector('#expenseType'),
      debtType    = document.querySelector('#debtType'),
      wealthType  = document.querySelector('#wealthType'),
      incomeList  = document.querySelector('#income'),
      expenseList = document.querySelector('#expense'),
      debtList    = document.querySelector('#debt'),
      wealthList  = document.querySelector('#wealth'),
      transAmt    = document.querySelector('#transactionAmount'),
      transForm   = document.querySelector('#transactionForm'),
      debits      = document.querySelector('#debits'),
      credits     = document.querySelector('#credits');

const dummyData = [
    {id: 1, description: 'Test', type: 'income', amount: 100},
    {id: 2, description: 'Test', type: 'expense', amount: -100},
    {id: 3, description: 'Test', type: 'debt', amount: -1100},
    {id: 4, description: 'Test', type: 'wealth', amount: 11100},
    {id: 11, description: 'Test', type: 'income', amount: 100},
    {id: 22, description: 'Test', type: 'expense', amount: -100},
    {id: 32, description: 'Test', type: 'debt', amount: -1100},
    {id: 42, description: 'Test', type: 'wealth', amount: 11100},
    {id: 12, description: 'Test', type: 'income', amount: 100},
    {id: 222, description: 'Test', type: 'expense', amount: -100},
    {id: 322, description: 'Test', type: 'debt', amount: -1100},
    {id: 4222, description: 'Test', type: 'wealth', amount: 11100},
]

let transactions = dummyData;

function createTransaction(e) {
    e.preventDefault();
    if (description.value === '' || transAmt.value === '') {
        // create popup here that says enter amount
    } else {

        const transTypes = document.getElementsByName('transType');
        let tranValue;

        transTypes.forEach(tran => {
            if(tran.checked) {
                tranValue = tran.value;
                tran.checked = false;
            }
        });

        const transaction = {
            id: generateRandomID(),
            description: description.value,
            type: tranValue,
            amount: parseFloat(transAmt.value)
        }

        transactions.push(transaction);

        addTransactionToDOM(transaction);
        calculateNetWorth();
        
        description.value = '';
        transAmt.value = '';
    }   
}

function generateRandomID() {
    return Math.floor(Math.random() * 1000000000);
}

function addTransactionToDOM(transaction) {    
    const element = document.createElement('li');
    const sign = transaction.type === 'income' || transaction.type === 'wealth' ? '' : '-';
    
    element.innerHTML = `${transaction.description}<span>${sign}${Math.abs(transaction.amount)}
                        <button class="btn danger-btn" onclick="removeTransaction(${transaction.id})">X</button>`;

    switch (transaction.type) {
        case 'income':
            incomeList.appendChild(element);
            break;
        case 'expense':
            expenseList.appendChild(element);
            break;
        case 'debt':
            debtList.appendChild(element);
            break;
        case 'wealth':
            wealthList.appendChild(element);
            break;
        default:
            break;
    }       
}

function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    init();
}

function calculateNetWorth(){
    const positiveAmounts = transactions.filter(transaction => {
        if (transaction.type === 'income' || transaction.type === 'wealth') {
            return transaction.amount
        }
    });

    const positiveAmountArr = positiveAmounts.map(amounts => amounts.amount);
    const totalDebits = positiveAmountArr.reduce((acc, amount) => (acc += amount), 0);
    debits.innerText = `$${totalDebits}`

    const negativeAmounts = transactions.filter(transaction => {
        if (transaction.type === 'expense' || transaction.type === 'debt') {
            return transaction.amount
        }
    });

    const negativeAmountArr = negativeAmounts.map(amounts => amounts.amount);
    const totalCredits = negativeAmountArr.reduce((acc, amount) => (acc += amount), 0);
    credits.innerText = `$${totalCredits}`

    const totalAmounts = transactions.map(amount => amount.amount);
    const netWorth = totalAmounts.reduce((acc, amount) => (acc += amount), 0);
    total.innerText = `$${netWorth}`;
    
}

function init() {
    incomeList.innerHTML = '';
    expenseList.innerHTML = '';
    debtList.innerHTML = '';
    wealthList.innerHTML = '';
    
    transactions.forEach(addTransactionToDOM);    
    calculateNetWorth();
}

init();

transForm.addEventListener('submit', createTransaction);
