import { useTranslation } from "react-i18next";
import "localization/i18n";
import TrackingStepper from "./TrackingStepper";
import styles from "./tracking.module.scss";
import ShipmentDetails from "./ShipmentDetails";
import ShipmentAddress from "./ShipmentAddress";
import { useEffect, useState } from "react";
import formatDate from "utilities/formatDate";
const SHIPMENT_NUMBER = 67151313;
// const SHIPMENT_NUMBER = 7234258; // "DELIVERED"
// const SHIPMENT_NUMBER = 13737343; // "CANCELLED"

const Tracking = () => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [shipmentDetails, setShipmentDetails] = useState({
    CreateDate: "",
    PromisedDate: "",
    CurrentStatus: "",
    TransitEvents: [],
  });

  useEffect(() => {
    const fetchShipmentDetails = async () => {
      const url = `https://tracking.bosta.co/shipments/track/${SHIPMENT_NUMBER}`;
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setShipmentDetails(data);
        console.log("data", data);
      } catch (error) {
        setError(`Failed to fetch data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchShipmentDetails();
  }, []);

  const { CreateDate, PromisedDate, CurrentStatus, provider } = shipmentDetails;
  return (
    <div className="container">
      <main dir={i18n.language === "ar" ? "rtl" : "ltr"}>
        <div className={styles.tracking}>
          <div className={styles.trackingInfo}>
            <span>
              {t("shipmentNumber")} {SHIPMENT_NUMBER}
              <strong>{t(CurrentStatus.state)}</strong>
            </span>
            <span>
              {t("lastUpdate")}
              <strong>
                {CurrentStatus.timestamp
                  ? formatDate(
                      CurrentStatus.timestamp,
                      i18n.language === "ar" ? "ar" : "en"
                    )
                  : ""}
              </strong>
            </span>
            <span>
              {t("merchantName")}
              <strong>{provider}</strong>
            </span>
            <span>
              {t("deliveryDateWithin")}
              <strong>
                {PromisedDate
                  ? formatDate(
                      PromisedDate,
                      i18n.language === "ar" ? "ar" : "en"
                    )
                  : ""}
              </strong>
            </span>
          </div>
          <TrackingStepper shipmentDetails={shipmentDetails} />
        </div>
        <div className={styles.grid}>
          <ShipmentDetails shipmentDetails={shipmentDetails} />
          <ShipmentAddress shipmentDetails={shipmentDetails} />
        </div>
      </main>
    </div>
  );
};

export default Tracking;
