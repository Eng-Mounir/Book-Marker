var bookmarkName = document.getElementById("bookmarkName");
var bookmarkURL = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var bookMarkList = [];

// ✅ Load existing data from localStorage
if (localStorage.getItem("booksArray") != null) {
    bookMarkList = JSON.parse(localStorage.getItem("booksArray"));
    displayBook();
}

// ✅ Add a new bookmark
function addProduct() {
    if (validateUrl() && validateName()) {
        var book = {
            name: bookmarkName.value,
            url: bookmarkURL.value.startsWith("http")
                ? bookmarkURL.value
                : "https://" + bookmarkURL.value
        };

        // Add to array
        bookMarkList.push(book);

        // Save to localStorage
        localStorage.setItem("booksArray", JSON.stringify(bookMarkList));

        // Clear inputs
        clearInputsValue();

        // Refresh display
        displayBook();
    }
}



function clearInputsValue() {
    bookmarkName.value = "";
    bookmarkURL.value = "";
    bookmarkName.classList.remove("is-valid");
    bookmarkURL.classList.remove("is-valid");
}

// ✅ Display all bookmarks
function displayBook(array = bookMarkList) {
    var cartona = "";

    for (var i = 0; i < array.length; i++) {
        cartona += `
            <tr>
                <td>${i + 1}</td>
                <td>${array[i].name}</td>
                <td>
                    <a href="${array[i].url}" target="_blank" class="btn btn-outline-success">
                        Visit
                    </a>
                </td>
                <td>
                    <button onclick="deleteBook(${i})" class="btn btn-outline-danger">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }

    document.getElementById("tableContent").innerHTML = cartona;
}

// ✅ Delete bookmark
function deleteBook(index) {
    bookMarkList.splice(index, 1);
    localStorage.setItem("booksArray", JSON.stringify(bookMarkList));
    displayBook();
}

function validateUrl() {
    var urlRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9\-]+\.[a-z]{2,}(\.[a-z]{2,})?(\/\S*)?$/;

    var alertUrlMsg = document.getElementById("alertUrlMsg");
    if (urlRegex.test(bookmarkURL.value)) {      
        bookmarkURL.classList.add("is-valid");
        bookmarkURL.classList.remove("is-invalid");
        alertUrlMsg.classList.add("d-none");
        return true;
    }
    else {
        bookmarkURL.classList.remove("is-valid");
        bookmarkURL.classList.add("is-invalid");
        alertUrlMsg.classList.remove("d-none");
        return false;
    }
}

function validateName() {
    var regex = /^\w{3,}$/;
    var alertNameMsg = document.getElementById("alertNameMsg");
    if (regex.test(bookmarkName.value)) {      
        bookmarkName.classList.add("is-valid");
        bookmarkName.classList.remove("is-invalid");
        alertNameMsg.classList.add("d-none");
        return true;
    }
    else {
        bookmarkName.classList.remove("is-valid");
        bookmarkName.classList.add("is-invalid");
        alertNameMsg.classList.remove("d-none");
        return false;
    }
}