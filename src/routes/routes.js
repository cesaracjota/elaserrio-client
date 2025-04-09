export const generateRoute = (sedeSlug, path) => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `/${sedeSlug}/${cleanPath}`;
};

export const routes = {
  home: sedeSlug => generateRoute(sedeSlug, '/'),
  estudiantes: sedeSlug => generateRoute(sedeSlug, '/estudiantes'),
  docentes: sedeSlug => generateRoute(sedeSlug, '/docentes'),
  grados: sedeSlug => generateRoute(sedeSlug, '/grados'),
  roles: sedeSlug => generateRoute(sedeSlug, '/roles'),
  modulos: sedeSlug => generateRoute(sedeSlug, '/modulos'),
  // Agrega más rutas según los módulos
};
