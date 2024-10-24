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

function reset() {
  mortgageAmountInput.value = "";   
  mortgageTermInput.value = "";
  interestRateInput.value = "";
  mortgageTypeRadioInputs[0].childNodes[3].childNodes[1].checked = false;
  mortgageTypeRadioInputs[0].childNodes[5].childNodes[1].checked = false;
}
