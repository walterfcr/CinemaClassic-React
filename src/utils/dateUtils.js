export const formatLocalDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const isPastTime = (dateStr, timeStr) => {
  if (!dateStr || !timeStr) return false;

  const now = new Date();
  
  // Dividimos el string "2026-05-09" y "15:00"
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hour, minute] = timeStr.split(':').map(Number);

  // Creamos la fecha usando componentes (esto es local y más seguro)
  const selectedDateTime = new Date(year, month - 1, day, hour, minute);
  
  const buffer = 15 * 60 * 1000; 
  // Retorna true solo si ya pasaron más de 15 min del inicio
  return (selectedDateTime.getTime() + buffer) < now.getTime();
};

export const formatTime = (seconds) => {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
};