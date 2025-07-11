function f1(){
    var input=document.getElementById("sbudget").value;
    var total = document.getElementById("tbudget");
    total.textContent=input;
     updatedbalance();

}
let expenseArray = [];

function f2() {
    const title = document.getElementById("expense-name").value;
    const amount = parseFloat(document.getElementById("camount").value);

    if (title && !isNaN(amount)) {
        expenseArray.push({ title, amount });

        // Update total expense shown in budget bar
        const totalExpense = expenseArray.reduce((sum, exp) => sum + exp.amount, 0);
        document.getElementById("cexpense").textContent = totalExpense;

        renderExpenseList();
        updatedbalance();

        // Clear input fields
        document.getElementById("expense-name").value = "";
        document.getElementById("camount").value = "";
    } else {
        alert("Please enter a valid expense title and amount.");
    }
}
function updatedbalance() {
    const budget = parseFloat(document.getElementById("tbudget").textContent) || 0;
    const totalExpense = expenseArray.reduce((sum, exp) => sum + exp.amount, 0);

    const balance = budget - totalExpense;

    document.getElementById("cexpense").textContent = totalExpense;
    document.querySelectorAll(".budget-item p")[2].textContent = balance;
}
function renderExpenseList() {
    const list = document.getElementById("expense-list");
    list.innerHTML = "";

    expenseArray.forEach((exp, index) => {
        const li = document.createElement("li");
        li.className = "expense-item";
        li.innerHTML = `
            <span>${exp.title}</span>
            <span>${exp.amount}</span>
            <div class="actions">
                <button onclick="editExpense(${index})">✏️</button>
                <button onclick="deleteExpense(${index})">🗑️</button>
            </div>
        `;
        list.appendChild(li);
    });
}

function deleteExpense(index) {
    expenseArray.splice(index, 1);
    renderExpenseList();
    updatedbalance();
}

function editExpense(index) {
    const exp = expenseArray[index];
    document.getElementById("expense-name").value = exp.title;
    document.getElementById("camount").value = exp.amount;
    deleteExpense(index);
}
