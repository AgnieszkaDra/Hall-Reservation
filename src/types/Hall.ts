export type Hall ={
  id: string,
  name: string;
  openinghours: {
    start: string;
    end: string;
  };
  openingdays: string[];
}