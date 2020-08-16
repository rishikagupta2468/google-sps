const status = {
    UNDERWEIGHT: 'underweight',
    NORMAL: 'normal',
    OVERWEIGHT: 'overweight',
    OBESE: 'obese'

}

function getStatus(bmi) {
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

function getSuggestion(status) {
    if (status === 'underweight') {
        return suggestions.UNDERWEIGHT;
    } else if (status === 'normal') {
        return suggestions.NORMAL;
    } else if (status === 'overweight') {
        return suggestions.OVERWEIGHT;
    } else {
        return suggestions.OBESE;
    }
}

function SetClassOfStatus(addclassname, removeclassname) {

    const status = document.getElementById("status");
    if (status.classList.contains(removeclassname)) {
        status.classList.remove(removeclassname);
    }
    if (!status.classList.contains(addclassname)) {
        status.classList.add(addclassname);
    }

}

function IsValid(height, weight) {

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

    if (!IsValid(height, weight)) {
        alert('Please enter valid height and weight values');
        return;
    }
    var bmi = weight / (height / 100 * height / 100);
    bmi = (bmi.toFixed(2));

    var status = getStatus(bmi);


    document.getElementById("result").innerHTML = "Your BMI is " + bmi;
    document.getElementById("status").innerText = "You are " + status;
    if (status === 'normal') {
        SetClassOfStatus('green-text', 'red-text ');

    } else {

        SetClassOfStatus('red-text', 'green-text');

    }
    document.getElementById("suggestion").classList.add('blue-text')

    var suggestion = getSuggestion(status);
    document.getElementById("suggestion").innerText = ' Suggestion : ' + suggestion;


}
var calculatebtn = document.getElementById('calculate-btn');

calculatebtn.addEventListener("click", calculateBMI);