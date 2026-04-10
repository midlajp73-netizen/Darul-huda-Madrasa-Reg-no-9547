// Load data from localStorage
function getData() {
  return JSON.parse(localStorage.getItem("students")) || [];
}

// Save data
function saveData(data) {
  localStorage.setItem("students", JSON.stringify(data));
}

// Add student (Admin)
function addStudent() {
  let data = getData();

  let subjects = {
    quran: parseFloat(document.getElementById("sub1").value),
    fiqh: parseFloat(document.getElementById("sub2").value),
    aqidah: parseFloat(document.getElementById("sub3").value),
    arabic: parseFloat(document.getElementById("sub4").value),
    hadith: parseFloat(document.getElementById("sub5").value)
  };

  let totalMarks = Object.values(subjects).reduce((a, b) => a + b, 0);
  let maxTotal = 500;

  let percentage = ((totalMarks / maxTotal) * 100).toFixed(2);

  let student = {
    adm: document.getElementById("adm").value,
    name: document.getElementById("name").value,
    class: document.getElementById("class").value,
    subjects: subjects,
    total: totalMarks,
    percentage: percentage,
    ajar: document.getElementById("ajar").value,
    status: document.getElementById("status").value
  };

  data.push(student);
  saveData(data);

  alert("Result Added!");
}

// Search result
function searchResult() {
  let admNo = document.getElementById("admNo").value;
  let data = getData();

  let student = data.find(s => s.adm === admNo);

  let box = document.getElementById("resultBox");

  if (student) {
    box.innerHTML = `
      <h2>${student.name}</h2>
      <table>
        <tr><th>Admission No</th><td>${student.adm}</td></tr>
        <tr><th>Class</th><td>${student.class}</td></tr>
        <tr><th>Marks</th><td>${student.marks}/${student.total}</td></tr>
        <tr><th>Percentage</th><td>${student.percentage}%</td></tr>
        <tr><th>Status</th><td>${student.status}</td></tr>
        <tr><th>Total Ajar</th><td>${student.ajar}</td></tr>
      </table>
    `;
  } else {
    box.innerHTML = "<p style='color:red;'>No Result Found</p>";
  }
}

// Print
function printResult() {
  window.print();
}
