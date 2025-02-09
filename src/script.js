document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expenseForm");
    const expenseTable = document.getElementById("expenseTable");

    // โหลดข้อมูลจาก LocalStorage
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    renderExpenses();

    // เพิ่มข้อมูลใหม่
    expenseform.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const title = document.getElementById("title").value;
        const amount = document.getElementById("amount").value;
        const category = document.getElementById("category").value;
        const date = document.getElementById("date").value;

        const expense = { id: Date.now(), title, amount, category, date };
        expenses.push(expense);
        localStorage.setItem("expenses", JSON.stringify(expenses));

        expenseform.reset();
        renderExpenses();
    });

    // แสดงรายการค่าใช้จ่าย
    function renderExpenses() {
        expenseTable.innerHTML = "";
        expenses.forEach(expense => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="border p-2">${expense.title}</td>
                <td class="border p-2">${expense.amount} บาท</td>
                <td class="border p-2">${expense.category}</td>
                <td class="border p-2">${expense.date}</td>
                <td class="border p-2 text-center">
                    <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="deleteExpense(${expense.id})">ลบ</button>
                </td>
            `;
            expenseTable.appendChild(row);
        });
    }

    // ลบข้อมูล
    window.deleteExpense = (id) => {
        expenses = expenses.filter(expense => expense.id !== id);
        localStorage.setItem("expenses", JSON.stringify(expenses));
        renderExpenses();
    };
});