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

      <p>${faculty.status}</p>

      <button class="view-more-btn">
  View More
</button>

    `;

    card.addEventListener("click", () => {
      openModal(faculty);
    });

    facultyContainer.appendChild(card);

  });

}

function openModal(faculty) {

  const oldModal = document.querySelector(".modal-overlay");

  if (oldModal) {
    oldModal.remove();
  }

  const modal = document.createElement("div");

  modal.classList.add("modal-overlay");

  let timetableHTML = "";

  for (const day in faculty.timetable) {

    timetableHTML += `

      <div class="day-block">

        <h3>
          ${day.charAt(0).toUpperCase() + day.slice(1)}
        </h3>

        ${faculty.timetable[day]
          .map(item => `<p>${item}</p>`)
          .join("")}

      </div>

    `;
  }

  modal.innerHTML = `

    <div class="modal-content">

      <button class="close-btn">✖</button>

      <div class="modal-header">

        <div class="faculty-avatar large-avatar">
          ${faculty.name.charAt(0)}
        </div>

        <div>

          <h2>${faculty.name}</h2>

          <p>${faculty.department}</p>

        </div>

      </div>

      <div class="modal-info">

        <p>📘 ${faculty.subject}</p>

        <p>📍 ${faculty.cabin}</p>

        <p>📞 ${faculty.phone}</p>

        <p>✉️ ${faculty.email}</p>

        <p>${faculty.status}</p>

      </div>

      <h2 class="timetable-title">
        Weekly Timetable
      </h2>

      <div class="timetable-container">

        ${timetableHTML}

      </div>

    </div>

  `;

  document.body.appendChild(modal);

  modal.querySelector(".close-btn")
    .addEventListener("click", () => {
      modal.remove();
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