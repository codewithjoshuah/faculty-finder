const facultyContainer = document.getElementById("facultyContainer");
const searchInput = document.getElementById("searchInput");

function displayFaculty(data) {

  facultyContainer.innerHTML = "";

  if (data.length === 0) {
    facultyContainer.innerHTML = "<p>No faculty found.</p>";
    return;
  }

  data.forEach(faculty => {

    const card = document.createElement("div");
    card.classList.add("faculty-card");

    card.innerHTML = `
      <h2>${faculty.name}</h2>

      <p><strong>Department:</strong> ${faculty.department}</p>

      <p><strong>Subject:</strong> ${faculty.subject}</p>

      <p><strong>Cabin:</strong> ${faculty.cabin}</p>
    `;

    facultyContainer.appendChild(card);

  });
}

displayFaculty(facultyData);

searchInput.addEventListener("input", () => {

  const searchValue = searchInput.value.toLowerCase();

  const filteredFaculty = facultyData.filter(faculty => {

    return (
      faculty.name.toLowerCase().includes(searchValue) ||
      faculty.department.toLowerCase().includes(searchValue) ||
      faculty.subject.toLowerCase().includes(searchValue)
    );

  });

  displayFaculty(filteredFaculty);

});