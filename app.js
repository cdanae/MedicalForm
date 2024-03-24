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

const showDiagnosisForm = (options) => {
  const diagnosisForm = `
  <hr>
  <form id="diagnosisForm">
    <h2>Diagnósticos Aplicables</h2>
    <div class="container-datalist">
      <label for="diagnosis1">Diagnóstico 1:</label>
      <input type="text" id="diagnosis1" name="diagnosis1" list="diagnosisOptions" class="input-diagnosis" required>
      <datalist id="diagnosisOptions">
        ${options.map(option => `<option value="${option}">`).join('')}
      </datalist>
    </div>
    </div>
    <button type="submit">Imprimir</button>
  </form>
  `;

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
function getFilterByDate(type, category, age, data) {

  const filtered = data.filter(element => element.lsup[3] === category)

  const finalFilter = filtered.filter(e => {
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
const filterDiagnosis = async () => {
  let finalFilter = [];
  const { dateBirth } = patientData
  const { gender } = patientData

  //type, category,age

  const request = getDiagnosis()
    .then(data => {
      if (dateBirth) {
        const age = calculateAge(dateBirth);

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

      return finalFilter
    })




  return request
}


/* SUBMIT */
const handleSubmit = async (e) => {
  e.preventDefault();
  collectFormData();
  const filterData = await filterDiagnosis();
  const options = filterData.map(name => name.nombre)
  showDiagnosisForm(options);
}



consultForm.addEventListener('submit', handleSubmit)
