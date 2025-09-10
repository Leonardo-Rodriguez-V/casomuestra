/* // Configuración inicial al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarPerfilUsuario();
    inicializarValidaciones();
    configurarEnvioFormularios();
});

// Cargar datos del usuario
function cargarPerfilUsuario() {
    const perfil = JSON.parse(localStorage.getItem('userProfile')) || {};
    const preferencias = JSON.parse(localStorage.getItem('userPreferences')) || {};

    // Datos personales
    document.getElementById('perfilNombre').value = perfil.nombre || '';
    document.getElementById('perfilTelefono').value = perfil.telefono || '';
    document.getElementById('perfilCorreo').value = perfil.correo || 'usuario@ejemplo.com';
    document.getElementById('perfilFechaNacimiento').value = perfil.fechaNacimiento || '';
    document.getElementById('perfilPais').value = perfil.pais || 'CL';

    // Preferencias de compra
    document.getElementById('metodoPago').value = preferencias.metodoPago || 'credito';
    document.getElementById('newsletter').checked = preferencias.newsletter || false;
    document.getElementById('notificaciones').checked = preferencias.notificaciones || false;

    // Categorías favoritas
    const categorias = preferencias.categorias || [];
    categorias.forEach(categoria => {
        document.getElementById(`categoria${categoria}`).checked = true;
    });
}

// Validaciones y configuraciones
function inicializarValidaciones() {
    // Validación de teléfono
    document.getElementById('perfilTelefono').addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9]/g, '').slice(0, 9);
    });

    // Fecha máxima de nacimiento (18+ años)
    const fechaMaxima = new Date();
    fechaMaxima.setFullYear(fechaMaxima.getFullYear() - 18);
    document.getElementById('perfilFechaNacimiento').max = fechaMaxima.toISOString().split('T')[0];
}

// Manejo de formularios
function configurarEnvioFormularios() {
    // Formulario de datos personales
    document.getElementById('perfilForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const userData = {
            nombre: this.perfilNombre.value.trim(),
            telefono: this.perfilTelefono.value,
            correo: this.perfilCorreo.value,
            fechaNacimiento: this.perfilFechaNacimiento.value,
            pais: this.perfilPais.value
        };

        // Validación simple
        if (!userData.nombre || !userData.telefono) {
            mostrarNotificacion('Por favor completa todos los campos obligatorios.', 'error');
            return;
        }

        localStorage.setItem('userProfile', JSON.stringify(userData));
        mostrarNotificacion('Perfil actualizado correctamente', 'success');
    });

    // Formulario de preferencias
    document.getElementById('preferenciasForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const preferencias = {
            metodoPago: this.metodoPago.value,
            newsletter: this.newsletter.checked,
            notificaciones: this.notificaciones.checked,
            categorias: Array.from(document.querySelectorAll('input[type="checkbox"][id^="categoria"]:checked'))
                             .map(checkbox => checkbox.id.replace('categoria', ''))
        };

        localStorage.setItem('userPreferences', JSON.stringify(preferencias));
        mostrarNotificacion('Preferencias guardadas', 'info');
    });
}

// Sistema de notificaciones
function mostrarNotificacion(mensaje, tipo) {
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-bg-${tipo} border-0`;
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${mensaje}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    document.getElementById('toastContainer').appendChild(toast);
    new bootstrap.Toast(toast).show();
    
    setTimeout(() => toast.remove(), 3000);
}
*/


// JS PERFIL - Gestión de perfil y preferencias

document.addEventListener('DOMContentLoaded', () => {
    cargarPerfilUsuario();
    inicializarValidaciones();
    configurarEnvioFormularios();
});

function cargarPerfilUsuario() {
    const perfil = JSON.parse(localStorage.getItem('userProfile')) || {};
    const preferencias = JSON.parse(localStorage.getItem('userPreferences')) || {};

    // Datos personales
    if (document.getElementById('perfilNombre')) document.getElementById('perfilNombre').value = perfil.nombre || '';
    if (document.getElementById('perfilTelefono')) document.getElementById('perfilTelefono').value = perfil.telefono || '';
    if (document.getElementById('perfilCorreo')) document.getElementById('perfilCorreo').value = perfil.correo || 'usuario@ejemplo.com';
    if (document.getElementById('perfilFechaNacimiento')) document.getElementById('perfilFechaNacimiento').value = perfil.fechaNacimiento || '';
    if (document.getElementById('perfilPais')) document.getElementById('perfilPais').value = perfil.pais || 'CL';

    // Preferencias de compra
    if (document.getElementById('metodoPago')) document.getElementById('metodoPago').value = preferencias.metodoPago || 'credito';
    if (document.getElementById('newsletter')) document.getElementById('newsletter').checked = preferencias.newsletter || false;
    if (document.getElementById('notificaciones')) document.getElementById('notificaciones').checked = preferencias.notificaciones || false;

    // Categorías favoritas
    const categorias = preferencias.categorias || [];
    categorias.forEach(categoria => {
        const catInput = document.getElementById(`categoria${categoria}`);
        if (catInput) catInput.checked = true;
    });
}

function inicializarValidaciones() {
    // Validación de teléfono
    if (document.getElementById('perfilTelefono')) {
        document.getElementById('perfilTelefono').addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9]/g, '').slice(0, 9);
        });
    }

    // Fecha máxima de nacimiento (18+ años)
    const fechaMaxima = new Date();
    fechaMaxima.setFullYear(fechaMaxima.getFullYear() - 18);
    if (document.getElementById('perfilFechaNacimiento')) {
        document.getElementById('perfilFechaNacimiento').max = fechaMaxima.toISOString().split('T')[0];
    }
}

function configurarEnvioFormularios() {
    // Formulario de datos personales
    if (document.getElementById('perfilForm')) {
        document.getElementById('perfilForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const userData = {
                nombre: this.perfilNombre.value.trim(),
                telefono: this.perfilTelefono.value,
                correo: this.perfilCorreo.value,
                fechaNacimiento: this.perfilFechaNacimiento.value,
                pais: this.perfilPais.value
            };
            if (!userData.nombre || !userData.telefono) {
                mostrarNotificacion('Por favor completa todos los campos obligatorios.', 'danger');
                return;
            }
            localStorage.setItem('userProfile', JSON.stringify(userData));
            mostrarNotificacion('Perfil actualizado correctamente', 'success');
        });
    }

    // Formulario de preferencias
    if (document.getElementById('preferenciasForm')) {
        document.getElementById('preferenciasForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const preferencias = {
                metodoPago: this.metodoPago.value,
                newsletter: this.newsletter?.checked || false,
                notificaciones: this.notificaciones?.checked || false,
                categorias: Array.from(document.querySelectorAll('input[type="checkbox"][id^="categoria"]:checked'))
                                 .map(checkbox => checkbox.id.replace('categoria', ''))
            };
            localStorage.setItem('userPreferences', JSON.stringify(preferencias));
            mostrarNotificacion('Preferencias guardadas', 'info');
        });
    }
}

// Notificación bootstrap toast
function mostrarNotificacion(mensaje, tipo = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-bg-${tipo} border-0 mb-2`;
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">${mensaje}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    toastContainer.appendChild(toast);
    new bootstrap.Toast(toast).show();
    setTimeout(() => toast.remove(), 3500);
}