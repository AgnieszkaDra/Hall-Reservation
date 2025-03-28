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
  contentContainer.classList.add("calendar-wrapper");

  const monthYearDisplay = document.createElement("div");
  monthYearDisplay.classList.add("calendar-month-year");
  monthYearDisplay.textContent = "";

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

  let activeMonth = new Date().getMonth(); 

  const updateMonthYear = () => {
    const dayCells = Array.from(document.querySelectorAll(".calendar-day")) as HTMLElement[];
    
    // const firstVisibleDay = dayCells.find((day) => {
    //   const rect = day.getBoundingClientRect();
    //   return rect.left >= daysContainer.getBoundingClientRect().left && rect.right <= daysContainer.getBoundingClientRect().right;
    // });
  
    // if (firstVisibleDay) {
    //   const monthIndex = Number(firstVisibleDay.getAttribute("data-month"));
    //   if (!isNaN(monthIndex)) {
    //     activeMonth = monthIndex;
    //     monthYearDisplay.textContent = `${monthNames[monthIndex]} ${year}`;
    //     return; 
    //   }
    // }
  
    const activeDay = document.querySelector(".calendar-day.active");
    if (activeDay) {
      const monthIndex = Number(activeDay.getAttribute("data-month"));
      if (!isNaN(monthIndex)) {
        activeMonth = monthIndex;
        monthYearDisplay.textContent = `${monthNames[monthIndex]} ${year}`;
      }
    }
  };

  const updateActualDay =() => {
    //const dayCells = Array.from(document.querySelectorAll(".calendar-day")) as HTMLElement[];
    const activeDay = document.querySelector(".calendar-day.active");
    
    // const firstVisibleDay = activeDay.find((day: { getBoundingClientRect: () => any; }) => {
    //   const rect = day.getBoundingClientRect();
    //   console.log(rect)
    //   return rect.left >= daysContainer.getBoundingClientRect().left && rect.right <= daysContainer.getBoundingClientRect().right;
    // });
  
    if (activeDay) {
      const monthIndex = Number(activeDay.getAttribute("data-month"));
      if (!isNaN(monthIndex)) {
        activeMonth = monthIndex;
        monthYearDisplay.textContent = `${monthNames[monthIndex]} ${year}`;
        return; 
      }
    }
  }

  const getFirstVisibleDay = (): HTMLElement | undefined => {
    const activeDay = document.querySelector(".calendar-day.active");
    if (!activeDay) {
      return undefined;
    }
    const rect = activeDay.getBoundingClientRect();
    console.log(rect)
    // return Array.from(document.querySelectorAll(".calendar-day")).find((day) => {
    //   const rect = day.getBoundingClientRect();
    //   const containerRect = daysContainer.getBoundingClientRect();
    //   return rect.left >= containerRect.left && rect.right <= containerRect.right;
    // }) as HTMLElement | undefined;
  };

  const openModal2 = (hall: Hall) => {
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
  
        if (hall.openingdays.includes(apiDayName)) {
          dayCell.classList.add("available");
        }
  
        if (i === todayDay && monthIndex === todayMonth) {
          dayCell.classList.add("active");
          dayCell.addEventListener("click", () => openModal2(hall));
        }
  
        dayCell.innerHTML = `<div class="date">${i}</div><div class="day-name">${dayInfo.short}</div>`;
        daysContainer.appendChild(dayCell);
      }
    }
  
    const activeDay = document.querySelector(".calendar-day.active");
    console.log(activeDay)
    setTimeout(() => {
      const activeDay = document.querySelector(".calendar-day.active");
      if (activeDay) {
        //activeDay.scrollIntoView({ inline: "center", behavior: "smooth" });
        updateMonthYear();
        updateActualDay()
        getFirstVisibleDay()
      }
    }, 300);
  
    modalOverlay.style.display = "flex";
  };

  // Navigation logic
  prevButton.addEventListener("click", () => {
    daysContainer.scrollBy({ left: -90, behavior: "smooth" });
    setTimeout(updateMonthYear, 300);
    setTimeout(updateActualDay, 300);
  });

  nextButton.addEventListener("click", () => {
    daysContainer.scrollBy({ left: 90, behavior: "smooth" });
    setTimeout(updateMonthYear, 300);
    setTimeout(updateActualDay, 300);
  });

  daysContainer.addEventListener("scroll", () => {
    setTimeout(updateMonthYear, 200);
  });

  return openModal2;
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