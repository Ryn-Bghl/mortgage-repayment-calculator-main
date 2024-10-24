var repaymentInput = document.querySelector(".form__main__input__repayment");
var interestOnlyInput = document.querySelector(
  ".form__main__input__interest-only"
);
var mortgageAmountInput = document.querySelector("#mortgage_amount");
var mortgageTermInput = document.querySelector("#mortgage_term");
var interestRateInput = document.querySelector("#interest_rate");
var mortgageTypeRadioInputs = document.querySelectorAll(".mortgage_type");

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
  // TOFIX: change the radio input bgc and border color to default
  mortgageAmountInput.value = "";
  mortgageTermInput.value = "";
  interestRateInput.value = "";
  mortgageTypeRadioInputs[0].childNodes[3].childNodes[1].checked = false;
  mortgageTypeRadioInputs[0].childNodes[5].childNodes[1].checked = false;
}

/* calculateMonthlyPayment */
function calculateMonthlyPayment() {
  var isRepayment =
    mortgageTypeRadioInputs[0].childNodes[3].childNodes[1].checked;
  var isInterestOnly =
    mortgageTypeRadioInputs[0].childNodes[5].childNodes[1].checked;

  console.log(isRepayment);
  console.log(isInterestOnly);

  // Convert the annual interest rate to a monthly rate
  let monthlyInterestRate = parseInt(interestRateInput.value) / 100 / 12;

  let monthlyRepayment, totalRepayment;

  // Check the repayment type: 'repayment' or 'interestOnly'
  if (isRepayment) {
    // Total number of payments (months)
    let totalPayments = parseFloat(mortgageTermInput.value) * 12;

    // Calculate the monthly repayment using the amortization formula (repayment mortgage)
    monthlyRepayment =
      (parseFloat(mortgageAmountInput.value) *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, totalPayments)) /
      (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);

    // Calculate the total repayment over the term
    totalRepayment = monthlyRepayment * totalPayments;
  } else if (isInterestOnly) {
    // For interest-only, the monthly repayment is only the interest
    monthlyRepayment =
      parseFloat(mortgageAmountInput.value) * monthlyInterestRate;

    // Total repayment is all interest payments over the term, plus the mortgage amount (principal)
    totalRepayment =
      monthlyRepayment * 12 * parseFloat(mortgageTermInput.value) +
      parseFloat(mortgageAmountInput.value);
  } else {
    throw "Invalid repayment type!";
  }

  document.querySelector(".monthly_repayments").innerText =
    monthlyRepayment.toFixed(2);
  document.querySelector(".total_repayments").innerText =
    totalRepayment.toFixed(2);
}

/* // Example usage:
let parseInt(mortgageAmountInput.value) = 300000;
let mortgageTermInput = 25;
let annualInterestRate = 5.25;

// For 'repayment' mortgage
let resultRepayment = calculateMortgage(
  parseInt(mortgageAmountInput.value),
  mortgageTermInput,
  annualInterestRate,
  "repayment"
);
console.log(
  "Monthly Repayment (Repayment): €" + resultRepayment.monthlyRepayment
);
console.log("Total Repayment (Repayment): €" + resultRepayment.totalRepayment);

// For 'interestOnly' mortgage
let resultInterestOnly = calculateMortgage(
  parseInt(mortgageAmountInput.value),
  mortgageTermInput,
  annualInterestRate,
  "interestOnly"
);
console.log(
  "Monthly Repayment (Interest Only): €" + resultInterestOnly.monthlyRepayment
);
console.log(
  "Total Repayment (Interest Only): €" + resultInterestOnly.totalRepayment
);
 */
