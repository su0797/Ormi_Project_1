const $button = document.querySelector("#select_btn");
const $search = document.querySelector("searchInput");

// 사용자가 선택한 조건을 입력하는 함수
$button.addEventListener("click", (e) => {
    selectli = e.target.value; 
    console.log(selectli);
});

const selectValue = (selectli) => {
    let selectButton = document.createElement("li");
    // selectButton.classList.add("selectli");
    selectButton.innerText = selectli;
    $search.appendChild(selectli);
    console.log(selectli);
};

