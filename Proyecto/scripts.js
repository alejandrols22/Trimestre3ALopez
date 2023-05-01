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
    label.textContent = ` ${protein}`; // Agregamos un espacio antes del texto
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
    label.textContent = ` ${carb}`; // Agregamos un espacio antes del texto
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
    label.textContent = ` ${fat}`; // Agregamos un espacio antes del texto
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