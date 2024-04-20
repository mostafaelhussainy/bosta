import styles from "./navbar.module.scss";
import { useTranslation } from "react-i18next";
import "localization/i18n";
import ENLogo from "assets/english-logo.svg";
import ARLogo from "assets/arabic-logo.svg";

const NavBar = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <header
      className={styles.header}
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <figure className={styles.logo}>
        <img src={i18n.language === "en" ? ENLogo : ARLogo} alt="Logo" />
      </figure>
      <div className={styles.linksWrapper}>
        <a href="/">{t("main")}</a>
        <a href="/">{t("prices")}</a>
        <a href="/">{t("contactSales")}</a>
      </div>
      <div className={styles.linksWrapper}>
        <a href="/">{t("trackYourShipment")}</a>
        <a href="/">{t("signIn")}</a>
        <button
          className={styles.langSwitchButton}
          onClick={() => changeLanguage(i18n.language === "en" ? "ar" : "en")}
        >
          {t("switchLanguage")}
        </button>
      </div>
    </header>
  );
};

export default NavBar;
