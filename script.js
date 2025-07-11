function calculateTDEE() {
  const gender = document.getElementById("gender").value;
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);
  const age = parseInt(document.getElementById("age").value);
  const activity = parseFloat(document.getElementById("activity").value);
  const goal = document.getElementById("goal").value;
  const proteinRatio = parseFloat(document.getElementById("proteinRatio").value);
  const fatRatio = parseFloat(document.getElementById("fatRatio").value);
  const goalCalories = parseInt(document.getElementById("goalCalories").value) || 0;

  let bmr;
  if (gender === "male") {
    bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } else {
    bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
  }

  let tdee = bmr * activity;

  // استخدم القيمة المدخلة بدلاً من 500
  if (goal === "cut") tdee -= goalCalories;
  else if (goal === "bulk") tdee += goalCalories;

  const proteinGrams = weight * proteinRatio;
  const proteinCals = proteinGrams * 4;

  const fatCals = tdee * fatRatio;
  const fatGrams = fatCals / 9;

  const carbsCals = tdee - (proteinCals + fatCals);
  const carbsGrams = carbsCals / 4;

  document.getElementById("result").innerHTML =
    `BMR: ${bmr.toFixed(2)} سعرة<br>` +
    `TDEE: ${tdee.toFixed(2)} سعرة<br><br>` +
    `البروتين: ${proteinGrams.toFixed(1)} جم<br>` +
    `الدهون: ${fatGrams.toFixed(1)} جم (${(fatRatio * 100).toFixed(0)}%)<br>` +
    `الكارب: ${carbsGrams.toFixed(1)} جم`;
}

// دالة لتحديث الرسالة حسب الهدف والسعرات
function updateAdjustmentMessage() {
  const goal = document.getElementById("goal").value;
  const calories = document.getElementById("goalCalories").value;
  const message = document.getElementById("adjustmentMessage");

  if (goal === "cut") {
    message.textContent = `سيتم خصم ${calories || 0} سعرة من TDEE لتحقيق خسارة وزن.`;
  } else if (goal === "bulk") {
    message.textContent = `سيتم إضافة ${calories || 0} سعرة إلى TDEE لتحقيق زيادة وزن.`;
  } else {
    message.textContent = "لن يتم تعديل السعرات، الهدف هو المحافظة.";
  }
}
