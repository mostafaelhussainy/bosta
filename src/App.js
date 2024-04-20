import "./App.scss";
import { useTranslation } from "react-i18next";
import "./localization/i18n";
import NavBar from "./components/shared/NavBar";
import Tracking from "pages/Tracking";

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <>
      <NavBar />
      <Tracking />
    </>
  );
}

export default App;
