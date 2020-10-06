const total       = document.querySelector('#totalAmount'),
      description = document.querySelector('#description'),
      incomeType  = document.querySelector('#incomeType'),
      expenseType = document.querySelector('#expenseType'),
      debtType    = document.querySelector('#debtType'),
      wealthType  = document.querySelector('#wealthType'),
      transAmt    = document.querySelector('#transactionAmount'),
      transForm   = document.querySelector('#transactionForm');

const dummyData = [
    {id: 1, description: 'Test', type: 'income', amount: 100}
]

let transactions = dummyData;

function addTransaction(e) {
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
        
        description.value = '';
        transAmt.value = '';
    }   
}

function generateRandomID() {
    return Math.floor(Math.random() * 1000000000);
}

function addTransactionToDOM(transaction) {

}

transForm.addEventListener('submit', addTransaction);
