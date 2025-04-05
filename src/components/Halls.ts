import { fetchHalls } from "../api/fetchHalls";
import { Hall } from "../types/Hall";
import createTitle from "../typography/createTitle";
import { CalendarModal } from "./calendar/CalendarModal";
import "../styles/main.scss";
import { createLink } from "../ui/createLink";

export const Halls = async (): Promise<HTMLElement> => {
  const hallsContainer = document.createElement("ul");
  hallsContainer.classList.add("hall-list");

  const hallsList = await fetchHalls();
  hallsList.forEach((hall: Hall) => {
    const listItem = document.createElement("li");
    listItem.classList.add("hall-list__item");

    const listItemDescription = document.createElement("div");
    listItemDescription.classList.add("hall-list__description");

    const titleContent = hall.name;
    const title = createTitle("h2", titleContent, "hall-list__title");

    const reservationLink = createLink(`${hall.id}`, "Zarezerwuj salę", "hall-list__link");

    listItemDescription.appendChild(title);
    listItemDescription.appendChild(reservationLink);

    reservationLink.addEventListener("click", (event: Event) => {
      event.preventDefault();
      const user = localStorage.getItem("currentUser");
      if(user) {
        const openCalendar = CalendarModal(hall); 
        openCalendar();
      } else {
        return
      }
      
    });

    listItem.appendChild(listItemDescription);
    hallsContainer.appendChild(listItem);
  });

  return hallsContainer;
};