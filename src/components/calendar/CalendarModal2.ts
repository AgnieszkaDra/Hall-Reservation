import { daysOfWeek } from "../../constants/daysOfWeek";
import { monthNames } from "../../constants/monthNames";
import { Hall } from "../../types/Hall";
import "../../styles/calendar2.scss";
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
  daysContainer.append(prevButton, nextButton);
  contentContainer.appendChild(daysContainer);

  const monthCell = document.createElement("div");
  monthCell.classList.add("calendar-month");
  monthCell.innerHTML = `<div class="month">${monthNames[new Date().getMonth()]}</div>`;
  modal.appendChild(monthCell);
  modal.appendChild(contentContainer);

  modalOverlay.appendChild(modal);
  document.body.appendChild(modalOverlay);

  const year = new Date().getFullYear();
  const dayWidth = 80;
  const startDate = new Date(year, 0, 1);
  const today = new Date();
  const diffInDays = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const currentScrollPosition = diffInDays * dayWidth;

  const openModal = async (hall: Hall) => {
    
    const halls = await fetchHalls();  

    if (halls.length === 0) {
      console.error("No halls available");
      return;
    }

    daysContainer.innerHTML = "";
    const totalDays = 365;
    const startDate = new Date(year, 0, 1);

    let scrollPosition = currentScrollPosition;

    for (let i = 0; i < totalDays; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      const dayIndex = date.getDay();
      const dayInfo = daysOfWeek[dayIndex];

      const dayCell = document.createElement("div");
      dayCell.classList.add("calendar-day");
      dayCell.innerHTML += `<div class="date">${date.getDate()}</div><div class="day-name">${dayInfo.short}</div>`;

      if (isHallOpenOnDay(hall, date)){
        dayCell.classList.add("available");
      }

      if (date.toDateString() === new Date().toDateString()) {
        dayCell.classList.add("active");
      }

      daysContainer.append(dayCell);
    }

    daysContainer.style.transform = `translateX(-${scrollPosition}px)`;
    modalOverlay.classList.add("visible");
  };

  let scrollPosition = currentScrollPosition;

  prevButton.addEventListener("click", () => {
    scrollPosition -= dayWidth;
    daysContainer.style.transform = `translateX(-${scrollPosition}px)`;
    daysContainer.style.transition = "transform 0.3s ease-in-out";
  });

  nextButton.addEventListener("click", () => {
    scrollPosition += dayWidth;
    daysContainer.style.transform = `translateX(-${scrollPosition}px)`;
    daysContainer.style.transition = "transform 0.3s ease-in-out";
  });

  contentContainer.append(prevButton, nextButton)

  return openModal;
};

