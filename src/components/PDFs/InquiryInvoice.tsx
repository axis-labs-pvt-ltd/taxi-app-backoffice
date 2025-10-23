import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  // Image,
} from "@react-pdf/renderer";
import { InquiryPaginatedDataType } from "../../types/Inquiries.types";
// import BoundbondLogo from "../../assets/Logo.png";

// 🧾 Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    backgroundColor: "#FAFAFA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottom: "2px solid #0077b6",
    paddingBottom: 10,
    marginBottom: 25,
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#023e8a",
  },
  invoiceTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "right",
    color: "#03045e",
  },
  section: {
    marginBottom: 15,
    padding: 12,
    border: "1px solid #ccc",
    borderRadius: 6,
    backgroundColor: "#fff",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
  },
  sectionTitle: {
    fontSize: 13,
    marginBottom: 8,
    fontWeight: "bold",
    color: "#1a237e",
    borderBottom: "1px solid #ddd",
    paddingBottom: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  label: { fontWeight: "bold", color: "#333", width: "40%" },
  value: { width: "60%", color: "#555" },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#e3f2fd",
    borderBottom: "1px solid #bbb",
    paddingVertical: 4,
    paddingHorizontal: 2,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #eee",
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  tableCell: { flex: 1, fontSize: 10 },
  summaryBox: {
    marginTop: 10,
    padding: 10,
    borderTop: "2px solid #0077b6",
    backgroundColor: "#e3f2fd",
    borderRadius: 6,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  summaryLabel: { fontWeight: "bold", color: "#023e8a" },
  summaryValue: { fontWeight: "bold", color: "#000" },
  totalRow: {
    marginTop: 6,
    paddingTop: 6,
    borderTop: "1px solid #0077b6",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalLabel: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#03045e",
  },
  totalValue: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#03045e",
  },
  footer: {
    marginTop: 25,
    fontSize: 10,
    textAlign: "center",
    color: "#555",
    borderTop: "1px solid #ccc",
    paddingTop: 8,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 4,
  },
  logo: {
    width: 60,
    height: 60,
    objectFit: "contain",
  },
});

// 🧩 Component
interface InquiryInvoiceProps {
  inquiry: InquiryPaginatedDataType;
}

const InquiryInvoice: React.FC<InquiryInvoiceProps> = ({ inquiry }) => {
  const formatCurrency = (value?: number) =>
    value != null ? `Rs. ${value.toFixed(2)}` : "N/A";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Logo */}
        {/* <View style={styles.logoContainer}>
          <Image style={styles.logo} src={BoundbondLogo} />
        </View> */}

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.companyName}>47 Tours</Text>
          <Text style={styles.invoiceTitle}>INVOICE</Text>
        </View>

        {/* Customer Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Information</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{inquiry.fullName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{inquiry.phone}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{inquiry.email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tour Date:</Text>
            <Text style={styles.value}>{inquiry.tourDate.split("T")[0]}</Text>
          </View>
        </View>

        {/* Trip Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trip Details</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Pickup:</Text>
            <Text style={styles.value}>{inquiry.pickup?.name ?? "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Drop:</Text>
            <Text style={styles.value}>{inquiry.drop?.name ?? "N/A"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Estimated Distance:</Text>
            <Text style={styles.value}>{inquiry.totalDistance} km</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Actual Distance:</Text>
            <Text style={styles.value}>
              {inquiry.actualTotalDistance
                ? `${inquiry.actualTotalDistance} km`
                : "N/A"}
            </Text>
          </View>
        </View>

        {/* Vehicle Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vehicle Details</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Model:</Text>
            <Text style={styles.value}>
              {inquiry.vehicleModelId.modelName} ({inquiry.vehicleModelId.type})
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Brand:</Text>
            <Text style={styles.value}>{inquiry.vehicleModelId.brand}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Plate No:</Text>
            <Text style={styles.value}>
              {inquiry.vehicleAssigned.plateNumber}
            </Text>
          </View>
        </View>

        {/* Drop Points */}
        {inquiry.dropPoints?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Drop Points</Text>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCell, { flex: 0.2 }]}>#</Text>
              <Text style={[styles.tableCell, { flex: 1.5 }]}>Name</Text>
              <Text style={[styles.tableCell, { flex: 0.6 }]}>Distance</Text>
              <Text style={[styles.tableCell, { flex: 0.6 }]}>Duration</Text>
            </View>
            {inquiry.dropPoints.map((dp, index) => (
              <View key={dp.id} style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 0.2 }]}>
                  {index + 1}
                </Text>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>{dp.name}</Text>
                <Text style={[styles.tableCell, { flex: 0.6 }]}>
                  {dp.distance ?? "N/A"}
                </Text>
                <Text style={[styles.tableCell, { flex: 0.6 }]}>
                  {dp.duration ?? "N/A"}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Extra Services */}
        {inquiry.extraServices?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Extra Services</Text>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCell, { flex: 1.5 }]}>Name</Text>
              <Text style={[styles.tableCell, { flex: 0.6 }]}>Qty</Text>
              <Text style={[styles.tableCell, { flex: 0.6 }]}>Total</Text>
            </View>
            {inquiry.extraServices.map((service) => (
              <View key={service.id} style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 1.5 }]}>
                  {service.name}
                </Text>
                <Text style={[styles.tableCell, { flex: 0.6 }]}>
                  {service.qty ?? "N/A"}
                </Text>
                <Text style={[styles.tableCell, { flex: 0.6 }]}>
                  {service.qty != null && service.price != null
                    ? formatCurrency(service.qty * service.price)
                    : "N/A"}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Price Summary */}
        <View style={styles.summaryBox}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Estimated Price:</Text>
            <Text style={styles.summaryValue}>
              {formatCurrency(inquiry.estimatedPrice)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Final Price:</Text>
            <Text style={styles.summaryValue}>
              {formatCurrency(inquiry.finalPrice)}
            </Text>
          </View>
          {inquiry.discount && (
            <>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Discount:</Text>
                <Text style={styles.summaryValue}>
                  {formatCurrency(inquiry.discount)}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Discounted Price:</Text>
                <Text style={styles.summaryValue}>
                  {formatCurrency(inquiry.finalPrice - inquiry.discount)}
                </Text>
              </View>
            </>
          )}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Final Price:</Text>
            <Text style={styles.totalValue}>
              {formatCurrency(
                inquiry.discount
                  ? inquiry.finalPrice - inquiry.discount
                  : inquiry.finalPrice
              )}
            </Text>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Thank you for choosing 47 Tours!{"\n"}
          Safe travels and see you again!
        </Text>
      </Page>
    </Document>
  );
};

export default InquiryInvoice;
