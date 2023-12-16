import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // to retrieve params from the URL
import { getCallDetails, Call } from '../services/callService';
import './CallDetails.css';

const CallDetails = () => {
  const { callId } = useParams<{ callId: string }>(); // Get the callId from the URL
  const [call, setCall] = useState<Call | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (callId) {
      const fetchDetails = async () => {
        try {
          const data = await getCallDetails(callId);
          console.log('Fetched call details:', data); // Debug: Log fetched data
          setCall(data);
        } catch (err) {
          console.error('Failed to fetch call details:', err); // Debug: Log error
          setError('Failed to fetch call details');
        }
      };

      fetchDetails();
    }
  }, [callId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!call) {
    return <div>Loading call details...</div>;
  }

  return (
    <div className="call-details-container">
      <div className="call-details-card">
        <h2>Call Details</h2>
        <p><strong>Call ID:</strong> {call.id}</p>
        <p><strong>Call Type:</strong> {call.call_type}</p>
        <p><strong>Duration:</strong> {call.duration} seconds</p>
        <p><strong>From:</strong> {call.from}</p>
        <p><strong>To:</strong> {call.to}</p>
        <p><strong>Via:</strong> {call.via}</p>
        <div className="notes-section">
          <h3>Notes:</h3>
          {call.notes && call.notes.length > 0 ? (
            <ul className="notes-list">
              {call.notes.map(note => (
                <li key={note.id}>{note.content}</li>
              ))}
            </ul>
          ) : (
            <p className="no-notes">No notes available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallDetails;
