# Matrix Table — Frontend React Test Task

Тестове завдання: інтерактивна матриця M×N з підсумками по рядках, 60-м перцентилем по стовпцях, підсвіткою найближчих за значенням комірок та heatmap при наведенні на суму рядка.

## Стек

- **TypeScript** + **React 19**
- **Vite** — збірка та dev-сервер
- **React Context** + **useReducer** — стан (без Redux)
- **CSS Modules** — стилізація (без styled-components та UI-бібліотек)
- Мемоізація: **useMemo**, **useCallback** (похідні дані не зберігаються в state)

## Структура проєкту

```
src/
├── app/
│   └── MatrixProvider.tsx    # Context + useReducer, hover state
├── components/
│   ├── MatrixTable/
│   │   ├── MatrixTable.tsx
│   │   ├── MatrixRow.tsx
│   │   ├── MatrixCell.tsx
│   │   └── PercentileRow.tsx
│   └── Controls/
│        └── Controls.tsx
├── hooks/
│   └── useMatrix.ts          # доступ до контексту + похідні (sums, percentile, closestIds)
├── utils/
│   ├── generateMatrix.ts     # генерація M×N з унікальними id та випадковими amount
│   ├── calculations.ts      # rowSum, rowSums, percentOfTotal, ratioToMax
│   ├── findClosest.ts        # X найближчих за amount комірок
│   └── percentile.ts         # 60-й перцентиль по стовпцях
├── types.ts
└── App.tsx
```

## Параметри

- **M** — кількість рядків (0–100)
- **N** — кількість стовпців (0–100)
- **X** — скільки комірок підсвічувати як «найближчі за значенням» (1…M×N)

У кожній комірці зберігається об’єкт `{ id, amount }`, де `amount` — тризначне випадкове число (100–999).

## Функціонал

1. **Таблиця** — відображення всіх комірок, додатковий стовпець із сумою по рядку, додатковий рядок з 60-м перцентилем по кожному стовпцю.
2. **Клік по комірці** — збільшення `amount` на 1 з перерахунком сум та перцентилів.
3. **Hover по комірці** — підсвітка X комірок із найближчим за значенням `amount` (включно з самою коміркою візуально виділеною).
4. **Hover по комірці суми рядка** — у комірках рядка показується відсоток від суми рядка; heatmap (фон) — відношення значення комірки до максимуму в рядку.
5. **Видалення рядка** — кнопка в рядку; суми та перцентилі перераховуються.
6. **Додати рядок** — нова рядок в кінці таблиці з перерахунком.

Похідні дані (суми, перцентилі, heatmap, найближчі id) не зберігаються в state — обчислюються через `useMemo` / використання утиліт у хуку `useMatrix`.

## Запуск

```bash
npm install
npm run dev
```

Відкрити [http://localhost:5173](http://localhost:5173).

## Production build та деплой

```bash
npm run build
npm run preview   # перевірка збірки локально
```

## Обмеження

- Не використовуються: Redux, Redux Toolkit, styled-components, UI-бібліотеки, css-in-js.
- Стилі — лише CSS Modules та глобальний `index.css`.
