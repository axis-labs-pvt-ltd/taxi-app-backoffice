import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { InquiryPaginatedDataType } from "../../types/Inquiries.types";

// Styles
const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 11, fontFamily: "Helvetica" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "1px solid #000",
    paddingBottom: 10,
    marginBottom: 20,
  },
  companyName: { fontSize: 18, fontWeight: "bold" },
  invoiceTitle: { fontSize: 18, textAlign: "right" },
  section: {
    marginBottom: 15,
    padding: 10,
    border: "1px solid #ccc",
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 13,
    marginBottom: 6,
    fontWeight: "bold",
    color: "#333",
    borderBottom: "1px solid #ddd",
    paddingBottom: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  label: { fontWeight: "bold", width: "40%" },
  value: { width: "60%" },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderBottom: "1px solid #ccc",
    padding: 4,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #eee",
    padding: 4,
  },
  tableCell: { flex: 1, fontSize: 10 },
  footer: { marginTop: 30, fontSize: 10, textAlign: "center", color: "#555" },
});

interface InquiryInvoiceProps {
  inquiry: InquiryPaginatedDataType;
}

const InquiryInvoice: React.FC<InquiryInvoiceProps> = ({ inquiry }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.companyName}>BoundBond Tours</Text>
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
              <Text style={[styles.tableCell, { flex: 0.2 }]}>{index + 1}</Text>
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
                  ? service.qty * service.price
                  : "N/A"}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Price Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Price Summary</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Estimated Price:</Text>
          <Text style={styles.value}>
            Rs. {inquiry.estimatedPrice.toFixed(2)}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Final Price:</Text>
          <Text style={styles.value}>Rs. {inquiry.finalPrice.toFixed(2)}</Text>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>Thank you for choosing our service!</Text>
    </Page>
  </Document>
);

export default InquiryInvoice;
