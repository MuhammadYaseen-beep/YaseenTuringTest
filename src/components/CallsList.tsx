
import React, { useState, useEffect } from 'react';
import { getCalls, toggleArchiveCall, addNoteToCall, Call } from '../services/callService';
import { logout } from '../services/authService';
import { useNavigate } from 'react-router-dom'; // Import useNavigate 

import './CallsList.css';

const CallsList = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [statusFilter, setStatusFilter] = useState('All');

  const navigate = useNavigate();

  const pageSize = 10;

  useEffect(() => {
    fetchCalls();
  }, [currentPage]);

  const fetchCalls = async () => {
    setLoading(true);
    try {
      const response = await getCalls(currentPage * pageSize, pageSize);
      setCalls(response.nodes); // Accessing nodes directly from the response
      setTotalCount(response.totalCount); // Accessing totalCount from the response
    } catch (err) {
      setError('Error fetching calls');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  

  const handleLogoutClick = () => {
    logout();
    navigate('/login'); // navigate to login

  };

  const handleCallTypeClick = (callId: string) => {
    navigate(`/calls/${callId}`);
  };

  const handleArchiveClick = async (callId: string, isArchived: boolean) => {
    try {
      await toggleArchiveCall(callId, !isArchived);
      fetchCalls(); // Refetch calls to update the list
    } catch (err) {
      setError('Error updating the call status');
      console.error(err);
    }
  };

  const filteredCalls = calls.filter(call => {
    if (statusFilter === 'All') return true;
    return statusFilter === 'Archived' ? call.is_archived : !call.is_archived;
  });

  
  const handleAddNoteClick = async (callId: string) => {
    const noteContent = prompt('Enter note content:');
    if (noteContent) {
      try {
        await addNoteToCall(callId, noteContent);
        fetchCalls(); // Refetch calls to update the list
      } catch (err) {
        setError('Error adding note to the call');
        console.error(err);
      }
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="calls-list">
      <header className="header">
        <h1>Turing Technologies</h1>
        <button className="logout-button" onClick={handleLogoutClick}>Log out</button>
      </header>
      <h1>Turing Technologies Frontend Test</h1>

      <div className="filter-section">
        <label htmlFor="statusFilter">Filter by: Status </label>
        <select
          name="statusFilter"
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Archived">Archived</option>
          <option value="Unarchived">Unarchived</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Call Type</th>
            <th>Direction</th>
            <th>Duration</th>
            <th>From</th>
            <th>To</th>
            <th>Via</th>
            <th>Created At</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {filteredCalls.map((call) => (

            <tr key={call.id}>
              <td className="call-type" onClick={async () => await handleCallTypeClick(call.id)}>{call.call_type}</td>
              <td>{call.direction}</td>
              <td>{call.duration} seconds</td>
              <td>{call.from}</td>
              <td>{call.to}</td>
              <td>{call.via}</td>
              <td>{new Date(call.created_at).toLocaleString()}</td>
              <td>{call.is_archived ? 'Archived' : 'Unarchived'}
                <button className="arch-button" onClick={() => handleArchiveClick(call.id, call.is_archived)}>
                    {call.is_archived ? 'Unarchive' : 'Archive'}
                </button>
              </td>
              <td>
                <button className="note-button" onClick={() => handleAddNoteClick(call.id)}>Add Note</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button disabled={currentPage === 0} onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
        {[...Array(Math.ceil(totalCount / pageSize)).keys()].map(number => (
          <button
            key={number}
            disabled={number === currentPage}
            onClick={() => handlePageChange(number)}
          >
            {number + 1}
          </button>
        ))}
        <button
          disabled={(currentPage + 1) * pageSize >= totalCount}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CallsList;
