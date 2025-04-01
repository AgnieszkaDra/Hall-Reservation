import { daysOfWeek } from "../../constants/daysOfWeek";
import { monthNames } from "../../constants/monthNames";
import { Hall } from "../../types/Hall";
import "../../styles/calendar.scss";
import CloseButton from "../../ui/CloseButton";
import CalendarNavigation from "../../ui/CalendarNavigation";
import { fetchHalls } from "../../api/fetchHalls";

const isHallOpenOnDay = (hall: Hall, date: Date): boolean => {
  const dayOfWeek = daysOfWeek[date.getDay()].api.toLowerCase();
  return hall.openingdays.includes(dayOfWeek);
};

export const CalendarModal = (hall: Hall) => {
  const modalOverlay = document.createElement("div");
  modalOverlay.classList.add("calendar-modal-overlay");

  const modal = document.createElement("div");
  modal.classList.add("calendar-modal");

  const closeButton = new CloseButton(modalOverlay);
  modal.appendChild(closeButton.render());

  const contentContainer = document.createElement("div");
  contentContainer.classList.add("calendar-wrapper");

  const monthYearDisplay = document.createElement("div");
  monthYearDisplay.classList.add("calendar-month-year");
  modal.appendChild(monthYearDisplay);

  const calendarNav = new CalendarNavigation();
  const { prevButton, nextButton } = calendarNav.render();

  const daysContainer = document.createElement("div");
  daysContainer.classList.add("calendar-days");
  contentContainer.appendChild(daysContainer);

  modal.appendChild(contentContainer);
  modalOverlay.appendChild(modal);
  document.body.appendChild(modalOverlay);

  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();

  const renderCalendar = async () => {
    const halls = await fetchHalls();
    if (halls.length === 0) {
      console.error("No halls available");
      return;
    }

    monthYearDisplay.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    daysContainer.innerHTML = "";

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let i = 0; i < firstDayOfMonth; i++) {
      const emptyCell = document.createElement("div");
      emptyCell.classList.add("calendar-day", "empty");
      daysContainer.appendChild(emptyCell);
    }

    for (let day = 1; day <= totalDaysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dayCell = document.createElement("div");
      dayCell.classList.add("calendar-day");

      dayCell.innerHTML = `<div class="date">${day}</div>
                           <div class="day-name">${daysOfWeek[date.getDay()].short}</div>`;

      if (isHallOpenOnDay(hall, date)) {
        dayCell.classList.add("available");
      }

      if (
        date.getDate() === new Date().getDate() &&
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear()
      ) {
        dayCell.classList.add("active");
      }
      daysContainer.appendChild(dayCell);
    }
    modalOverlay.classList.add("visible");
  };

  prevButton.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar();
  });

  nextButton.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar();
  });

  contentContainer.append(prevButton, nextButton);
  renderCalendar();

  return renderCalendar;
};