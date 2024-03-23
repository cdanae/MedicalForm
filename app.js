import dayjs from "https://cdn.skypack.dev/dayjs";

const consultForm = document.getElementById('consultForm');

const patientData = {};
const collectFormData = () => {
  const fieldsForm = consultForm.elements;

  for (let i = 0; i < fieldsForm.length; i++) {
    const field = fieldsForm[i];
    if (field.type !== 'submit') {
      patientData[field.name] = field.value;
    }
  }
}

const showDiagnosisForm = () => {
  const diagnosisForm = `
  <hr>
  <form id="diagnosisForm">
    <h2>Diagnósticos Aplicables</h2>
    <div>
      <label for="diagnosis1">Diagnóstico 1:</label>
      <input type="text" id="diagnosis1" name="diagnosis1" required>
    </div>
    <button type="submit">Imprimir</button>
  </form>
  `
  consultForm.insertAdjacentHTML('afterend', diagnosisForm);
}
const calculateAge = (dateBirth) => {
  const actualDate = dayjs();
  const dateBirthFormat = dayjs(dateBirth);
  const diffMonths = actualDate.diff(dateBirthFormat, 'month');
  const diffDays = actualDate.diff(dateBirthFormat, 'day');
  const diffHours = actualDate.diff(dateBirthFormat, 'hour');

  const years = Math.floor(diffMonths / 12);
  const months = diffMonths % 12;
  const days = diffDays % 30;
  const hours = diffHours % 24;

  const age = {
    years, months, days, hours
  }


  return age
}
const agePatient = (dateBirth) => {
  if(dateBirth) {
    const age = calculateAge(dateBirth);
    return age;
  } else {
    return 'NO'
  }
}
const filterDiagnosis = () => {
  console.log(agePatient(patientData.dateBirth));
}



const handleSubmit = (e) => {
  e.preventDefault();
  collectFormData();
  showDiagnosisForm();
  filterDiagnosis();
}



consultForm.addEventListener('submit', handleSubmit)



/* const getDiagnosis = async() => {
  const res =  await fetch('http://localhost:3000/:id')
  .then(response => response.json())

console.log( res, 'holis');
  return res
}
getDx() */