import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      switchLanguage: "العربية",
      main: "Main",
      prices: "Prices",
      contactSales: "Contact sales",
      trackYourShipment: "Track your shipment",
      signIn: "Sign in",
      shipmentNumber: "Shipment number",
      // shipment status start
      CANCELLED: "Shipment has been canceled",
      DELIVERED: "Shipment has been delivered",
      CREATED: "Shipment has been created",
      TICKET_CREATED: "Ticket Created",
      PACKAGE_RECEIVED: "Package Received",
      IN_TRANSIT: "In Transit",
      OUT_FOR_DELIVERY: "Out for Delivery",
      WAITING_FOR_CUSTOMER_ACTION: "Waiting for Customer Action",
      NOT_YET_SHIPPED: "Not Yet Shipped",
      DELIVERED_TO_SENDER: "Delivered to Sender",
      CUSTOMER_NOT_IN_ADDRESS:
        "Retry delivery - the customer is not at the address",
      CUSTOMER_POSTPONED:
        "Postponed - the customer requested postponement for another day",
      CUSTOMER_NOT_ANSWERING: "Customer is not answering",
      // shipment status end
      lastUpdate: "Last update",
      merchantName: "Merchant name",
      deliveryDateWithin: "Delivery date within",
      shipmentCreate: "Your shipment has been created",
      shipmentReceivedFromMerchant: "Shipment has been received from merchant",
      shipmentIsOutForDelivery: "Shipment is out for delivery",
      deliveryIsDone: "Delivery is done",
      shipmentDetails: "Shipment details",
      deliveryAddress: "Delivery address",
      branch: "Branch",
      date: "Date",
      time: "Time",
      details: "Details",
      problem: "Is there's a problem in your shipment?",
      reportProblem: "Report a problem",
      noEvents: "No events to be displayed",
    },
  },
  ar: {
    translation: {
      switchLanguage: "ENG",
      main: "الرئيسية",
      prices: "الأسعار",
      contactSales: "تواصل مع المبيعات",
      trackYourShipment: "تتبع شحنتك",
      signIn: "تسجيل الدخول",
      shipmentNumber: "رقم الشحنة",
      // shipment status start
      CANCELLED: "تم إلغاء الشحنة",
      DELIVERED: "تم توصيل الشحنة",
      CREATED: "تم انشاء الشحنة",
      TICKET_CREATED: "تم إنشاء التذكرة",
      PACKAGE_RECEIVED: "تم استلام الشحنة",
      IN_TRANSIT: "في الطريق",
      OUT_FOR_DELIVERY: "خارج للتوصيل",
      WAITING_FOR_CUSTOMER_ACTION: "في انتظار تحرك العميل",
      NOT_YET_SHIPPED: "لم يتم الشحن بعد",
      DELIVERED_TO_SENDER: "تم التسليم إلى المرسل",
      CUSTOMER_NOT_IN_ADDRESS: "إعادة التوصيل - العميل ليس في العنوان",
      CUSTOMER_POSTPONED: "تم التأجيل - العميل طلب تأجيل ليوم آخر",
      CUSTOMER_NOT_ANSWERING: "العميل لا يجيب",
      // shipment status end
      lastUpdate: "آخر تحديث",
      merchantName: "اسم التاجر",
      deliveryDateWithin: "موعد التسليم خلال",
      shipmentCreate: "تم إنشاء شحنتك",
      shipmentReceivedFromMerchant: "تم استلام الشحنة من التاجر",
      shipmentIsOutForDelivery: "الشحنة في طريقها للتسليم",
      deliveryIsDone: "تم التسليم",
      shipmentDetails: "تفاصيل الشحنة",
      deliveryAddress: "عنوان التسليم",
      branch: "الفرع",
      date: "التاريخ",
      time: "الوقت",
      details: "التفاصيل",
      problem: "هل يوجد مشكلة فى شحنتك؟",
      reportProblem: "بلغ عن مشكلة",
      noEvents: "لا يوجد اى احداث للعرض",
    },
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: "en",
    detection: {
      order: [
        "querystring",
        "cookie",
        "localStorage",
        "sessionStorage",
        "navigator",
        "htmlTag",
        "path",
        "subdomain",
      ],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
