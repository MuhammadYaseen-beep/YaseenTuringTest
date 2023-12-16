
import api from './api';

// Define the Note model based on the provided structure
interface Note {
  id: string;
  content: string;
}

// Define the Call model based on the provided structure
export interface Call {
  id: string;
  direction: string; // "inbound" or "outbound"
  from: string; // Caller's number
  to: string; // Callee's number
  duration: number; // Duration in seconds
  is_archived: boolean; // Archived status
  call_type: string; // "missed", "answered", or "voicemail"
  via: string; // Aircall number used
  created_at: string; // Timestamp of call creation
  notes: Note[]; // Array of notes
}

// Function to fetch calls with pagination
//GET calls
// Define a new interface for the response
interface CallsResponse {
    nodes: Call[];
    totalCount: number;
    hasNextPage: boolean;
  }
  
  export const getCalls = async (offset: number, limit: number): Promise<CallsResponse> => {
    try {
      const response = await api.get<CallsResponse>('/calls', { params: { offset, limit } });
      return response.data; // Now returning the whole response object
    } catch (error) {
      throw error;
    }
  };

//GET calls/{ID}
export const getCallDetails = async (callId: string): Promise<Call> => {
    try {
      const response = await api.get<Call>(`/calls/${callId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

//POST calls/{callID}/note
interface NoteData {
    content: string;
  }
  
  export const addNoteToCall = async (callId: string, noteContent: string): Promise<Call> => {
    try {
      const response = await api.post<Call>(`/calls/${callId}/note`, { content: noteContent } as NoteData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

// PUT calls/{callID}/archive 
export const toggleArchiveCall = async (callId: string, archiveStatus: boolean): Promise<void> => {
    try {
      await api.put(`/calls/${callId}/archive`, { is_archived: archiveStatus });
    } catch (error) {
      throw error;
    }
  };
  