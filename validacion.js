"use strict";

// Mostrar error
const mostrarError = (id, mensaje) => {
  const campo = document.querySelector(`#${id}`);
  const span = document.querySelector(`#error-${id}`);

  campo.classList.add("invalido");
  campo.classList.remove("valido");

  span.textContent = mensaje;
  span.classList.add("visible");
};

// Limpiar error
const limpiarError = (id) => {
  const campo = document.querySelector(`#${id}`);
  const span = document.querySelector(`#error-${id}`);

  campo.classList.remove("invalido");
  campo.classList.add("valido");

  span.textContent = "";
  span.classList.remove("visible");
};

// VALIDACIONES
const validarNombre = () => {
  const campo = document.querySelector("#nombre");

  if (campo.validity.valueMissing) {
    mostrarError("nombre", "El nombre es obligatorio");
    return false;
  }
  if (campo.validity.tooShort) {
    mostrarError("nombre", "Mínimo 3 caracteres");
    return false;
  }

  limpiarError("nombre");
  return true;
};

const validarEmail = () => {
  const campo = document.querySelector("#email");

  if (campo.validity.valueMissing) {
    mostrarError("email", "Correo obligatorio");
    return false;
  }
  if (campo.validity.typeMismatch) {
    mostrarError("email", "Correo inválido");
    return false;
  }

  limpiarError("email");
  return true;
};

const validarPassword = () => {
  const campo = document.querySelector("#password");

  const regex = /^(?=.*[A-Z])(?=.*\d).+$/;

  if (campo.validity.valueMissing) {
    mostrarError("password", "Contraseña obligatoria");
    return false;
  }
  if (campo.validity.tooShort) {
    mostrarError("password", "Mínimo 8 caracteres");
    return false;
  }
  if (!regex.test(campo.value)) {
    mostrarError("password", "Debe tener mayúscula y número");
    return false;
  }

  limpiarError("password");
  return true;
};

const validarConfirmar = () => {
  const pass = document.querySelector("#password").value;
  const conf = document.querySelector("#confirmar").value;

  if (!conf) {
    mostrarError("confirmar", "Confirma la contraseña");
    return false;
  }
  if (pass !== conf) {
    mostrarError("confirmar", "No coinciden");
    return false;
  }

  limpiarError("confirmar");
  return true;
};

const validarTelefono = () => {
  const campo = document.querySelector("#telefono");

  if (!campo.value.trim()) {
    limpiarError("telefono");
    return true;
  }
  if (campo.validity.patternMismatch) {
    mostrarError("telefono", "Solo números (7-15)");
    return false;
  }

  limpiarError("telefono");
  return true;
};

// EVENTOS BLUR
document.querySelector("#nombre").addEventListener("blur", validarNombre);
document.querySelector("#email").addEventListener("blur", validarEmail);
document.querySelector("#password").addEventListener("blur", validarPassword);
document.querySelector("#confirmar").addEventListener("blur", validarConfirmar);
document.querySelector("#telefono").addEventListener("blur", validarTelefono);

// SUBMIT
const form = document.querySelector("#form-registro");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const valido = [
    validarNombre(),
    validarEmail(),
    validarPassword(),
    validarConfirmar(),
    validarTelefono()
  ].every(v => v);

  if (valido) {
    const msg = document.querySelector("#mensaje-exito");
    msg.classList.add("visible");

    setTimeout(() => {
      form.reset();
      msg.classList.remove("visible");
    }, 2000);
  }
});