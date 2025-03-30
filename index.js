const calc = document.querySelector(".grid");
const display = document.querySelector(".calc-disp");
const button = document.querySelector(".exit-btn");
const timer = document.getElementById("time");

const time = setInterval(function () {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  timer.innerHTML = hours + ":" + minutes + ":" + seconds;
}, 1000);

let firstNumber = "";
let secondNumber = "";
let operator = "";

calc.addEventListener("click", selectNumber);

function selectNumber(event) {
  if (event.target.nodeName !== "BUTTON") {
    return;
  }

  const value = event.target.dataset.button;

  if (!value || value === "AC") {
    display.value = "";
    firstNumber = "";
    secondNumber = "";
    operator = "";
    return;
  }
  if (value === "DEL") {
    display.value = display.value.slice(0, -1);
    return;
  }
  if (value === "+/-") {
    display.value = display.value ? String(parseFloat(display.value) * -1) : "";
    return;
  }

  if (!isNaN(value) || value === ".") {
    if (!operator) {
      firstNumber += value;
      display.value = firstNumber;
    } else {
      secondNumber += value;
      display.value = secondNumber;
    }
    return;
  }

  if (["+", "-", "*", "/"].includes(value)) {
    firstNumber = display.value;
    operator = value;
    display.value = "";
  }

  if (value === "%") {
    if (firstNumber && secondNumber && operator) {
      let result;

      const percent =
        (parseFloat(secondNumber) / 100) * parseFloat(firstNumber);

      if (operator === "+") {
        result = parseFloat(firstNumber) + percent;
      } else if (operator === "-") {
        result = parseFloat(firstNumber) - percent;
      } else if (operator === "*") {
        result = parseFloat(firstNumber) * percent;
      } else if (operator === "/") {
        result = parseFloat(firstNumber) / percent;
      }

      display.value = result;
      firstNumber = result;
      secondNumber = "";
      operator = "";
    }
    return;
  }
  if (value === "=") {
    if (firstNumber && secondNumber && operator) {
      if (operator === "/" && secondNumber === "0") {
        display.value = "Error";
        firstNumber = "";
        secondNumber = "";
        operator = "";
        return;
      }
      const result = eval(`${firstNumber} ${operator} ${secondNumber}`);
      display.value = result;

      // Після обчислення зберігаємо результат як перше число
      firstNumber = result;
      secondNumber = "";
      operator = "";
    }
    return;
  }
  display.value += value;
}

button.addEventListener("click", () => {
  timer.classList.toggle("hidden");
  console.log(
    `Timer is now ${timer.classList.contains("hidden") ? "hidden" : "visible"}`
  ); // Лог состояния таймера

  if (timer.classList.contains("hidden")) {
    calc.classList.remove("hidden");
    display.classList.remove("hidden");
  } else {
    calc.classList.add("hidden");
    display.classList.add("hidden");
  }
});
