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
    <div>
      <h2>Diagnósticos Aplicables</h2>
      <div>
        <label for="diagnosis1">Diagnóstico 1:</label>
        <input type="text" id="diagnosis1" name="diagnosis1" required>
      </div>
    </div>
  `
  consultForm.insertAdjacentHTML('afterend', diagnosisForm);
}

const handleSubmit = (e) => {
  e.preventDefault();
  collectFormData();
  showDiagnosisForm();
}

const filterDiagnosis = (dateBirth, gender) => {
  console.log('nacimiento:', dateBirth);
  console.log('sexo:', gender);

}

consultForm.addEventListener('submit', handleSubmit)



/* const getDiagnosis = async() => {
  const res =  await fetch('http://localhost:3000/:id')
  .then(response => response.json())

console.log( res, 'holis');
  return res
}
getDx() */