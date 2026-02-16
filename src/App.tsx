import { useEffect, useState } from "react";
import { MatrixProvider } from "./app/MatrixProvider.js";
import { Controls } from "./components/Controls/Controls.js";
import { MatrixTable } from "./components/MatrixTable/MatrixTable.js";
import styles from "./App.module.css";

const THEME_KEY = "matrix-theme";
type Theme = "light" | "dark";

function App() {
	const [theme, setTheme] = useState<Theme>(() => {
		const stored = localStorage.getItem(THEME_KEY);
		if (stored === "light" || stored === "dark") return stored;
		return "dark";
	});

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
		localStorage.setItem(THEME_KEY, theme);
	}, [theme]);

	const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

	return (
		<MatrixProvider>
			<div className={styles.app}>
				<header className={styles.header}>
					<h1>Matrix Table</h1>
					<button
						type="button"
						className={styles.themeToggle}
						onClick={toggleTheme}
						title={
							theme === "dark"
								? "Увімкнути світлу тему"
								: "Увімкнути темну тему"
						}
						aria-label={
							theme === "dark"
								? "Switch to light theme"
								: "Switch to dark theme"
						}
					>
						{theme === "dark" ? "☀️" : "🌙"}
					</button>
				</header>
				<main className={styles.main}>
					<Controls />
					<MatrixTable />
				</main>
			</div>
		</MatrixProvider>
	);
}

export default App;
