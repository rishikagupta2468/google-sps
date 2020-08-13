function findstatus(bmio) {
    if (bmio < 18.5) {
        return 'underweight';
    } else if (bmio < 24.9) {
        return 'normal';
    } else if (bmio < 29.9) {
        return 'overweight'
    } else {
        return 'obese';
    }
}

function setsuggestion(status) {
    if (status === 'underweight') {
        return 'Eat more frequently.Choose nutrient-rich foods. Drink water regulary and avoid skipping meals.'
    } else if (status === 'normal') {
        return 'Eat meals regulary and exercise';
    } else if (status === 'overweight') {
        return 'Exercise daily. Drink good amount of water. Stop eating any kind of junk food.'
    } else {
        return 'Excercise regularly. Make a strict diet plan. It is recommended to consult a dietician.'
    }
}

function BMI() {
    var height = document.getElementById('h').value;
    var weight = document.getElementById('w').value;

    if (height === '' || weight === '') {
        alert('Please enter height and weight');
    } else {
        var bmi = weight / (height / 100 * height / 100);
        var bmio = (bmi.toFixed(2));

        var status = findstatus(bmio);


        document.getElementById("result").innerHTML = "Your BMI is " + bmio;
        document.getElementById("status").innerText = "You are " + status;
        if (status === 'normal') {
            document.getElementById("status").classList.add('green-text');
            document.getElementById("suggestion").classList.add('blue-text')
        } else {
            document.getElementById("status").classList.add('red-text');
            document.getElementById("suggestion").classList.add('blue-text')
        }

        var suggestion = setsuggestion(status);
        document.getElementById("suggestion").innerText = ' Suggestion : ' + suggestion;
    }

}
var btn = document.getElementById('btn');

btn.addEventListener("click", BMI);