const employeeTable = document.getElementById("employeeTable");
const sortSelect = document.getElementById("sortSelect");
const sortButton = document.getElementById("sortButton");

// JSONデータの読み込みと初期表示
fetch("employees.json")
  .then((response) => response.json())
  .then((employees) => {
    displayEmployees(employees);

    sortButton.addEventListener("click", () => {     //ユーザーがソートボタンをクリックする。
      const sortType = sortSelect.value;             //選択されているソートタイプを取得する。
      const sortedEmployees = sortEmployees(employees, sortType);//社員データをソートする。
      displayEmployees(sortedEmployees);//ソート後のデータをテーブルに表示する。
    });
  });

// 社員情報の関数
function displayEmployees(employees) {//ソートされた社員データを受け取り、そのデータをHTMLテーブルに表示する役割
  employeeTable.innerHTML = `
    <tr>
      <th>社員名</th><th>ふりがな</th><th>生年月日</th><th>年齢</th>
      <th>入社日</th><th>住所</th><th>電話番号</th><th>所属部署</th>
    </tr>
  `;
//配列に格納されている各社員の情報を、HTMLのテーブル (employeeTable) に行 (<tr>) として追加していく処理
  employees.forEach((employee) => {//.fotEach = 配列の各要素に対して、指定されたコールバック関数を順番に実行するメソッド
    const row = employeeTable.insertRow();//(社員情報テーブル) の末尾に新しい行 (<tr>) を挿入し、その行への参照を row 変数に格納
    for (const key in employee) {//オブジェクトのプロパティ名を列挙する
      const cell = row.insertCell();//現在の行 (row) の末尾に新しいセル (<td>) を挿入し、そのセルへの参照を cell 変数に格納
      cell.textContent = employee[key];//社員データ (employee) の key で指定されたプロパティの値を設定
    }
  });
}

// 社員情報をソートする関数
function sortEmployees(employees, sortType) {
  if (sortType === "") {
    // 名前（通常）の場合、元の順序を返す
    return employees;
  }

  return employees.slice().sort((a, b) => {//配列（社員データ全体）の浅いコピーを作成
    const key = getSortKey(sortType);//取得した値を比較し、比較結果（a が b より前か後か）を sort メソッドに返す
    const compareValueA = a[key];//全ての要素のペアに対して比較と並び替えを繰り返し、ソートされた新しい配列を生成
    const compareValueB = b[key];

    // 年齢の場合、数値として比較する
    if (key === "age") {
      return sortType === "ageAsc" ? compareValueA - compareValueB : compareValueB - compareValueA;
    } else {
      // ふりがな（昇順・降順）の場合、日本語文字列として適切に比較する
      if (sortType === "nameDesc") {
        // 降順の場合は、比較結果を反転させるだけでなく、
        // 同じ文字列の場合は昇順で比較する
        const result = compareValueA.localeCompare(compareValueB);
        return result === 0 ? -1 : -result;
      } else {
        // 昇順の場合はそのまま localeCompare を使う
        return compareValueA.localeCompare(compareValueB);
      }
    }
  });
}

// ソートタイプに対応するキーを取得する関数
function getSortKey(sortType) {
  const keyMap = {
    "": "furigana", // 名前（通常）をふりがな順に変更
    nameAsc: "furigana",
    nameDesc: "furigana",
    ageAsc: "age",
    ageDesc: "age",
  };
  return keyMap[sortType];
}
