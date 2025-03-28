import { fetchHalls } from "../api/fetchHalls";
import { Hall } from "../types/Hall";
import createTitle from "../typography/createTitle";
import { CalendarModal } from "./calendar/CalendarModal";
import "../styles/main.scss";

export const Halls = async (): Promise<HTMLElement> => {
  const hallsContainer = document.createElement("ul");
  hallsContainer.classList.add("halls");

  const hallsList = await fetchHalls();
  const openCalendar = CalendarModal(hallsList);

  hallsList.forEach((hall: Hall) => {
    const listItem = document.createElement("li");
    listItem.classList.add("halls__item");

    const listItemDescription = document.createElement("div");
    listItemDescription.classList.add("halls__description");

    const titleWrapper = document.createElement("div");
    const titleContent = hall.name;
    const title = createTitle("h2", titleContent, "halls__title");

    titleWrapper.appendChild(title);

    const link = document.createElement("a");
    link.href = `/hall/${hall.id}`;
    link.textContent = "Zarezerwuj salę";
    link.classList.add("halls__link");

    listItemDescription.appendChild(titleWrapper);
    listItemDescription.appendChild(link);

    link.addEventListener("click", (event: Event) => {
      event.preventDefault();
      openCalendar(hall);
      //CalendarModal()
    });

    listItem.appendChild(listItemDescription);
    hallsContainer.appendChild(listItem);
  });

  return hallsContainer;
};