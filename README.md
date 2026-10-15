# Dashboard de Gestión con Estado Complejo

## Diagrama de Flujo de Estado
┌─────────────────────────────────────────────────────┐
│ App.jsx │
│ ┌───────────────────────────────────────────────┐ │
│ │ ThemeProvider (Context) │ │
│ │ ┌─────────────────────────────────────────┐ │ │
│ │ │ Dashboard │ │ │
│ │ │ ┌──────────────────────────────────┐ │ │ │
│ │ │ │ useReducer (tasksReducer) │ │ │ │
│ │ │ │ state: {items, filter, sort} │ │ │ │
│ │ │ └──────────────────────────────────┘ │ │ │
│ │ │ │ │ │ │
│ │ │ ├──> TaskForm (useRef) │ │ │
│ │ │ ├──> Controls │ │ │
│ │ │ └──> TaskList (useMemo, │ │ │
│ │ │ useCallback) │ │ │
│ │ └─────────────────────────────────────────┘ │ │
│ └───────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘

## Justificación Técnica de Hooks

| Hook | ¿Por qué NO useState simple? |
|------|------------------------------|
| `useReducer` | Estado con múltiples sub-valores y lógica dependiente del estado anterior |
| `useContext` | Evita prop drilling del tema en múltiples niveles |
| `useEffect` | Necesario para efectos secundarios (localStorage, DOM, cleanup) |
| `useMemo` | Evita recalcular filtrado/ordenamiento costoso en cada render |
| `useCallback` | Estabiliza referencias de funciones pasadas a hijos |
| `useRef` | Acceso al DOM sin provocar re-render |
| `useLocalStorage` | Reutilizable, encapsula lógica de persistencia |

## Validaciones Realizadas
- ✅ Cero warnings de `react-hooks/exhaustive-deps`
- ✅ Profiler muestra reducción de commits con useMemo/useCallback
- ✅ Cleanup de useEffect verificado con console.log