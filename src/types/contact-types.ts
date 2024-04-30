export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  message: string;
};
export type CreateRequestDto = Omit<Contact, "id">;
export type UpdateByIdRequestDto = Omit<Contact, "id">;
