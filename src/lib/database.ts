
// Mock database utilities for campus activities management system

// Storage keys for localStorage
const STORAGE_KEYS = {
  USERS: "campus_users",
  EVENTS: "campus_events",
  APPLICATIONS: "campus_applications",
  REGISTRATIONS: "campus_registrations"
};

// User types
type UserRole = "student" | "club";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  studentId?: string;
  credits?: number;
}

// Event types
interface Event {
  id: number;
  title: string;
  organizer: string;
  date: string;
  status: "upcoming" | "past";
  description: string;
  credits: number;
  location: string;
  category?: string;
  internship: boolean;
  prizePool: string;
  registrations: number;
  tags: string[];
}

// Application types
interface Application {
  id: number;
  userId: string;
  userName: string;
  studentId: string;
  position: string;
  clubId: string;
  status: "pending" | "accepted" | "rejected";
  date: string;
  skills: string[];
}

// Registration types
interface Registration {
  id: number;
  eventId: number;
  userId: string;
  userName: string;
  studentId?: string;
  date: string;
}

// Initialize local storage if not already set
const initStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([]));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.EVENTS)) {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify([]));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.APPLICATIONS)) {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify([]));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.REGISTRATIONS)) {
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify([]));
  }
};

// Initialize storage
initStorage();

// Get all users
export const getUsers = (): User[] => {
  const users = localStorage.getItem(STORAGE_KEYS.USERS);
  return users ? JSON.parse(users) : [];
};

// Find user by student ID
export const findUserByStudentId = (studentId: string): User | undefined => {
  const users = getUsers();
  return users.find(user => user.studentId === studentId);
};

// Update user credits
export const updateUserCredits = (studentId: string, newCredits: number): boolean => {
  const users = getUsers();
  const userIndex = users.findIndex(user => user.studentId === studentId);
  
  if (userIndex === -1) return false;
  
  users[userIndex].credits = newCredits;
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  return true;
};

// Get all applications
export const getApplications = (): Application[] => {
  const applications = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
  return applications ? JSON.parse(applications) : [];
};

// Get applications by club ID
export const getApplicationsByClub = (clubId: string): Application[] => {
  const applications = getApplications();
  return applications.filter(app => app.clubId === clubId);
};

// Get all registrations
export const getRegistrations = (): Registration[] => {
  const registrations = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
  return registrations ? JSON.parse(registrations) : [];
};

// Get registrations for an event
export const getRegistrationsByEvent = (eventId: number): Registration[] => {
  const registrations = getRegistrations();
  return registrations.filter(reg => reg.eventId === eventId);
};

// Search users
export const searchUsers = (query: string): User[] => {
  const users = getUsers();
  const lowerQuery = query.toLowerCase();
  
  return users.filter(user => 
    user.name.toLowerCase().includes(lowerQuery) || 
    user.email.toLowerCase().includes(lowerQuery) ||
    (user.studentId && user.studentId.toLowerCase().includes(lowerQuery))
  );
};

export default {
  getUsers,
  findUserByStudentId,
  updateUserCredits,
  getApplications,
  getApplicationsByClub,
  getRegistrations,
  getRegistrationsByEvent,
  searchUsers
};
