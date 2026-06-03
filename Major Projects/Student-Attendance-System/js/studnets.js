const openModalBtn = document.getElementById("openModalBtn");
const studentModal = document.getElementById("studentModal");

const studentForm = document.getElementById("studentForm");

const studentTableBody =
    document.getElementById("studentTableBody");

const searchStudent =
    document.getElementById("searchStudent");

let students =
    JSON.parse(localStorage.getItem("students")) || [];

openModalBtn.addEventListener("click", () => {
    studentModal.style.display = "flex";
});

window.addEventListener("click", (e) => {
    if (e.target === studentModal) {
        studentModal.style.display = "none";
    }
});

studentForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const student = {

        id: Date.now(),

        rollNo:
            document.getElementById("rollNo").value,

        name:
            document.getElementById("studentName").value,

        department:
            document.getElementById("department").value,

        semester:
            document.getElementById("semester").value

    };

    students.push(student);

    saveStudents();

    renderStudents();

    studentForm.reset();

    studentModal.style.display = "none";
});

function saveStudents() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
}

function renderStudents(filtered = students) {

    studentTableBody.innerHTML = "";

    filtered.forEach(student => {

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.rollNo}</td>
            <td>${student.name}</td>
            <td>${student.department}</td>
            <td>${student.semester}</td>

            <td>
                <button
                    class="delete-btn"
                    onclick="deleteStudent(${student.id})"
                >
                    Delete
                </button>
            </td>
        `;

        studentTableBody.appendChild(row);
    });
}

function deleteStudent(id) {

    students =
        students.filter(student =>
            student.id !== id
        );

    saveStudents();

    renderStudents();
}

searchStudent.addEventListener("input", () => {

    const keyword =
        searchStudent.value.toLowerCase();

    const filtered =
        students.filter(student =>
            student.name
                .toLowerCase()
                .includes(keyword)
        );

    renderStudents(filtered);
});

renderStudents();