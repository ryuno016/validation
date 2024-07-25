const registrationForm = document.getElementById('registrationForm');

// 入力欄の要素
const nameInput = document.getElementById('name');
const kanaInput = document.getElementById('kana');
const birthdateInput = document.getElementById('birthdate');
const ageInput = document.getElementById('age');
const startDateInput = document.getElementById('startDate');
const addressInput = document.getElementById('address');
const phoneInput = document.getElementById('phone');
const departmentInput = document.getElementById('department');

// エラーメッセージの要素
const nameError = document.getElementById('nameError');
const kanaError = document.getElementById('kanaError');
const birthdateError = document.getElementById('birthdateError');
const startDateError = document.getElementById('startDateError');
const addressError = document.getElementById('addressError');
const phoneError = document.getElementById('phoneError');
const departmentError = document.getElementById('departmentError');

// バリデーション
const nameRegex = /^[^\d\s!"#\$%&'\(\)\*\+,\-\./:;<=>\?@\[\\\]\^_`\{\|\}~]+$/;
const kanaRegex = /^[ぁ-んー]+$/;
const addressRegex = /^[^\s!"#\$%&'\(\)\*\+,\-\./:;<=>\?@\[\\\]\^_`\{\|\}~]+$/;
const phoneRegex = /^\d+$/;
const departmentRegex = /^[^\d\s!"#\$%&'\(\)\*\+,\-\./:;<=>\?@\[\\\]\^_`\{\|\}~]+$/;

// 生年月日入力時の年齢計算関数
function calculateAge() {
  const birthdate = new Date(birthdateInput.value);
  const today = new Date();
  let age = today.getFullYear() - birthdate.getFullYear();
  if (today.getMonth() < birthdate.getMonth() || (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate())) {
    age--;
  }
  ageInput.value = age;
}

// バリデーションチェック関数
function validateForm() {
  let isValid = true;

  if (!nameRegex.test(nameInput.value)) {
    nameError.textContent = '名前は記号、数字、空白は使用できません';
    isValid = false;
  } else {
    nameError.textContent = '';
  }

  if (!kanaRegex.test(kanaInput.value)) {
    kanaError.textContent = 'フリガナはひらがなのみで入力してください';
    isValid = false;
  } else {
    kanaError.textContent = '';
  }

  if (!birthdateInput.value) {
    birthdateError.textContent = '生年月日を入力してください';
    isValid = false;
  } else {
    birthdateError.textContent = '';
  }

  if (!startDateInput.value) {
    startDateError.textContent = '入社日を入力してください';
    isValid = false;
  } else {
    startDateError.textContent = '';
  }

  if (!addressRegex.test(addressInput.value)) {
    addressError.textContent = '住所は記号、空白は使用できません';
    isValid = false;
  } else {
    addressError.textContent = '';
  }

  if (!phoneRegex.test(phoneInput.value)) {
    phoneError.textContent = '電話番号は数字のみで入力してください';
    isValid = false;
  } else {
    phoneError.textContent = '';
  }

  if (!departmentRegex.test(departmentInput.value)) {
    departmentError.textContent = '所属部署は記号、数字、空白は使用できません';
    isValid = false;
  } else {
    departmentError.textContent = '';
  }

  return isValid;
}

// イベントリスナー
birthdateInput.addEventListener('input', calculateAge);

registrationForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (validateForm()) {
    alert('社員情報が登録されました');
    registrationForm.reset();
  }
});
