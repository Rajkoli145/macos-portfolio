import Desktop from "./components/Desktop/Desktop";
import { SettingsProvider } from "./context/SettingsContext";

function App() {
  return (
    <SettingsProvider>
      <Desktop />
    </SettingsProvider>
  );
}

export default App;
