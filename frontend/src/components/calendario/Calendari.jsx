//pg de la que descarregar calendar: https://fullcalendar.io/docs/getting-started 

import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './CalendarPage.css';
import ListaDeTareas from '../tareas/ListaDeTareas';

const Calendari = ({ transportes = [] }) => {
  const [events, setEvents] = useState([]);
  const [showModalEsdeveniment, setShowModalEsdeveniment] = useState(false);
  const [showModalTasca, setShowModalTasca] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    user: ''
  });

  // Actualitza els events quan canvien els transports
  useEffect(() => {
    const eventsFromTransportes = transportes
      .filter(t => t.fechaInicio && t.fechaFin)
      .map(t => ({
        id: t.id,
        title: t.nombre || t.vehiculo || "Transport",
        start: t.fechaInicio,
        end: t.fechaFin,
        backgroundColor: '#e3f2fd',
        borderColor: '#2196f3',
        extendedProps: {
          servicio: t.servicio,
          lat: t.lat,
          lng: t.lng
        }
      }));
    setEvents(eventsFromTransportes);
  }, [transportes]);

  // Mantinc la funció d'afegir esdeveniment manual
  const handleAddTask = (e) => {
    e.preventDefault();
    if (
      !taskForm.title.trim() ||
      !taskForm.startDate ||
      !taskForm.endDate ||
      !taskForm.startTime ||
      !taskForm.endTime
    ) return;

    const start = `${taskForm.startDate}T${taskForm.startTime}`;
    const end = `${taskForm.endDate}T${taskForm.endTime}`;
    const user = taskForm.user || 'usuari_exemple';

    setEvents(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        title: taskForm.title,
        start,
        end,
        user,
        backgroundColor: '#e3f2fd',
        borderColor: '#2196f3'
      }
    ]);
    setTaskForm({
      title: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      user: ''
    });
    setShowModalEsdeveniment(false);
  };

  return (
    <div className="calendar-page">
      <div className="calendar-header">
        <h1>📅 Calendari</h1>
        <p>Afegix el teu esdeveniment al calendari</p>
        <div className="calendar-actions">
          <button 
            onClick={() => setShowModalEsdeveniment(true)}
            className="create-reminder-btn"
          >
            ➕ Afegir esdeveniment
          </button>
          <button 
            onClick={() => setShowModalTasca(true)}
            className="create-reminder-btn"
          >
            ➕ Afegir tasca
          </button>
        </div>
        {/* ...modals igual que abans... */}
        {showModalEsdeveniment && (
          <div className="modal-overlay" onClick={() => setShowModalEsdeveniment(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <h3>Afegir esdeveniment</h3>
              <form onSubmit={handleAddTask}>
                {/* ...inputs igual que abans... */}
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
                <div className="form-group">
                  <label>Usuari (simulat):</label>
                  <input
                    type="text"
                    value={taskForm.user}
                    onChange={e => setTaskForm(prev => ({ ...prev, user: e.target.value }))}
                    placeholder="Nom d'usuari o id"
                  />
                </div>
                <div className="modal-actions">
                  <button type="button" onClick={() => setShowModalEsdeveniment(false)} className="cancel-btn">
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
        {showModalTasca && (
          <div className="modal-overlay" onClick={() => setShowModalTasca(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <h3>Llista de tasques</h3>
              <ListaDeTareas />
              <div className="modal-actions">
                <button type="button" onClick={() => setShowModalTasca(false)} className="cancel-btn">
                  Tancar
                </button>
              </div>
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
          eventClick={() => setShowModalTasca(true)}
        />
      </div>
    </div>
  );
};

export default Calendari;