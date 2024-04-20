import React from "react";
import { useTranslation } from "react-i18next";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import LaunchIcon from "@mui/icons-material/Launch";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Stepper, Step, StepLabel } from "@mui/material/";
import Check from "@mui/icons-material/Check";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import "./tracking-stepper.scss";

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#784af4",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#fc0000",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#fc0000",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor: ownerState.error
    ? "#ffc107"
    : theme.palette.mode === "dark"
    ? theme.palette.grey[700]
    : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundColor: ownerState.error ? "#ffc107" : "#fc0000",
  }),
  ...(ownerState.completed && {
    backgroundColor: ownerState.error ? "#ffc107" : "#fc0000",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className, icon, error } = props;

  // Define the icons mapping here
  const icons = {
    1: <LaunchIcon />,
    2: <LocalPostOfficeIcon />,
    3: <LocalShippingIcon />,
    4: <ContactPageIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active, error }}
      className={className}
    >
      {completed ? <Check /> : icons[String(icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  error: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Adjusted for clarity
};

export default function TrackingStepper({ shipmentDetails }) {
  const { t, i18n } = useTranslation();
  const currentState = shipmentDetails.CurrentStatus.state;
  const isError = currentState === "CANCELLED"; // Check if the state is 'CANCELLED'

  // Modify steps based on whether the final state is 'CANCELLED'
  const steps = [
    t("CREATED"),
    t("PACKAGE_RECEIVED"),
    t("shipmentIsOutForDelivery"),
    isError ? t("CANCELLED") : t("deliveryIsDone"), // Conditionally render the label
  ];

  const activeStep = getStatusStep(currentState);

  return (
    <Stepper
      className="tracking-stepper"
      sx={{
        flexDirection: i18n.language === "ar" ? "row-reverse" : "row",
        direction: i18n.language === "ar" ? "rtl" : "ltr",
      }}
      alternativeLabel
      activeStep={activeStep}
      connector={<ColorlibConnector />}
    >
      {steps.map((label, index) => (
        <Step key={label} completed={index < activeStep}>
          <StepLabel
            StepIconComponent={(props) => (
              <ColorlibStepIcon
                {...props}
                icon={index + 1}
                error={index === 3 && isError}
              />
            )}
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

function getStatusStep(currentState) {
  switch (currentState) {
    case "PACKAGE_RECEIVED":
      return 1; // Index for 'Shipment Received from Merchant'
    case "OUT_FOR_DELIVERY":
    case "WAITING_FOR_CUSTOMER_ACTION":
    case "IN_TRANSIT":
      return 2; // Index for 'Shipment is Out for Delivery'
    case "DELIVERED_TO_SENDER":
    case "CANCELLED":
    case "DELIVERED":
      return 3; // Index for 'Final Step'
    default:
      return 0; // Index for 'TICKET_CREATED', 'PACKAGE_RECEIVED'
  }
}
