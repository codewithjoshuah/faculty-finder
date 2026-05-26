const facultyContainer = document.getElementById("facultyContainer");
const searchInput = document.getElementById("searchInput");
const resultCount = document.getElementById("resultCount");

function displayFaculty(data) {

  facultyContainer.innerHTML = "";

  resultCount.textContent = `${data.length} Results`;

  if (data.length === 0) {

    facultyContainer.innerHTML = `
      <p style="text-align:center; color:#64748b;">
        No faculty found
      </p>
    `;

    return;
  }

  data.forEach((faculty) => {

    const card = document.createElement("div");

    card.classList.add("faculty-card");

    card.innerHTML = `
      <div class="faculty-top">

        <div class="faculty-avatar">
          ${faculty.name.charAt(0)}
        </div>

        <div>
          <h2>${faculty.name}</h2>

          <p class="department-text">
            🏢 ${faculty.department}
          </p>
        </div>

      </div>

      <p>📘 ${faculty.subject}</p>

      <p>📍 ${faculty.cabin}</p>
    `;

    facultyContainer.appendChild(card);

  });

}

displayFaculty(facultyData);

searchInput.addEventListener("input", () => {

  const searchValue = searchInput.value.toLowerCase();

  const filteredFaculty = facultyData.filter((faculty) => {

    return (
      faculty.name.toLowerCase().includes(searchValue) ||
      faculty.department.toLowerCase().includes(searchValue) ||
      faculty.subject.toLowerCase().includes(searchValue)
    );

  });

  displayFaculty(filteredFaculty);

});