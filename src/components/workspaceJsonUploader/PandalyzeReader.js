const PDLZ_MIME = 'application/x.pdlz';

// TODO: firmar los archivos con un método desde el backend para verificar 100%
// que no se modificaron, aunque quizá es demasiada seguridad.

export const savePdlzFile = (data) => {
  const payload = {
    _signature: `PDLZ_v1::${Date.now()}`, // cambiable a futuro si se decide agregar una firma
    data,
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: PDLZ_MIME,
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'archivo.pdlz';
  link.click();
  URL.revokeObjectURL(url);
};

export const isValidPdlzFile = (file) => {
    // TODO: ver cómo poder usar file.type para comparar bien. como no es un 
    // mime tipo registrado los .pdlz tienen string vacío en el type
    return file && file.name.endsWith('.pdlz') && file.type === '';
};

export const readPdlzFile = async (file) => {
  // Ver si el archivo es un .pdlz
  if (!isValidPdlzFile(file)) {
    return 'El archivo no tiene un formato soportado. Se requiere un archivo .pdlz';
  }

  const text = await file.text(); // TODO: ver si puede fallar sin permisos de lectura
  try {
    const parsed = JSON.parse(text);

    // Ver si el contenido del archivo quedó respetado.
    // Cambiable a futuro si se decide agregar una firma.
    const claves = ['variables', 'csvsData', 'blocks'];
    if (!parsed._signature || !claves.every(clave => clave in parsed.data)) {
        return 'El archivo no tiene un formato soportado.';
    }

    // No falló nada.
    return parsed.data;
  } catch(e) {
    // Falló la 
    return 'El archivo no tiene un formato soportado.'
  };
};