import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiLock } from 'react-icons/fi';
import './Profile.css'; 

const Profile = () => {
    // 1. Datos simulados del usuario administrador (sacamos el avatarUrl)
    const defaultProfile = {
        firstName: 'Juan Pablo',
        lastName: 'Gómez',
        email: 'juan.gomez@ecommerce.com',
        phone: '+54 2657 889900',
        role: 'Administrador Principal',
        joinedDate: 'Octubre 2025'
    };

    const [profile, setProfile] = useState(defaultProfile);
    const [originalProfile] = useState(defaultProfile);
    const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });
    const [errorMsg, setErrorMsg] = useState('');

    const handleProfileChange = (field, value) => {
        setErrorMsg('');
        setProfile({ ...profile, [field]: value });
    };

    const handlePasswordChange = (field, value) => {
        setErrorMsg('');
        setPasswordData({ ...passwordData, [field]: value });
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        if (!profile.firstName.trim() || !profile.lastName.trim()) {
            setErrorMsg('El nombre y el apellido no pueden quedar vacíos.');
            return;
        }
        alert('¡Cambios de perfil guardados con éxito!');
    };

    // Comparamos si cambió alguna información para activar el botón
    const hasChanges = 
        profile.firstName !== originalProfile.firstName ||
        profile.lastName !== originalProfile.lastName ||
        profile.phone !== originalProfile.phone;

    return (
        <div className="product-view-container">
            
            {/* --- CABECERA DEL PERFIL --- */}
            <div className="product-summary">
    
                <div className="avatar-wrapper">
                    <div className="profile-icon-placeholder">
                        <FiUser className="placeholder-icon" />
                    </div>
                </div>
                
                <div className="summary-details">
                    <h3 className="summary-title">{`${profile.firstName} ${profile.lastName}`}</h3>
                    
                    <div className="summary-stats">
                        <span className="stat-item">
                            <strong className="stat-number" style={{ color: '#EC1C24', fontSize: '0.9rem' }}>
                                {profile.role.toUpperCase()}
                            </strong>
                            <span className="stat-label">ROL DE CUENTA</span>
                        </span>
                        
                        <span className="stat-item">
                            <strong className="stat-number" style={{ fontSize: '1rem', color: '#E0E3E6' }}>
                                {profile.joinedDate}
                            </strong>
                            <span className="stat-label">MIEMBRO DESDE</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* --- FORMULARIO DE INFORMACIÓN PERSONAL --- */}
            <form onSubmit={handleSaveProfile} className="form-section">
                <h4 className="section-title">Información Personal</h4>

                {errorMsg && <div style={{ color: '#EC1C24', marginBottom: '15px', fontWeight: '500', fontSize: '0.95rem' }}>⚠️ {errorMsg}</div>}

                <div className="profile-grid-inputs">
                    <div className="input-group">
                        <label><FiUser className="input-icon-inline" /> Nombre</label>
                        <input 
                            type="text" 
                            value={profile.firstName} 
                            onChange={(e) => handleProfileChange('firstName', e.target.value)} 
                        />
                    </div>

                    <div className="input-group">
                        <label>Apellido</label>
                        <input 
                            type="text" 
                            value={profile.lastName} 
                            onChange={(e) => handleProfileChange('lastName', e.target.value)} 
                        />
                    </div>
                </div>

                <div className="input-group">
                    <label><FiMail className="input-icon-inline" /> Correo Electrónico</label>
                    <input 
                        type="email" 
                        value={profile.email} 
                        disabled 
                        style={{ cursor: 'not-allowed', backgroundColor: '#1A1D21', color: '#8E9197' }}
                    />
                    <small style={{ color: '#8E9197', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                        El correo electrónico está vinculado a la cuenta global y no se puede modificar.
                    </small>
                </div>

                <div className="input-group">
                    <label><FiPhone className="input-icon-inline" /> Teléfono de Contacto</label>
                    <input 
                        type="text" 
                        value={profile.phone} 
                        onChange={(e) => handleProfileChange('phone', e.target.value)} 
                    />
                </div>

                {/* --- BOTÓN GUARDAR INFORMACIÓN --- */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                    <button 
                        type="submit"
                        disabled={!hasChanges}
                        style={{ 
                            padding: '12px 32px', 
                            backgroundColor: hasChanges ? '#EC1C24' : '#2C3036', 
                            color: hasChanges ? '#FFF' : '#8E9197', 
                            border: 'none', 
                            borderRadius: '50px', 
                            cursor: hasChanges ? 'pointer' : 'not-allowed', 
                            fontWeight: 'bold',
                            fontSize: '0.95rem',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Guardar Cambios
                    </button>
                </div>
            </form>

            {/* --- SECCIÓN DE SEGURIDAD --- */}
            <section className="form-section">
                <h4 className="section-title">Seguridad de la Cuenta</h4>

                <div className="input-group">
                    <label><FiLock className="input-icon-inline" /> Contraseña Actual</label>
                    <input 
                        type="password" 
                        placeholder="••••••••"
                        value={passwordData.current}
                        onChange={(e) => handlePasswordChange('current', e.target.value)}
                    />
                </div>

                <div className="profile-grid-inputs">
                    <div className="input-group">
                        <label>Nueva Contraseña</label>
                        <input 
                            type="password" 
                            placeholder="Mínimo 8 caracteres"
                            value={passwordData.new}
                            onChange={(e) => handlePasswordChange('new', e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label>Confirmar Nueva Contraseña</label>
                        <input 
                            type="password" 
                            placeholder="Repetí la nueva contraseña"
                            value={passwordData.confirm}
                            onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                    <button 
                        type="button"
                        disabled={!passwordData.current || !passwordData.new || !passwordData.confirm}
                        style={{ 
                            padding: '12px 24px', 
                            backgroundColor: (passwordData.current && passwordData.new && passwordData.confirm) ? '#383d44' : '#2C3036', 
                            color: (passwordData.current && passwordData.new && passwordData.confirm) ? '#E0E3E6' : '#8E9197', 
                            border: 'none', 
                            borderRadius: '50px', 
                            cursor: (passwordData.current && passwordData.new && passwordData.confirm) ? 'pointer' : 'not-allowed', 
                            fontWeight: 'bold',
                            fontSize: '0.95rem'
                        }}
                    >
                        Actualizar Contraseña
                    </button>
                </div>
            </section>

        </div>
    );
};

export default Profile;