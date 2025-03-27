import { daysOfWeek } from "../../constants/daysOfWeek";
import { monthNames } from "../../constants/monthNames";
import { Hall } from "../../types/Hall";
import createTitle from "../../typography/createTitle";
import "../../styles/calendar.scss";

export const CalendarModal = (halls: Hall[]) => {
  const year = 2025;

  const modalOverlay = document.createElement("div");
  modalOverlay.classList.add("calendar-modal-overlay");
  modalOverlay.style.display = "none";

  const modal = document.createElement("div");
  modal.classList.add("calendar-modal");

  const closeButton = document.createElement("button");
  closeButton.textContent = "✖";
  closeButton.classList.add("close-button");

  closeButton.addEventListener("click", () => {
    modalOverlay.style.display = "none";
  });

  modal.appendChild(closeButton);

  const contentContainer = document.createElement("div");
  contentContainer.classList.add("calendar-content");
  modal.appendChild(contentContainer);

  modalOverlay.appendChild(modal);
  document.body.appendChild(modalOverlay);

  const openModal = (hall: Hall) => {
    contentContainer.innerHTML = "";
 

    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      const month = monthNames[monthIndex];
      const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
      const firstDayOfMonth = new Date(year, monthIndex, 1).getDay();

      const monthContainer = document.createElement("div");
      monthContainer.classList.add("calendar-month");

      const monthTitle = createTitle("h3", `${month} ${year}`, "calendar-month__title");
      monthContainer.appendChild(monthTitle);

      const calendar = document.createElement("div");
      calendar.classList.add("calendar");

      for (let i = 0; i < (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1); i++) {
        const emptyCell = document.createElement("div");
        emptyCell.classList.add("calendar-day", "empty");
        calendar.appendChild(emptyCell);
      }

      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, monthIndex, i);
        const dayIndex = date.getDay();
        const dayInfo = daysOfWeek[dayIndex];
        const apiDayName = dayInfo.api.toLowerCase();
      
        const dayCell = document.createElement("div");
        dayCell.classList.add("calendar-day");
      
        const today = new Date();
        if (
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear()
        ) {
          dayCell.classList.add("active");
        }
      
        if (hall.openingdays.includes(apiDayName)) {
          dayCell.classList.add("available");
        }
      
        dayCell.innerHTML = `<div class="date">${i}</div><div class="day-name">${dayInfo.short}</div>`;
      
        calendar.appendChild(dayCell);
      }

      monthContainer.appendChild(calendar);
      contentContainer.appendChild(monthContainer);
    }

    modalOverlay.style.display = "flex";
  };

  return openModal;
};







// import { daysOfWeek } from "../../constants/daysOfWeek";
// import { monthNames } from "../../constants/monthNames";
// import { Hall } from "../../types/Hall";
// import createTitle from "../../typography/createTitle";
// import "../../styles/calendar.scss";

// export const CalendarModal = () => {

//   const year = 2025;

//   const modalOverlay = document.createElement("div");
//   modalOverlay.classList.add("calendar-modal-overlay");
//   modalOverlay.style.display = "none";

//   const modal = document.createElement("div");
//   modal.classList.add("calendar-modal");

//   const closeButton = document.createElement("button");
//   closeButton.textContent = "✖";
//   closeButton.classList.add("close-button");

//   closeButton.addEventListener("click", () => {
//     modalOverlay.style.display = "none";
//   });

//   modal.appendChild(closeButton);

//   const titleElement = createTitle("h2", `Kalendarz rezerwacji`, "reservation__title");
//   modal.appendChild(titleElement);

//   const contentContainer = document.createElement("div");
//   contentContainer.classList.add("calendar-content");
//   modal.appendChild(contentContainer);

//   modalOverlay.appendChild(modal);
//   document.body.appendChild(modalOverlay);

//   const openModal = (hall: Hall) => {
//     contentContainer.innerHTML = ""; 
//     titleElement.textContent = `Kalendarz rezerwacji: ${hall.name}`;

//     for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
//       const month = monthNames[monthIndex];
//       const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
//       const firstDayOfMonth = new Date(year, monthIndex, 1).getDay();

//       const monthContainer = document.createElement("div");
//       monthContainer.classList.add("calendar-month");

//       const monthTitle = createTitle("h3", `${month} ${year}`, "calendar-month__title");
//       monthContainer.appendChild(monthTitle);

//       const calendar = document.createElement("div");
//       calendar.classList.add("calendar");

//       for (let i = 0; i < (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1); i++) {
//         const emptyCell = document.createElement("div");
//         emptyCell.classList.add("calendar-day", "empty");
//         calendar.appendChild(emptyCell);
//       }

//       for (let i = 1; i <= daysInMonth; i++) {
//         const date = new Date(year, monthIndex, i);
//         const dayOfWeek = daysOfWeek[date.getDay()];
//         const dayCell = document.createElement("div");
//         dayCell.classList.add("calendar-day");

//         if (hall.openingdays.includes(dayOfWeek.toLowerCase())) {
//           dayCell.classList.add("available");
//           dayCell.innerHTML = `<div class="date">${i}</div><div class="day-name">${dayOfWeek}</div>`;
//         } else {
//           dayCell.innerHTML = `<div class="date">${i}</div><div class="day-name">${dayOfWeek}</div>`;
//         }

//         calendar.appendChild(dayCell);
//       }

//       monthContainer.appendChild(calendar);
//       contentContainer.appendChild(monthContainer);
//     }

//     modalOverlay.style.display = "flex";
//   };

//   return openModal;
// };