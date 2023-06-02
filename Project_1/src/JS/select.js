// 사용자가 선택한 조건을 입력하는 함수
$input.addEventListener("button", (e) => {
    selectvalue = e.target.value; 
});

const selectValue = (selectvalue) => {
    if (selectvalue) {
        let selectButton = document.createElement("button");
        selectButton.classList.add("selectvalue");
        selectButton.innerText = selectvalue;
        $input.appendChild(selectButton);
    }
    console.log("selectValue");
}