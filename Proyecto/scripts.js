document.querySelector("#user-info-form").addEventListener("submit", function (event) {
    event.preventDefault();
    
    const weight = parseFloat(document.querySelector("#weight").value);
    const height = parseFloat(document.querySelector("#height").value);
    const age = parseInt(document.querySelector("#age").value);
    const gender = document.querySelector("#gender").value;
    const goal = document.querySelector("#goal").value;
  
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
  
    document.querySelector("#results").hidden = false;
    
    return false;
  });