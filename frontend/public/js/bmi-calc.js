const status = {
    UNDERWEIGHT: 'underweight',
    NORMAL: 'normal',
    OVERWEIGHT: 'overweight',
    OBESE: 'obese'
}

function getBmiStatus(bmi) {
    if (bmi < 18.5) {
        return status.UNDERWEIGHT;
    } else if (bmi < 24.9) {
        return status.NORMAL;
    } else if (bmi < 29.9) {
        return status.OVERWEIGHT;
    } else {
        return status.OBESE;
    }
}
const suggestions = {
    UNDERWEIGHT: 'Eat more frequently.Choose nutrient-rich foods. Drink water regulary and avoid skipping meals.',
    NORMAL: 'Eat meals regulary and exercise',
    OVERWEIGHT: 'Exercise daily.Drink good amount of water.Stop eating any kind of junk food.',
    OBESE: 'Excercise regularly. Make a strict diet plan. It is recommended to consult a dietician.'
}

function getSuggestion(currentstatus) {
    if (currentstatus === status.UNDERWEIGHT) {
        return suggestions.UNDERWEIGHT;
    } else if (currentstatus === status.NORMAL) {
        return suggestions.NORMAL;
    } else if (currentstatus === status.OVERWEIGHT) {
        return suggestions.OVERWEIGHT;
    } else {
        return suggestions.OBESE;
    }
}

function isValidBmiInput(height, weight) {

    if (height === '' || weight === '' || isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        console.log(typeof height)
        return false;
    } else {
        return true;
    }

}

function calculateBMI() {
    var height = document.getElementById('height').value;
    var weight = document.getElementById('weight').value;

    if (!isValidBmiInput(height, weight)) {
        alert('Please enter valid height and weight values');
        return;
    }
    var bmi = weight / (height / 100 * height / 100);
    bmi = (bmi.toFixed(2));

    let currentstatus = getBmiStatus(bmi);


    document.getElementById("result").innerHTML = "Your BMI is " + bmi;
    document.getElementById("status").innerText = "You are " + currentstatus;
    const status = document.getElementById("status");
    if (currentstatus === status.normal) {
        status.classList.remove('green-text');  
        if (!status.classList.contains('red-text')) {
            status.classList.add('red-text');
        }

    } else {
        status.classList.remove('red-text');
        if (!status.classList.contains('green-text')) {
            status.classList.add('green-text');
        }
    }
    document.getElementById("suggestion").classList.add('blue-text')

    var suggestion = getSuggestion(status);
    document.getElementById("suggestion").innerText = ' Suggestion : ' + suggestion;


}
var calculateBtn = document.getElementById('calculate-btn');
if(calculateBtn)
    calculateBtn.addEventListener("click", calculateBMI);

