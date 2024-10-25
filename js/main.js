var repaymentInput = document.querySelector(".form__main__input__repayment");
var interestOnlyInput = document.querySelector(
  ".form__main__input__interest-only"
);
var mortgageAmountInput = document.querySelector("#mortgage_amount");
var mortgageTermInput = document.querySelector("#mortgage_term");
var interestRateInput = document.querySelector("#interest_rate");
var mortgageTypeRadioInputs = document.querySelectorAll(".mortgage_type");

repaymentInput.addEventListener("click", () => {
  repaymentInput.childNodes[1].checked = true;
  interestOnlyInput.childNodes[1].checked = false;
});
interestOnlyInput.addEventListener("click", () => {
  interestOnlyInput.childNodes[1].checked = true;
  repaymentInput.childNodes[1].checked = false;
});

function changeColor() {
  if (
    interestOnlyInput.childNodes[1].checked == true &&
    repaymentInput.childNodes[1].checked == false
  ) {
    repaymentInput.style.backgroundColor = "";
    interestOnlyInput.style.backgroundColor = "rgba(215, 218, 47, 0.125)";
    repaymentInput.style.border = "";
    interestOnlyInput.style.border = "1px solid #d7da2f";
  } else {
    repaymentInput.style.backgroundColor = "rgba(215, 218, 47, 0.125)";
    interestOnlyInput.style.backgroundColor = "";
    repaymentInput.style.border = "1px solid #d7da2f";
    interestOnlyInput.style.border = "";
  }
}

function resetInput() {
  document.querySelector(".results__empty").classList.remove("hidden");
  document.querySelector(".results__full").classList.add("hidden");
  mortgageAmountInput.value = "";
  mortgageTermInput.value = "";
  interestRateInput.value = "";
  repaymentInput.childNodes[1].checked = false;
  repaymentInput.style.backgroundColor = "";
  repaymentInput.style.borderColor = "";
  interestOnlyInput.childNodes[1].checked = false;
  interestOnlyInput.style.backgroundColor = "";
  interestOnlyInput.style.borderColor = "";
  document.querySelectorAll(".error")[0].classList.add("hidden");
  document.querySelectorAll(".error")[1].classList.add("hidden");
  document.querySelectorAll(".error")[2].classList.add("hidden");
  document.querySelectorAll(".error")[3].classList.add("hidden");
}

function formatNumber(input) {
  if (input.value != 0) {
    // Remove everything except digits
    let value = input.value.replace(/\D/g, "");
    // Format the number using US locale (commas for thousands)
    value = Number(value).toLocaleString("en-US");
    input.value = value;
  } else {
    input.value = "";
  }
}
/* calculateMonthlyPayment */
function calculateMonthlyPayment() {
  document.querySelector(".results__empty").classList.add("hidden");
  document.querySelector(".results__full").classList.remove("hidden");

  var isRepayment = repaymentInput.childNodes[1].checked;
  var isInterestOnly = interestOnlyInput.childNodes[1].checked;
  let monthlyInterestRate = parseFloat(interestRateInput.value) / 100 / 12;
  let monthlyRepayment, totalRepayment;

  if (isRepayment) {
    let totalPayments = parseFloat(mortgageTermInput.value) * 12;
    monthlyRepayment =
      (parseFloat(mortgageAmountInput.value.replace(",", "")) *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, totalPayments)) /
      (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
    totalRepayment = monthlyRepayment * totalPayments;
  } else if (isInterestOnly) {
    monthlyRepayment =
      parseFloat(mortgageAmountInput.value.replace(",", "")) *
      monthlyInterestRate;
    totalRepayment =
      monthlyRepayment * 12 * parseFloat(mortgageTermInput.value) +
      parseFloat(mortgageAmountInput.value.replace(",", ""));
  } else {
    throw "Invalid repayment type!";
  }

  document.querySelector(".monthly_repayments").innerText =
    monthlyRepayment.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  document.querySelector(".total_repayments").innerText =
    totalRepayment.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
}

const isComplete = () => {
  if (mortgageAmountInput.value == "") {
    document.querySelectorAll(".error")[0].classList.remove("hidden");
    document.querySelectorAll(".input")[0].style.backgroundColor =
      "hsl(4, 69%, 50%)";
  }
  document.querySelector(".input span").style.color = "white";
  if (mortgageTermInput.value == "") {
    document.querySelectorAll(".error")[1].classList.remove("hidden");
    document.querySelectorAll(".input")[1].style.backgroundColor =
      "hsl(4, 69%, 50%)";
  }
  document.querySelector(
    "div.form__main__input:nth-child(2) > div:nth-child(2) > span:nth-child(2)"
  ).style.color = "white";
  if (interestRateInput.value == "") {
    document.querySelectorAll(".error")[2].classList.remove("hidden");
    document.querySelectorAll(".input")[2].style.backgroundColor =
      "hsl(4, 69%, 50%)";
  }
  document.querySelector(
    "div.form__main__input:nth-child(3) > div:nth-child(2) > span:nth-child(2)"
  ).style.color = "white";
  if (
    !interestOnlyInput.childNodes[1].checked &&
    !repaymentInput.childNodes[1].checked
  ) {
    document.querySelectorAll(".error")[3].classList.remove("hidden");
  }
  if (
    mortgageAmountInput.value != "" &&
    mortgageTermInput.value != "" &&
    interestRateInput.value != "" &&
    (interestOnlyInput.childNodes[1].checked ||
      repaymentInput.childNodes[1].checked)
  ) {
    calculateMonthlyPayment();
  }
};
