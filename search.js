const employeeTable = document.getElementById("employeeTable");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

fetch("employees.json")
  .then((response) => response.json())
  .then((employees) => {
    displayEmployees(employees);

    // 検索機能
    searchButton.addEventListener("click", () => {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredEmployees = employees.filter((employee) => {
        return (
          employee.employee_name.toLowerCase().includes(searchTerm) ||
          employee.furigana.toLowerCase().includes(searchTerm)
        );
      });
      displayEmployees(filteredEmployees);
    });
  })
  .catch((error) => {
    console.error("JSONデータの読み込みに失敗しました:", error);
    // エラーメッセージ
  });

// 社員情報表示関数
function displayEmployees(employees) {
  employeeTable.innerHTML = `
    <tr>
      <th>社員名</th><th>ふりがな</th><th>生年月日</th><th>年齢</th>
      <th>入社日</th><th>住所</th><th>電話番号</th><th>所属部署</th>
    </tr>
  `;

  employees.forEach((employee) => {
    const row = employeeTable.insertRow();
    for (const key in employee) {
      const cell = row.insertCell();
      cell.textContent = employee[key];
    }
  });
}
