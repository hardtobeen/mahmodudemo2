
export type NavItem = 'dashboard' | 'clients' | 'tours' | 'leads' | 'assets' | 'concierge' | 'guide_builder' | 'messages' | 'settings';

export interface Stat {
  label: string;
  value: string | number;
  trend?: string;
  trendType: 'positive' | 'negative' | 'neutral';
  icon: string;
  colorClass: string;
}

export interface Tour {
  id: string;
  title: string;
  lastScanned: string;
  imageUrl: string;
  panoramas: number;
  status: 'Published' | 'Draft' | 'Processing';
  propertyType: 'Residential' | 'Commercial' | 'Industrial' | 'Retail';
  views: number;
}

/* Added Project interface used in ProjectCard and ProjectsView */
export interface Project {
  id: string;
  title: string;
  lastModified: string;
  imageUrl: string;
  progress: number;
  status: 'Active' | 'Completed' | 'Paused';
  category: string;
}

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  status: 'Active' | 'Lead' | 'Partner' | 'Inactive'; /* Added 'Inactive' to support ClientsView */
  toursCount?: number;
  avatar: string;
  value?: string; /* Added value property used in ClientsView */
}

export interface LeadRequest {
  id: string;
  client: string;
  initials: string;
  interest: string;
  status: 'Pending' | 'Contacted' | 'Closed';
  date: string;
  sourceTour: string;
}

/* Added ClientRequest interface used in RequestsView */
export interface ClientRequest {
  id: string;
  client: string;
  initials: string;
  request: string;
  status: string;
  priority: 'High' | 'Medium' | 'Low';
  date: string;
}

export interface MediaAsset {
  id: string;
  name: string;
  type: 'panorama' | 'video' | 'floorplan' | 'doc' | 'pdf' | 'image'; /* Expanded types used in MediaView */
  size: string;
  date: string;
  thumbnail?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp?: string;
}
