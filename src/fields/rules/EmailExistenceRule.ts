import { fetchOrganizers } from "../../api/fetchOrganizers";
import loggedUser from "../../api/loggedUser";
import { Organizer } from "../../types/Organizer";
import LoginUser from "../../ui/LoginUser";
import { Rule } from "./Rule";

export class EmailExistenceRule extends Rule {
    async validate(value: any): Promise<boolean> {
      const organizers = await fetchOrganizers(); 
      const exist = organizers.some((organizer: Organizer) => organizer.email === value);
      
        if(exist){
            const existsOrganizer = organizers.find((organizer: Organizer) => organizer.email === value);
            const updatedUser = await loggedUser(existsOrganizer);
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            window.location.href = '/'; 

      }
      return exist;
    }
  
    getErrorMessage(): string {
      return "This email is already registered.";
    }
  }