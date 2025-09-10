

// JS VALIDACIONES - Registro y utilidades

// Función para validar correo Duoc
function esCorreoDuoc(email) {
    return email && email.toLowerCase().endsWith("@duoc.cl");
}
// VALIDACIÓN DE EDAD - MÓDULO PRINCIPAL
const AgeValidator = (() => {
    const MAX_DATE = '2007-09-10'; // 18 años desde 2025-09-10
    
    const calculateAge = (birthDate) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    };

    const validateAgeRealTime = (input) => {
        const age = calculateAge(input.value);
        const isValid = age >= 18;
        
        input.classList.toggle('is-invalid', !isValid);
        input.setCustomValidity(isValid ? '' : 'Debes ser mayor de 18 años');
        return isValid;
    };

    return {
        init: () => {
            // Registro
            document.getElementById('fechaNacimiento')?.setAttribute('max', MAX_DATE);
            document.getElementById('fechaNacimiento')?.addEventListener('input', function() {
                validateAgeRealTime(this);
            });

            // Perfil
            document.getElementById('perfilFechaNacimiento')?.setAttribute('max', MAX_DATE);
            document.getElementById('perfilFechaNacimiento')?.addEventListener('input', function() {
                validateAgeRealTime(this);
            });
        },
        
        validate: (birthDate) => calculateAge(birthDate) >= 18,
        
        showAgeError: (birthDate) => {
            Swal.fire({
                icon: 'error',
                title: 'Validación de Edad Fallida',
                html: `Fecha ingresada: ${new Date(birthDate).toLocaleDateString('es-CL')}<br>
                       Edad calculada: ${calculateAge(birthDate)} años`,
                footer: '<a href="#politica-edad" class="text-danger">Ver política de edad</a>'
            });
        }
    };
})();

// INTEGRACIÓN CON FORMULARIOS
document.addEventListener('DOMContentLoaded', () => {
    AgeValidator.init();

    // Validación Registro
    document.getElementById('registroForm')?.addEventListener('submit', function(e) {
        const birthDate = document.getElementById('fechaNacimiento').value;
        
        if (!AgeValidator.validate(birthDate)) {
            e.preventDefault();
            AgeValidator.showAgeError(birthDate);
            localStorage.setItem('intentosRegistro', parseInt(localStorage.getItem('intentosRegistro') || 0) + 1);
        }
    });

    // Validación Perfil
    document.getElementById('perfilForm')?.addEventListener('submit', function(e) {
        const newBirthDate = document.getElementById('perfilFechaNacimiento').value;
        
        if (!AgeValidator.validate(newBirthDate)) {
            e.preventDefault();
            AgeValidator.showAgeError(newBirthDate);
            Swal.fire('Error', 'No puedes actualizar a una edad menor de 18 años', 'error');
        }
    });
});

// ACTUALIZACIÓN DE USUARIO
function actualizarPerfilUsuario(nuevosDatos) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
    
    const userIndex = users.findIndex(u => u.email === usuarioActivo.email);
    if (userIndex === -1) return false;

    users[userIndex] = { ...users[userIndex], ...nuevosDatos };
    localStorage.setItem('users', JSON.stringify(users));
    return true;
}
/* Edad mínima 18 años
function esMayorDeEdad(fechaNacimiento) {
    if (!fechaNacimiento) return false;
    const fecha = new Date(fechaNacimiento);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fecha.getFullYear();
    const m = hoy.getMonth() - fecha.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < fecha.getDate())) {
        return edad - 1;
    }
    return edad >= 18;
}
    */

// Registro de usuario simulado
function registrarUsuario(email, fechaNacimiento, password) {
    if (!esMayorDeEdad(fechaNacimiento)) {
        Swal.fire('Error', 'Debes ser mayor de 18 años para registrarte.', 'error');
        return false;
    }
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.email === email)) {
        Swal.fire('Error', 'El correo ya está registrado', 'error');
        return false;
    }
    users.push({ email, fechaNacimiento, password, carrito: [], registro: new Date().toISOString() });
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('usuarioActivo', JSON.stringify({ email, fechaNacimiento }));
    return true;
}

// Registro: manejo de formulario
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registroForm');
    if (!form) return;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('emailRegistro').value;
        const fechaNacimiento = document.getElementById('fechaNacimiento').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            Swal.fire('Error', 'Las contraseñas no coinciden. Por favor, inténtalo de nuevo.', 'error');
            return;
        }

        if (registrarUsuario(email, fechaNacimiento, password)) {
            Swal.fire('¡Registro exitoso!', esCorreoDuoc(email) ?
                '¡Eres usuario Duoc! Obtienes 20% de descuento en todas tus compras.' :
                'Revisa tu correo para tu contraseña temporal.', 'success');
            if (document.getElementById('btnRegistro')) document.getElementById('btnRegistro').style.display = 'none';
            if (document.getElementById('btnPerfil')) document.getElementById('btnPerfil').style.display = '';
            bootstrap.Modal.getInstance(document.getElementById('registroModal')).hide();
        }
    });
});
