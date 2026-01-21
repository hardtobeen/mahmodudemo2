
export type NavItem = 'dashboard' | 'clients' | 'projects' | 'requests' | 'media' | 'chatbot' | 'chatbot_builder' | 'chat_client' | 'settings';

export interface Stat {
  label: string;
  value: string | number;
  trend?: string;
  trendType: 'positive' | 'negative' | 'neutral';
  icon: string;
  colorClass: string;
}

export interface Project {
  id: string;
  title: string;
  lastModified: string;
  imageUrl: string;
}

export interface ClientRequest {
  id: string;
  client: string;
  request: string;
  status: 'In Progress' | 'High Priority' | 'Completed';
  date: string;
  initials: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
