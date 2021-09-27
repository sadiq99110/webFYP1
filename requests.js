let stage = document.querySelector("#pressureStage");
let medication = document.querySelector("#medication");
let medicine = "";

const canSubmit = () => {
  return (
    gender !== null &&
    age !== null &&
    headache !== null &&
    breadth !== null &&
    visual !== null &&
    nose !== null &&
    blood !== null &&
    range !== null &&
    dRange !== null
  );
};

function classify(url) {
  var inputVal = document.getElementById("name").value;
   document.getElementById("demo").innerHTML = inputVal;
  if (!canSubmit()) {
    alert("Select All options");
    return;
  }
  fetch(`http://localhost:5000/${url}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      gender,
      age,
      headache,
      breadth,
      visual,
      nose,
      blood,
      range,
      dRange,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      stage.innerHTML = res.prediction;
      medicine = MEDICINES[res.prediction];
    });
}

const MEDICINES = {
  "HYPERTENSION (Stage-1)": "Medicine: Norvac",
  "HYPERTENSION (Stage-2)": "Medicine: Sofvasc",
  "HYPERTENSIVE CRISIS": "Medicine: Losarten",
  "HYPERTENSION (Stage-1).": "Medicine: Lipiget",
  "HYPERTENSION (Stage-2).": "Medicine: Natrilix",
  "HYPERTENSIVE CRISIS.": "Medicine: Benefol",
  "NORMAL":"No medicine needed"
};

function handleMedicine() {
  if (medicine) {
    medication.innerHTML = medicine;
  }
}
