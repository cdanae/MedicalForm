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

  const diffYears = actualDate.diff(dateBirthFormat, 'year')
  const diffMonths = actualDate.diff(dateBirthFormat, 'month');
  const diffDays = actualDate.diff(dateBirthFormat, 'day');
  const diffHours = actualDate.diff(dateBirthFormat, 'hour');

  const age = {
    diffYears, diffMonths, diffDays, diffHours
  }

  return age
}

/* FILTRADO */

const filterDiagnosis = () => {
  let finalFilter = [];
  const { dateBirth } = patientData
  const { gender } = patientData

  //type, category,age

  function getFilterByDate(type, category, age, data) {

    const test = data.filter(element => element.lsup[3] === category)

    finalFilter = test.filter(e => {
      const max = parseInt(e.lsup.slice(0, 3))
      const min = parseInt(e.linf.slice(0, 3))
      if (age[type] <= max && age[type] >= min) {
        return true
      }
    })

    return finalFilter

  }

  function getFilterByGender(gender, data) {
    if (gender !== 'NO') {
      const filteredGender = data.filter(element => element.lsex === gender)
      if (filteredGender.length >= 1) {
        data = filteredGender
      }
    }
    return data
  }

  getDiagnosis()
    .then(data => {
      if (dateBirth) {
        const age = calculateAge(dateBirth);
        let finalFilter = []

        if (age.diffYears >= 1) {
          const filterByDate = getFilterByDate("diffYears", "A", age, data)
          const filterByDateAndGender = getFilterByGender(gender, filterByDate)
          finalFilter = filterByDateAndGender
        } else if (age.diffMonths >= 1) {
          const filterByDate = getFilterByDate("diffMonths", "M", age, data)
          const filterByDateAndGender = getFilterByGender(gender, filterByDate)
          finalFilter = filterByDateAndGender
        } else if (age.diffDays >= 1) {
          const filterByDate = getFilterByDate("diffDays", "D", age, data)
          const filterByDateAndGender = getFilterByGender(gender, filterByDate)
          finalFilter = filterByDateAndGender
        } else {
          const filterByDate = getFilterByDate("diffHours", "H", age, data)
          const filterByDateAndGender = getFilterByGender(gender, filterByDate)
          finalFilter = filterByDateAndGender
        }

      } else if (gender !== 'NO') {
        const filteredGender = data.filter(element => element.lsex === gender)
        finalFilter = filteredGender; 
      } else {
        finalFilter = data
      }
      console.log('FINAL', finalFilter);

    })
}


/* SUBMIT */
const handleSubmit = (e) => {
  e.preventDefault();
  collectFormData();
  showDiagnosisForm();
  filterDiagnosis();
}



consultForm.addEventListener('submit', handleSubmit)

