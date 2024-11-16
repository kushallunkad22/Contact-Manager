import axios from 'axios';
import {Contact} from '../ContactManager';

const API = axios.create({
  baseURL: 'http://localhost:8787', // Replace with your backend's base URL
});

export const addContact = async (contact: Omit<Contact, 'id'>) => {
  const response = await API.post('/contacts', contact);
  return response.data;
};

export const updateContact = async (id: number, contact: Partial<Contact>) => {
  const response = await API.put(`/contacts/${id}`, contact);
  return response.data;
};

export const deleteContact = async (id: number) => {
  const response = await API.delete(`/contacts/${id}`);
  return response.data;
};

export const getContacts = async (): Promise<Contact[]> => {
    // Fetch contacts from the backend
    const response = await API.get('/contacts');
    return response.data.contacts;
  };
