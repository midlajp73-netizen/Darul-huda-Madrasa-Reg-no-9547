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

  // Validation
  if (!document.getElementById("adm").value || !document.getElementById("name").value) {
    alert("Please fill all details");
    return;
  }

  let subjects = {
    quran: parseFloat(document.getElementById("sub1").value) || 0,
    fiqh: parseFloat(document.getElementById("sub2").value) || 0,
    aqidah: parseFloat(document.getElementById("sub3").value) || 0,
    arabic: parseFloat(document.getElementById("sub4").value) || 0,
    hadith: parseFloat(document.getElementById("sub5").value) || 0
  };

  let totalMarks = Object.values(subjects).reduce((a, b) => a + b, 0);
  let maxTotal = 400;

  let percentage = ((totalMarks / maxTotal) * 100).toFixed(2);

  let student = {
    adm: document.getElementById("adm").value.trim(),
    name: document.getElementById("name").value.trim(),
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

  // Clear form
  document.getElementById("adm").value = "";
  document.getElementById("name").value = "";
}

// Search result
function searchResult() {
  let admNo = document.getElementById("admNo").value.trim();
  let data = getData();
  let box = document.getElementById("resultBox");

  let student = data.find(s => s.adm === admNo);

  if (student) {
    box.innerHTML = `
      <h2>${student.name}</h2>
      <p>Class: ${student.class}</p>

      <table border="1">
        <tr><th>Subject</th><th>Marks</th></tr>
        <tr><td>Quran</td><td>${student.subjects.quran}</td></tr>
        <tr><td>Fiqh</td><td>${student.subjects.fiqh}</td></tr>
        <tr><td>Aqidah</td><td>${student.subjects.aqidah}</td></tr>
        <tr><td>Arabic</td><td>${student.subjects.arabic}</td></tr>
        <tr><td>Hadith</td><td>${student.subjects.hadith}</td></tr>
      </table>

      <table border="1">
        <tr><th>Total</th><td>${student.total}</td></tr>
        <tr><th>Percentage</th><td>${student.percentage}%</td></tr>
        <tr><th>Status</th><td>${student.status}</td></tr>
        <tr><th>Total Ajar</th><td>${student.ajar}</td></tr>
      </table>

      <button onclick="printResult()">🖨 Print</button>
    `;
  } else {
    box.innerHTML = "<p style='color:red;'>No Result Found</p>";
  }
}

// Print result
function printResult() {
  window.print();
}
