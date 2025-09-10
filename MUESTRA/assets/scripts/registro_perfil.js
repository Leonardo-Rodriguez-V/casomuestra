// REGISTRO Y PERFIL MEJORADO

document.addEventListener('DOMContentLoaded', () => {
    mostrarUsuarioNavbar();
    configurarRegistro();
    configurarPerfil();
    configurarCerrarSesion();
});

// Mostrar usuario activo en navbar y botones
function mostrarUsuarioNavbar() {
    const usuario = JSON.parse(localStorage.getItem('usuarioActivo'));
    const infoEl = document.getElementById('usuarioActivoInfo');
    const btnRegistro = document.getElementById('btnRegistro');
    const btnPerfil = document.getElementById('btnPerfil');
    const btnCerrarSesion = document.getElementById('btnCerrarSesion');
    if (usuario && usuario.email) {
        infoEl.textContent = usuario.nombre ? `${usuario.nombre} (${usuario.email})` : usuario.email;
        infoEl.style.display = '';
        if (btnRegistro) btnRegistro.style.display = 'none';
        if (btnPerfil) btnPerfil.style.display = '';
        if (btnCerrarSesion) btnCerrarSesion.style.display = '';
    } else {
        infoEl.style.display = 'none';
        if (btnRegistro) btnRegistro.style.display = '';
        if (btnPerfil) btnPerfil.style.display = 'none';
        if (btnCerrarSesion) btnCerrarSesion.style.display = 'none';
    }
}

// Cerrar sesión
function configurarCerrarSesion() {
    const btnCerrarSesion = document.getElementById('btnCerrarSesion');
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener('click', () => {
            localStorage.removeItem('usuarioActivo');
            mostrarUsuarioNavbar();
            Swal.fire('Sesión cerrada', 'Has cerrado sesión.', 'info');
        });
    }
}

// Registro con validación visual y feedback
function configurarRegistro() {
    const form = document.getElementById('registroForm');
    if (!form) return;

    // Validación visual en tiempo real
    form.emailRegistro.addEventListener('input', () => validarCampo(form.emailRegistro));
    form.fechaNacimiento.addEventListener('input', () => validarCampo(form.fechaNacimiento));
    form.password.addEventListener('input', () => validarCampo(form.password));
    form.confirmPassword.addEventListener('input', () => validarCampo(form.confirmPassword));

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let valido = true;
        
        // Validaciones
        if (!esMayorDeEdad(form.fechaNacimiento.value)) {
            mostrarErrorCampo(form.fechaNacimiento, 'Debes ser mayor de 18 años.');
            valido = false;
        }
        if (form.password.value.length < 8) {
            mostrarErrorCampo(form.password, 'La contraseña debe tener al menos 8 caracteres.');
            valido = false;
        }
        if (form.password.value !== form.confirmPassword.value) {
            mostrarErrorCampo(form.confirmPassword, 'Las contraseñas no coinciden.');
            valido = false;
        }
        if (!valido) return;

        // Registro simulado
        if (registrarUsuario(form.emailRegistro.value, form.fechaNacimiento.value, form.password.value)) {
            // Guardar usuario activo con nombre vacío (se puede editar en perfil)
            localStorage.setItem('usuarioActivo', JSON.stringify({ email: form.emailRegistro.value, nombre: '' }));
            mostrarUsuarioNavbar();
            Swal.fire('¡Registro exitoso!', esCorreoDuoc(form.emailRegistro.value) ?
                '¡Eres usuario Duoc! Obtienes 20% de descuento en todas tus compras.' :
                'Revisa tu correo para tu contraseña temporal.', 'success');
            bootstrap.Modal.getInstance(document.getElementById('registroModal')).hide();
            form.reset();
            limpiarErroresForm(form);
        }
    });
}

// Validación visual para campos
function validarCampo(input) {
    input.classList.remove('is-invalid');
    input.classList.remove('is-valid');
    let ok = true;
    if (input.id === 'fechaNacimiento' && !esMayorDeEdad(input.value)) {
        mostrarErrorCampo(input, 'Debes ser mayor de 18 años.');
        ok = false;
    }
    if (input.id === 'password' && input.value.length < 8) {
        mostrarErrorCampo(input, 'La contraseña debe tener al menos 8 caracteres.');
        ok = false;
    }
    if (input.id === 'confirmPassword') {
        const password = document.getElementById('password');
        if (input.value !== password.value) {
            mostrarErrorCampo(input, 'Las contraseñas no coinciden.');
            ok = false;
        }
    }
    if (ok) input.classList.add('is-valid');
    return ok;
}

function mostrarErrorCampo(input, mensaje) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('invalid-feedback')) {
        const feedback = document.createElement('div');
        feedback.className = 'invalid-feedback';
        input.parentNode.appendChild(feedback);
    }
    input.nextElementSibling.textContent = mensaje;
}

function limpiarErroresForm(form) {
    Array.from(form.elements).forEach(el => {
        el.classList.remove('is-invalid', 'is-valid');
        if (el.nextElementSibling && el.nextElementSibling.classList.contains('invalid-feedback')) {
            el.nextElementSibling.textContent = '';
        }
    });
}

// Validar edad mínima
function esMayorDeEdad(fechaNacimiento) {
    if (!fechaNacimiento) return false;
    const fecha = new Date(fechaNacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fecha.getFullYear();
    const m = hoy.getMonth() - fecha.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < fecha.getDate())) {
        edad--;
    }
    return edad >= 18;
}

// Validar correo institucional
function esCorreoDuoc(email) {
    return email && email.toLowerCase().endsWith("@duoc.cl");
}

// Registro de usuario simulado (localStorage)
function registrarUsuario(email, fechaNacimiento, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.email === email)) {
        Swal.fire('Error', 'El correo ya está registrado', 'error');
        return false;
    }
    users.push({ email, fechaNacimiento, password, carrito: [], registro: new Date().toISOString() });
    localStorage.setItem('users', JSON.stringify(users));
    return true;
}

// PERFIL: cargar y editar datos
function configurarPerfil() {
    const perfilForm = document.getElementById('perfilForm');
    if (!perfilForm) return;

    // Al abrir modal, carga datos del usuario activo
    document.getElementById('perfilModal').addEventListener('show.bs.modal', () => cargarPerfilUsuario());

    perfilForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Validar campos obligatorios
        let nombre = this.perfilNombre.value.trim();
        let telefono = this.perfilTelefono.value.trim();
        if (!nombre) {
            mostrarErrorCampo(this.perfilNombre, 'El nombre es obligatorio.');
            return;
        }
        if (!telefono.match(/^[0-9]{9}$/)) {
            mostrarErrorCampo(this.perfilTelefono, 'Debe tener 9 dígitos.');
            return;
        }
        // Guardar perfil
        const usuario = JSON.parse(localStorage.getItem('usuarioActivo')) || {};
        usuario.nombre = nombre;
        usuario.telefono = telefono;
        usuario.correo = this.perfilCorreo.value;
        usuario.fechaNacimiento = this.perfilFechaNacimiento.value;
        usuario.pais = this.perfilPais.value;
        localStorage.setItem('usuarioActivo', JSON.stringify(usuario));
        mostrarUsuarioNavbar();
        Swal.fire('Perfil actualizado', 'Tus datos han sido guardados.', 'success');
        bootstrap.Modal.getInstance(document.getElementById('perfilModal')).hide();
    });
}

function cargarPerfilUsuario() {
    const usuario = JSON.parse(localStorage.getItem('usuarioActivo')) || {};
    document.getElementById('perfilNombre').value = usuario.nombre || '';
    document.getElementById('perfilTelefono').value = usuario.telefono || '';
    document.getElementById('perfilCorreo').value = usuario.email || '';
    document.getElementById('perfilFechaNacimiento').value = usuario.fechaNacimiento || '';
    document.getElementById('perfilPais').value = usuario.pais || 'CL';
}