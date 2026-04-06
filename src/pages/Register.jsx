import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from || '/';

  const getPasswordStrength = (pass) => {
    if (!pass) return 0;
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.length >= 8) strength++;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;
    return Math.min(strength, 4);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }
    
    if (!email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      await signup(email, password, name.trim());
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Signup error:', err);
      if (err.code === 'auth/email-already-in-use') {
        setGeneralError('Este email ya está registrado');
      } else if (err.code === 'auth/invalid-email') {
        setGeneralError('Email inválido');
      } else if (err.code === 'auth/weak-password') {
        setGeneralError('La contraseña es muy débil');
      } else {
        setGeneralError('Error al crear la cuenta. Intenta de nuevo');
      }
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">

          <h1>Crear Cuenta</h1>
          <p>Únete a la experiencia Cine Classic</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {generalError && <div className="auth-error">{generalError}</div>}
          
          <div className="form-group">
            <label htmlFor="name">Nombre Completo</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              className={errors.name ? 'error' : ''}
              autoComplete="name"
              disabled={loading}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className={errors.email ? 'error' : ''}
              autoComplete="email"
              disabled={loading}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              className={errors.password ? 'error' : ''}
              autoComplete="new-password"
              disabled={loading}
            />
            {password && (
              <div className="password-strength">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`strength-bar ${
                      passwordStrength >= level
                        ? passwordStrength <= 1
                          ? 'weak'
                          : passwordStrength <= 2
                          ? 'medium'
                          : 'strong'
                        : ''
                    }`}
                  />
                ))}
              </div>
            )}
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repite tu contraseña"
              className={errors.confirmPassword ? 'error' : ''}
              autoComplete="new-password"
              disabled={loading}
            />
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>

          <button type="submit" className="auth-btn btnWarning" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span>
                Creando cuenta...
              </>
            ) : (
              'Crear Cuenta'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" state={{ from }}>
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
