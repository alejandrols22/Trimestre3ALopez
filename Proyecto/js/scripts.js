var fechas = [];
        var pesos = [];
        var objetivo = [];
        var objetivoValor;
        var ctx = document.getElementById('chart').getContext('2d');
        var chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: fechas,
                datasets: [{
                    label: 'Peso Actual',
                    data: pesos,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                },
                {
                    label: 'Peso Objetivo',
                    data: objetivo,
                    fill: false,
                    borderColor: 'rgb(255, 99, 132)',
                    tension: 0.1
                }]
            }
        });

        function anadirDato() {
            var peso = document.getElementById('peso').value;
            var fecha = document.getElementById('fecha').value;
            objetivoValor = document.getElementById('objetivo').value;
            if (peso && fecha && objetivoValor) {
                fechas.push(fecha);
                pesos.push(peso);
                objetivo = Array(pesos.length).fill(objetivoValor);
                chart.data.datasets[1].data = objetivo;
                chart.update();
            }
        }


        let xmlDoc, xslDoc;
        fetch('cancionALopez.xml')
            .then(response => response.text())
            .then(data => {
                let parser = new DOMParser();
                xmlDoc = parser.parseFromString(data, "text/xml");
                return fetch('cancionALopez.xsl');
            })
            .then(response => response.text())
            .then(data => {
                let parser = new DOMParser();
                xslDoc = parser.parseFromString(data, "text/xml");
    
                let xsltProcessor = new XSLTProcessor();
                xsltProcessor.importStylesheet(xslDoc);
                let resultDocument = xsltProcessor.transformToFragment(xmlDoc, document);
    
                document.getElementById('content').appendChild(resultDocument);
            });

const foodList = {
  proteins: [
    'Pollo',
    'Pavo',
    'Atún',
    'Salmón',
    'Tofu',
    'Huevos',
    'Leche',
    'Yogur griego',
    'Queso cottage',
    'Lentejas'
  ],
  carbs: [
    'Arroz',
    'Pasta',
    'Pan integral',
    'Quinoa',
    'Avena',
    'Patata',
    'Batata',
    'Plátano',
    'Frijoles',
    'Guisantes'
  ],
  fats: [
    'Aguacate',
    'Aceite de oliva',
    'Nueces',
    'Almendras',
    'Mantequilla de maní',
    'Semillas de chía',
    'Aceite de coco',
    'Aceitunas',
    'Semillas de girasol',
    'Huevo'
  ]
};

function populateFoodLists() {
  const proteinsSelect = document.querySelector('#preferred-proteins');
  const carbsSelect = document.querySelector('#preferred-carbs');
  const fatsSelect = document.querySelector('#preferred-fats');
  
  foodList.proteins.forEach(protein => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `protein-${protein}`;
    checkbox.value = protein;
    const label = document.createElement('label');
    label.htmlFor = `protein-${protein}`;
    label.textContent = ` ${protein}`; 
    proteinsSelect.appendChild(checkbox);
    proteinsSelect.appendChild(label);
  });

  foodList.carbs.forEach(carb => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `carb-${carb}`;
    checkbox.value = carb;
    const label = document.createElement('label');
    label.htmlFor = `carb-${carb}`;
    label.textContent = ` ${carb}`; 
    carbsSelect.appendChild(checkbox);
    carbsSelect.appendChild(label);
  });

  foodList.fats.forEach(fat => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `fat-${fat}`;
    checkbox.value = fat;
    const label = document.createElement('label');
    label.htmlFor = `fat-${fat}`;
    label.textContent = ` ${fat}`; 
    fatsSelect.appendChild(checkbox);
    fatsSelect.appendChild(label);
  });
}
populateFoodLists();

document.querySelector("#user-info-form").addEventListener("submit", function (event) {
  event.preventDefault();
  
  const weight = parseFloat(document.querySelector("#weight").value);
  const height = parseFloat(document.querySelector("#height").value);
  const age = parseInt(document.querySelector("#age").value);
  const gender = document.querySelector("#gender").value;
  const goal = document.querySelector("#goal").value;
  const meals = parseInt(document.querySelector("#meals").value);

  let bmr;
  if (gender === "male") {
    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }

  let tdee;
  switch (goal) {
    case "lose-weight":
      tdee = bmr * 1.2 - 500;
      break;
    case "maintain-weight":
      tdee = bmr * 1.2;
      break;
    case "gain-weight":
      tdee = bmr * 1.2 + 500;
      break;
  }

  const proteinsPercentage = 30;
  const carbsPercentage = 50;
  const fatsPercentage = 20;

  const macroChart = new Chart(document.querySelector("#macro-chart"), {
    type: "doughnut",
    data: {
      labels: ["Proteínas", "Carbohidratos", "Grasas"],
      datasets: [{
        data: [proteinsPercentage, carbsPercentage, fatsPercentage],
        backgroundColor: ["#4BC0C0", "#FFCD56", "#FF6384"],
      }],
    },
    options: {
      maintainAspectRatio: false,
    },
    });
    
    document.querySelector("#proteins").textContent = proteinsPercentage;
    document.querySelector("#carbs").textContent = carbsPercentage;
    document.querySelector("#fats").textContent = fatsPercentage;
    document.querySelector("#calories").textContent = Math.round(tdee);
    
    const preferredProteins = Array.from(document.querySelectorAll('#preferred-proteins input:checked')).map(checkbox => checkbox.value);
const preferredCarbs = Array.from(document.querySelectorAll('#preferred-carbs input:checked')).map(checkbox => checkbox.value);
const preferredFats = Array.from(document.querySelectorAll('#preferred-fats input:checked')).map(checkbox => checkbox.value);
    const dietPlan = generateDietPlan(tdee, meals, proteinsPercentage, carbsPercentage, fatsPercentage, preferredProteins, preferredCarbs, preferredFats);

const dietPlanContainer = document.createElement("div");
dietPlanContainer.innerHTML = dietPlan;

const results = document.querySelector("#results");
results.appendChild(dietPlanContainer);
results.hidden = false;

return false;
});

function generateDietPlan(tdee, meals, proteinsPercentage, carbsPercentage, fatsPercentage, preferredProteins, preferredCarbs, preferredFats) {
const caloriesPerMeal = tdee / meals;

const proteinsPerMeal = (caloriesPerMeal * proteinsPercentage) / 100;
const carbsPerMeal = (caloriesPerMeal * carbsPercentage) / 100;
const fatsPerMeal = (caloriesPerMeal * fatsPercentage) / 100;

let dietPlan = '';

for (let i = 1; i <= meals; i++) {
  dietPlan += `<h4>Comida ${i}</h4>
               <p>Proteínas: ${proteinsPerMeal.toFixed(2)} gr - Opciones: ${preferredProteins.join(', ')}</p>
               <p>Carbohidratos: ${carbsPerMeal.toFixed(2)} gr - Opciones: ${preferredCarbs.join(', ')}</p>
               <p>Grasas: ${fatsPerMeal.toFixed(2)} gr - Opciones: ${preferredFats.join(', ')}</p>`;
}

return dietPlan;
}

function changeImage() {
  const image = document.querySelector('img');
  if (image.src.endsWith('./imagenes/deltoides.png')) {
    image.src = './imagenes/soleo.png';
  } else {
    image.src = './imagenes/pectoral.png';
  }
}


const select = document.querySelector('select[name="musculo"]');
      const container = document.querySelector('#muscle-image-container');
      const exerciseListContainer = document.querySelector('#exercise-list-container');
      const exerciseList = document.querySelector('#exercise-list');

      const exercises = {
        biceps: ['Curl de bíceps', 'Curl martillo', 'Curl concentrado'],
        cuadriceps: ['Sentadillas', 'Zancadas', 'Prensa de piernas'],
        deltoides: ['Elevaciones laterales', 'Press militar', 'Elevaciones frontales'],
        pectoral: ['Press de banca', 'Aperturas con mancuernas', 'Flexiones'],
        soleo: ['Elevaciones de pantorrilla sentado', 'Elevaciones de pantorrilla de pie'],
        tibial: ['Curl de tibial']
      };

      function handleMuscleChange(event) {
        const value = event.target.value;
        container.innerHTML = '';
        exerciseList.innerHTML = '';

        if (value !== 'cuerpo') {
          const img = document.createElement('img');
          img.src = `./imagenes/${value}.png`;
          img.alt = `Imagen de ${value}`;
          container.appendChild(img);

          const exerciseItems = exercises[value];

          for (const exercise of exerciseItems) {
            const li = document.createElement('li');
            li.textContent = exercise;
            exerciseList.appendChild(li);
          }
        } else {
          const img = document.createElement('img');
          img.src = './imagenes/download.png';
          img.alt = 'Imagen de cuerpo';
          container.appendChild(img);
        }
      }

      select.addEventListener('change', handleMuscleChange);

      // Esto inicializa la lista y la imagen en función del valor seleccionado por defecto
      handleMuscleChange({ target: select });







function toggleDarkMode() {
  var body = document.querySelector('body');
  body.classList.toggle('dark-mode');
  var sunIcon = document.getElementById('sun-icon');
  var moonIcon = document.getElementById('moon-icon');
  if (body.classList.contains('dark-mode')) {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  } else {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  }
}

window.onload = function() {
  if (localStorage.getItem('darkMode') === 'true') {
    document.querySelector('body').classList.add('dark-mode');
    document.getElementById('sun-icon').style.display = 'none';
    document.getElementById('moon-icon').style.display = 'block';
  }
}

function toggleDarkMode() {
  var body = document.querySelector('body');
  body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
  var sunIcon = document.getElementById('sun-icon');
  var moonIcon = document.getElementById('moon-icon');
  if (body.classList.contains('dark-mode')) {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  } else {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  }
}

