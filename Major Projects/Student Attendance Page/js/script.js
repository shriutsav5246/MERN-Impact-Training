let students =
    JSON.parse(localStorage.getItem("students")) || [];
let attendance =
    JSON.parse(localStorage.getItem("attendance")) || {};
let editingStudentId = null;
const attendanceDate =
    document.getElementById("attendanceDate");
const searchStudent =
    document.getElementById("searchStudent");
const studentTableBody =
    document.getElementById("studentTableBody");
const totalStudents =
    document.getElementById("totalStudents");
const presentCount =
    document.getElementById("presentCount");
const absentCount =
    document.getElementById("absentCount");
const attendancePercentage =
    document.getElementById("attendancePercentage");
const addStudentModal =
    document.getElementById("addStudentModal");
const openAddStudentModal =
    document.getElementById("openAddStudentModal");
const closeAddModal =
    document.getElementById("closeAddModal");
const cancelAddStudent =
    document.getElementById("cancelAddStudent");
const saveStudentBtn =
    document.getElementById("saveStudentBtn");
const editStudentModal =
    document.getElementById("editStudentModal");
const closeEditModal =
    document.getElementById("closeEditModal");
const cancelEditStudent =
    document.getElementById("cancelEditStudent");
const updateStudentBtn =
    document.getElementById("updateStudentBtn");
const saveAttendanceBtn =
    document.getElementById("saveAttendanceBtn");
initializeDate();
renderStudents();
function initializeDate() {
    const today =
        new Date()
            .toISOString()
            .split("T")[0];
    attendanceDate.value = today;
    if (!attendance[today]) {
        attendance[today] = {};
    }
}
function saveStudents() {
    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
}
function saveAttendance() {
    localStorage.setItem(
        "attendance",
        JSON.stringify(attendance)
    );
}
function generateStudentId() {
    const nextNumber =
        students.length + 1;
    return `STU${String(nextNumber).padStart(3, "0")}`;
}
openAddStudentModal.addEventListener(
    "click",
    () => {
        addStudentModal.classList.add("active");
    }
);
closeAddModal.addEventListener(
    "click",
    closeAddStudentModal
);
cancelAddStudent.addEventListener(
    "click",
    closeAddStudentModal
);
function closeAddStudentModal() {
    addStudentModal.classList.remove(
        "active"
    );
    clearAddForm();
}
function clearAddForm() {
    document.getElementById(
        "studentName"
    ).value = "";
    document.getElementById(
        "rollNumber"
    ).value = "";
    document.getElementById(
        "department"
    ).value = "";
    document.getElementById(
        "semester"
    ).value = "";
}
saveStudentBtn.addEventListener(
    "click",
    addStudent
);
function addStudent() {
    const name =
        document
            .getElementById("studentName")
            .value
            .trim();
    const rollNumber =
        document
            .getElementById("rollNumber")
            .value
            .trim();
    const department =
        document
            .getElementById("department")
            .value;
    const semester =
        document
            .getElementById("semester")
            .value;
    if (
        !name ||
        !rollNumber ||
        !department ||
        !semester
    ) {
        alert(
            "Please fill all fields."
        );
        return;
    }
    const rollExists =
        students.some(
            student =>
                student.rollNumber
                    .toLowerCase()
                ===
                rollNumber.toLowerCase()
        );
    if (rollExists) {
        alert(
            "Roll Number already exists."
        );
        return;
    }
    const student = {
        id: generateStudentId(),
        rollNumber,
        name,
        department,
        semester
    };
    students.push(student);
    saveStudents();
    renderStudents();
    closeAddStudentModal();
}
function openEditModal(id) {
    const student =
        students.find(
            student => student.id === id
        );
    if (!student) return;
    editingStudentId = id;
    document.getElementById(
        "editStudentId"
    ).value = student.id;
    document.getElementById(
        "editStudentName"
    ).value = student.name;
    document.getElementById(
        "editRollNumber"
    ).value = student.rollNumber;
    document.getElementById(
        "editDepartment"
    ).value = student.department;
    document.getElementById(
        "editSemester"
    ).value = student.semester;
    editStudentModal.classList.add(
        "active"
    );
}
closeEditModal.addEventListener(
    "click",
    closeEditStudentModal
);
cancelEditStudent.addEventListener(
    "click",
    closeEditStudentModal
);
function closeEditStudentModal() {
    editStudentModal.classList.remove(
        "active"
    );
}
updateStudentBtn.addEventListener(
    "click",
    updateStudent
);
function updateStudent() {
    const student =
        students.find(
            student =>
                student.id === editingStudentId
        );
    if (!student) return;
    student.name =
        document.getElementById(
            "editStudentName"
        ).value;
    student.rollNumber =
        document.getElementById(
            "editRollNumber"
        ).value;
    student.department =
        document.getElementById(
            "editDepartment"
        ).value;
    student.semester =
        document.getElementById(
            "editSemester"
        ).value;
    saveStudents();
    renderStudents();
    closeEditStudentModal();
}
function deleteStudent(id) {
    const confirmation =
        confirm(
            "Delete student permanently?"
        );
    if (!confirmation) return;
    students =
        students.filter(
            student => student.id !== id
        );
    Object.keys(attendance)
        .forEach(date => {
            delete attendance[date][id];
        });
    saveStudents();
    saveAttendance();
    renderStudents();
}
function toggleAttendance(id) {
    const date =
        attendanceDate.value;
    if (!attendance[date]) {
        attendance[date] = {};
    }
    attendance[date][id] =
        !attendance[date][id];
    renderStudents();
}
saveAttendanceBtn.addEventListener(
    "click",
    () => {
        saveAttendance();
        alert(
            "Attendance saved successfully."
        );
    }
);
searchStudent.addEventListener(
    "input",
    renderStudents
);
attendanceDate.addEventListener(
    "change",
    () => {

        const date =
            attendanceDate.value;

        if (!attendance[date]) {

            attendance[date] = {};
        }

        renderStudents();
    }
);
function updateDashboard() {
    const date =
        attendanceDate.value;
    let present = 0;
    students.forEach(student => {
        if (
            attendance[date] &&
            attendance[date][student.id]
        ) {
            present++;
        }
    });
    const total =
        students.length;
    const absent =
        total - present;
    const percentage =
        total === 0
            ? 0
            : (
                (present / total) * 100
            ).toFixed(1);
    totalStudents.textContent =
        total;
    presentCount.textContent =
        present;
    absentCount.textContent =
        absent;
    attendancePercentage.textContent =
        percentage + "%";
}
function renderStudents() {
    studentTableBody.innerHTML = "";
    const search =
        searchStudent.value
            .trim()
            .toLowerCase();
    const date =
        attendanceDate.value;
    const filteredStudents =
        students.filter(student =>
            student.name
                .toLowerCase()
                .includes(search)

            ||
            student.rollNumber
                .toLowerCase()
                .includes(search)

            ||
            student.id
                .toLowerCase()
                .includes(search)
        );
    filteredStudents.forEach(student => {
        const present =
            attendance[date]
            &&
            attendance[date][student.id];
        const row =
            document.createElement("tr");
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.rollNumber}</td>
            <td>${student.name}</td>
            <td>${student.department}</td>
            <td>${student.semester}</td>
            <td>
                <span class="${present
                ? "status-present"
                : "status-absent"
            }">
                    ${present
                ? "Present"
                : "Absent"
            }
                </span>
            </td>
            <td>
                <button
                    class="small-btn mark-btn"
                    onclick="toggleAttendance('${student.id}')">
                    ${present
                ? "Mark Absent"
                : "Mark Present"
            }
                </button>
            </td>
            <td>
                <div class="action-group">
                    <button
                        class="small-btn edit-btn"
                        onclick="openEditModal('${student.id}')">
                        Edit
                    </button>
                    <button
                        class="small-btn delete-btn"
                        onclick="deleteStudent('${student.id}')">
                        Delete
                    </button>
                </div>
            </td>
        `;
        studentTableBody.appendChild(row);
    });
    updateDashboard();
}
window.toggleAttendance =
    toggleAttendance;
window.deleteStudent =
    deleteStudent;
window.openEditModal =
    openEditModal;
const themeToggle =
    document.getElementById("themeToggle");
const savedTheme =
    localStorage.getItem("theme");
if (savedTheme === "dark") {
    document.body.classList.add(
        "dark-mode"
    );
    themeToggle.innerHTML = `
        <i class="fa-solid fa-sun"></i>
        <span>Light Mode</span>
    `;
}
themeToggle.addEventListener(
    "click",
    () => {
        document.body.classList.toggle(
            "dark-mode"
        );
        themeToggle.classList.add(
            "rotate"
        );
        setTimeout(() => {
            themeToggle.classList.remove(
                "rotate"
            );
        }, 500);
        const isDark =
            document.body.classList.contains(
                "dark-mode"
            );
        if (isDark) {
            localStorage.setItem(
                "theme",
                "dark"
            );
            themeToggle.innerHTML = `
                <i class="fa-solid fa-sun"></i>
                <span>Light Mode</span>
            `;
        } else {
            localStorage.setItem(
                "theme",
                "light"
            );
            themeToggle.innerHTML = `
                <i class="fa-solid fa-moon"></i>
                <span>Dark Mode</span>
            `;
        }
    }
);