var repaymentInput = document.querySelector(".form__main__input__repayment");
var interestOnlyInput = document.querySelector(
  ".form__main__input__interest-only"
);

function changeColor() {
  if (
    interestOnlyInput.childNodes[1].checked == true &&
    repaymentInput.childNodes[1].checked == false
  ) {
    repaymentInput.style.backgroundColor = "";
    interestOnlyInput.style.backgroundColor = "#d7da2f";
  } else {
    repaymentInput.style.backgroundColor = "#d7da2f";
    interestOnlyInput.style.backgroundColor = "";
  }
}
