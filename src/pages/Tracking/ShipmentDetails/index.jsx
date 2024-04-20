import { useTranslation } from "react-i18next";
import "localization/i18n";
import "./shipment-details.scss";
import { formatDateOnly } from "utilities/formatDateOnly";
import { formatTimeOnly } from "utilities/formatTimeOnly";
import { useEffect, useState } from "react";

const ShipmentDetails = ({ shipmentDetails }) => {
  const { t, i18n } = useTranslation();
  const { TransitEvents } = shipmentDetails;
  const [hubLocations, setHubLocations] = useState([]);

  useEffect(() => {
    setHubLocations(
      TransitEvents.filter(
        (event) => event.state === "PACKAGE_RECEIVED" && event.hub
      )
    );
  }, [TransitEvents]);

  return (
    <div className="shipment-details">
      <h3>{t("shipmentDetails")}</h3>
      <table>
        <thead>
          <tr>
            <th>{t("branch")}</th>
            <th>{t("date")}</th>
            <th>{t("time")}</th>
            <th>{t("details")}</th>
          </tr>
        </thead>
        <tbody>
          {hubLocations.length > 0 ? (
            hubLocations.map((event) => (
              <tr>
                <td>{event.hub}</td>
                <td>{formatDateOnly(event.timestamp)}</td>
                <td>{formatTimeOnly(event.timestamp)}</td>
                <td>{t("PACKAGE_RECEIVED")}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                {t("noEvents")}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShipmentDetails;
