export type Message = {
  userId: null | string;
  id: number | string;
  text: string;
  role: 'user' | 'ai';
}