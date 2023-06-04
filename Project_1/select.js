const $input = document.querySelector("input");

// 사용자가 선택한 조건을 입력하는 함수
$input.addEventListener("button", (e) => {
    selectvalue = e.target.value; 
});

const selectValue = (selectli) => {
    let selectButton = document.createElement("li");
    // selectButton.classList.add("selectli");
    selectButton.innerText = selectli;
    $input.appendChild(selectButton);
    console.log(selectli);
};

