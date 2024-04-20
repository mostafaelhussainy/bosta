import "./shipment-address.scss";
import QuestionImg from "assets/people-question.png";
import { useTranslation } from "react-i18next";
import "localization/i18n";

const ShipmentAddress = ({ shipmentDetails }) => {
  const { t, i18n } = useTranslation();

  return (
    <div className="shipment-address">
      <h3>{t("deliveryAddress")}</h3>
      <span className="address-block">{t("deliveryAddress")}</span>
      {/* I couldn't find it inside the API response */}
      <figure>
        <img src={QuestionImg} />
        <figcaption>
          {t("problem")}
          <button>{t("reportProblem")}</button>
        </figcaption>
      </figure>
    </div>
  );
};

export default ShipmentAddress;
