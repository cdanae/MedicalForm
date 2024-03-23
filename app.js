import dayjs from "https://cdn.skypack.dev/dayjs";

/* CONSUMO DE API */

const getDiagnosis = async () => {
  const res = await fetch('https://api.editandoideas.com/technical-test/cat__cie_sis/')
    .then(response => response.json())
    .catch(err => console.log('Solicitud fallida', err));
  return res
}


/* DATOS DEL FORM */

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
  if (dateBirth) {
    const age = calculateAge(dateBirth);
    return age;
  } else {
    return 'NO'
  }
}

/* FILTRADO */

const filterDiagnosis = (gender) => {
  getDiagnosis()
    .then(data => {
      const filteredGender = data.filter(element => element.lsex === gender)
      const agePatient = calculateAge(patientData.dateBirth)
      
      
      /* const filteredAge = filteredGender.filter(element => element.linf >= "028D" && element.lsup <= "120A") */
      console.log('filteredAge', filteredGender)
    })
  
  // si edad es true
  // filtrar por edad de acuerdo al rango de linf y lsup
  // si edad es false
  // filtrar por linf === 'NO' && lsup === 'NO'
  console.log(agePatient(patientData.dateBirth));
}


/* SUBMIT */
const handleSubmit = (e) => {
  e.preventDefault();
  collectFormData();
  showDiagnosisForm();
  filterDiagnosis(patientData.gender);
}



consultForm.addEventListener('submit', handleSubmit)

