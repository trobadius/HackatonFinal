//pg de la que descarregar calendar: https://fullcalendar.io/docs/getting-started 

import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './CalendarPage.css';
import ListaDeTareas from '../tareas/ListaDeTareas';

const Calendari = () => {
  const [events, setEvents] = useState([]);
  const [showModalEsdeveniment, setShowModalEsdeveniment] = useState(false);
  const [showModalTasca, setShowModalTasca] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    user: '' // camp per vincular usuari
  });

  // Sincronitza les tasques de localStorage amb el calendari
  React.useEffect(() => {
    const tareasGuardades = localStorage.getItem('tareas');
    if (tareasGuardades) {
      try {
        const tareasParsed = JSON.parse(tareasGuardades);
        if (Array.isArray(tareasParsed)) {
          // Les tasques es mostren com a events amb només el títol
          // Ubica cada tasca al dia de creació (avui)
          const today = new Date();
          const yyyy = today.getFullYear();
          const mm = String(today.getMonth() + 1).padStart(2, '0');
          const dd = String(today.getDate()).padStart(2, '0');
          const todayStr = `${yyyy}-${mm}-${dd}`;
          const eventsFromTareas = tareasParsed.map(t => ({
            id: t.id,
            title: t.texto,
            start: todayStr, // ubicació al calendari
            backgroundColor: '#ffe0b2',
            borderColor: '#ff9800'
          }));
          setEvents(eventsFromTareas);
        }
      } catch (e) {
        console.log("Error en afegit la tasca")
      }
    }
  }, []);

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
        {/* Modal per afegir esdeveniment */}
        {showModalEsdeveniment && (
          <div className="modal-overlay" onClick={() => setShowModalEsdeveniment(false)}>
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
                {/* Camp per vincular usuari (simulat, vindrà del login) */}
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
        {/* Modal per afegir tasca (amb ListaDeTareas) */}
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

export default Calendari