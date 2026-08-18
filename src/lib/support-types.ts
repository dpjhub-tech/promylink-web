export interface SupportTicket {
  id: string;
  subject: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface SupportMessage {
  id: string;
  ticketId: string;
  senderId: string;
  message: string;
  isStaff: boolean;
  createdAt: string;
}
