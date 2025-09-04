//pg de la que descarregar calendar: https://fullcalendar.io/docs/getting-started 

import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './CalendarPage.css';

const Calendari = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: ''
  });

  // Afegir nova tasca al calendari
  const handleAddTask = (e) => {
    e.preventDefault();
    if (
      !taskForm.title.trim() ||
      !taskForm.startDate ||
      !taskForm.endDate ||
      !taskForm.startTime ||
      !taskForm.endTime
    ) return;

    // Combina data i hora per a FullCalendar
    const start = `${taskForm.startDate}T${taskForm.startTime}`;
    const end = `${taskForm.endDate}T${taskForm.endTime}`;

    setEvents(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        title: taskForm.title,
        start,
        end,
        backgroundColor: '#e3f2fd',
        borderColor: '#2196f3'
      }
    ]);
    setTaskForm({
      title: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: ''
    });
    setShowModal(false);
  };

  return (
    <div className="calendar-page">
      <div className="calendar-header">
        <h1>📅 Calendari</h1>
        <p>Afegix el teu esdeveniment al calendari</p>
        <div className="calendar-actions">
          <button 
            onClick={() => setShowModal(true)}
            className="create-reminder-btn"
          >
            ➕ Afegir esdeveniment
          </button>
        </div>
        {/* Modal per afegir tasca */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <h3>Afegir esdeveniment</h3>
              <form onSubmit={handleAddTask}>
                <div className="form-group">
                  <label>Títol del teu esdeveniment:</label>
                  <input
                    type="text"
                    value={taskForm.title}
                    onChange={e => setTaskForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Ex: activitat dirigida, art-teràpia..."
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Data d'inici:</label>
                  <input
                    type="date"
                    value={taskForm.startDate}
                    onChange={e => setTaskForm(prev => ({ ...prev, startDate: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Hora d'inici:</label>
                  <input
                    type="time"
                    value={taskForm.startTime}
                    onChange={e => setTaskForm(prev => ({ ...prev, startTime: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Data de fi:</label>
                  <input
                    type="date"
                    value={taskForm.endDate}
                    onChange={e => setTaskForm(prev => ({ ...prev, endDate: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Hora de fi:</label>
                  <input
                    type="time"
                    value={taskForm.endTime}
                    onChange={e => setTaskForm(prev => ({ ...prev, endTime: e.target.value }))}
                    required
                  />
                </div>
                <div className="modal-actions">
                  <button type="button" onClick={() => setShowModal(false)} className="cancel-btn">
                    Cancel·lar
                  </button>
                  <button type="submit" className="confirm-btn">
                    Afegir
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: ''
          }}
          events={events}
          height="auto"
          locale="ca"
          firstDay={1}
          eventDisplay="block"
          dayMaxEvents={3}
          moreLinkClick="popover"
        />
      </div>

    </div>
  );
};

export default Calendari