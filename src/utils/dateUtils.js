export const formatLocalDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const isPastTime = (date, time) => {
  if (!date || !time) return false;

  const now = new Date();
  const selectedDateTime = new Date(`${date}T${time}:00`);
  
  // Restamos 15 minutos al tiempo actual para permitir compras de último minuto
  const marginTime = new Date(now.getTime() - 15 * 60000); 

  return selectedDateTime <= marginTime;
};

export const formatTime = (seconds) => {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
};