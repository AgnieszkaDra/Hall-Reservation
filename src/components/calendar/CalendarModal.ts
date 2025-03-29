//2 

import { daysOfWeek } from "../../constants/daysOfWeek";
import { monthNames } from "../../constants/monthNames";
import { Hall } from "../../types/Hall";
import "../../styles/calendar.scss";

export const CalendarModal = (halls: Hall[]) => {
  const year = 2025;

  const modalOverlay = document.createElement("div");
  modalOverlay.classList.add("calendar-modal-overlay");

  const modal = document.createElement("div");
  modal.classList.add("calendar-modal");

  const closeButton = document.createElement("button");
  closeButton.textContent = "✖";
  closeButton.classList.add("close-button");

  closeButton.addEventListener("click", () => {
    modalOverlay.classList.remove("visible");
  });

  modal.appendChild(closeButton);

  const contentContainer = document.createElement("div");
  contentContainer.classList.add("calendar-wrapper");

  const monthYearDisplay = document.createElement("div");
  monthYearDisplay.classList.add("calendar-month-year");

  modal.appendChild(monthYearDisplay);

  const prevButton = document.createElement("button");
  prevButton.textContent = "‹";
  prevButton.classList.add("calendar-nav", "prev-btn");

  const nextButton = document.createElement("button");
  nextButton.textContent = "›";
  nextButton.classList.add("calendar-nav", "next-btn");

  const daysContainer = document.createElement("div");
  daysContainer.classList.add("calendar-days");

  contentContainer.appendChild(prevButton);
  contentContainer.appendChild(daysContainer);
  contentContainer.appendChild(nextButton);
  modal.appendChild(contentContainer);

  modalOverlay.appendChild(modal);
  document.body.appendChild(modalOverlay);

  const today = new Date();
  const todayMonth = today.getMonth();
  let activeDay = today.getDate();

  const openModal = (hall: Hall) => {
    daysContainer.innerHTML = "";
  
    const today = new Date();
    const todayDay = today.getDate();
    const todayMonth = today.getMonth();

    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  
      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, monthIndex, i);
        const dayIndex = date.getDay();
        const dayInfo = daysOfWeek[dayIndex];
        const apiDayName = dayInfo.api.toLowerCase();
  
        const dayCell = document.createElement("div");
        dayCell.classList.add("calendar-day");
        dayCell.setAttribute("data-month", String(monthIndex));
  
        dayCell.innerHTML = `<div class="date">${i}</div><div class="day-name">${dayInfo.short}</div>`;
        daysContainer.appendChild(dayCell);
      }
    }
   modalOverlay.classList.add("visible");
  };

  prevButton.addEventListener("click", () => {
    daysContainer.scrollBy({ left: -90, behavior: "smooth" });
  });

  nextButton.addEventListener("click", () => {
    daysContainer.scrollBy({ left: 90, behavior: "smooth" });
  });


  return openModal;
};


 