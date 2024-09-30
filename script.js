let words = [];
const password = "eH7mY!PBq_eEoij"; // كلمة السر المطلوبة لحذف الكلمات

// استرجاع الكلمات المخزنة من Local Storage عند تحميل الصفحة
window.onload = function() {
    const storedWords = localStorage.getItem("words");
    if (storedWords) {
        words = JSON.parse(storedWords);
        displayWords(words);
    }
};

// ربط زر "إضافة الكلمة" بوظيفة
document.getElementById("addWordBtn").addEventListener("click", addWords);

function addWords() {
    const newWordInput = document.getElementById("newWord");
    const newWordsText = newWordInput.value.trim();

    if (newWordsText !== "") {
        const wordArray = newWordsText.split(/\s+/);
        wordArray.forEach(word => {
            words.push({ word: word });
            localStorage.setItem("words", JSON.stringify(words));
            displayWords(words);
        });
        newWordInput.value = "";
    } else {
        alert("يرجى إدخال كلمة");
    }
}

// عرض الكلمات في القائمة
function displayWords(filteredWords) {
    const wordList = document.getElementById("wordList");
    wordList.innerHTML = "";

    filteredWords.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = item.word;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "حذف";
        deleteBtn.addEventListener("click", () => {
            deleteWord(index);
        });

        li.appendChild(deleteBtn);
        wordList.appendChild(li);
    });
}

// دالة لحذف كلمة بعد إدخال كلمة السر
function deleteWord(index) {
    const enteredPassword = prompt("أدخل كلمة السر لحذف الكلمة:");
    if (enteredPassword === password) {
        words.splice(index, 1);
        localStorage.setItem("words", JSON.stringify(words));
        displayWords(words);
    } else {
        alert("كلمة السر غير صحيحة!");
    }
}

// دالة البحث عن كلمة
function searchWord() {
    const searchInput = document.getElementById("searchWord").value.toLowerCase();
    const filteredWords = words.filter(item => item.word.toLowerCase().includes(searchInput));
    displayWords(filteredWords);
}