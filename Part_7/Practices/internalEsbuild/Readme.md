# Práctica de esbuild manual (Parte 7)

## Notas sobre el entorno de desarrollo (WSL)

En este proyecto se modificaron los comandos originales proporcionados por el curso por razones de estabilidad del sistema operativo:

1. **Servidor seguro (`npm run serve`):** Se reemplazó `npx serve` por `python3 -m http.server`. La herramienta nativa de Node.js genera conflictos con el redireccionamiento de puertos en WSL, provocando un consumo del 100% de CPU y congelamiento del sistema ante errores de ruta (ej. con `favicon.ico`).

2. **Optimización en desarrollo (`npm run dev`):** Se agregó el flag `--minify` al script de desarrollo para forzar a `esbuild` a generar un bundle ligero (~189 KB) en lugar de un archivo plano de 1.1 MB, reduciendo la carga en la memoria RAM durante el refrescado en caliente.