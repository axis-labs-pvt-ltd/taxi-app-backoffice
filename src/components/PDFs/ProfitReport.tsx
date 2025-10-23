import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// 🎨 Styles
const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 11, fontFamily: "Helvetica" },

  // Header
  header: {
    alignItems: "center",
    borderBottom: "2px solid #2E86C1",
    paddingBottom: 12,
    marginBottom: 20,
  },
  companyName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E86C1",
  },
  reportTitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  dateRange: {
    textAlign: "center",
    fontSize: 10,
    color: "#444",
    marginBottom: 15,
  },

  // Section titles
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#2E4053",
    backgroundColor: "#EBF5FB",
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderLeft: "3px solid #2E86C1",
    marginBottom: 6,
  },

  // Table
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#D6EAF8",
    borderBottom: "1px solid #A9CCE3",
    paddingVertical: 4,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "0.5px solid #ddd",
    paddingVertical: 4,
  },
  tableCell: { flex: 1, fontSize: 10, textAlign: "left", paddingHorizontal: 2 },
  tableCellRight: {
    flex: 1,
    fontSize: 10,
    textAlign: "right",
    paddingHorizontal: 2,
  },

  // Summary Section
  summarySection: {
    marginTop: 18,
    padding: 10,
    backgroundColor: "#F8F9F9",
    border: "1px solid #D5D8DC",
    borderRadius: 4,
  },
  summaryHeader: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#2E4053",
    marginBottom: 6,
    borderBottom: "1px solid #BFC9CA",
    paddingBottom: 4,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3,
  },
  summaryLabel: { fontWeight: "bold", color: "#333" },
  summaryValue: { fontWeight: "bold", color: "#000" },

  // Profit Highlight
  profitHighlight: {
    marginTop: 8,
    backgroundColor: "#E8F8F5",
    border: "1px solid #A2D9CE",
    borderRadius: 4,
    padding: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profitLabel: { fontWeight: "bold", color: "#117A65" },
  profitValue: { fontWeight: "bold", color: "#117A65" },

  // Footer
  footer: {
    marginTop: 25,
    fontSize: 9,
    textAlign: "center",
    color: "#7F8C8D",
    borderTop: "1px solid #ccc",
    paddingTop: 8,
  },
});

// 🧩 Types
interface ReportItem {
  type: string;
  inquiryId: string;
  customerName: string;
  phone: string;
  tourDate?: string;
  bookingDate?: string;
  finalPrice: number;
  totalCost: number;
  profit: number;
}

interface Summary {
  totalSales: number;
  totalCost: number;
  totalProfit: number;
}

interface ProfitCostReportPDFProps {
  reports: ReportItem[];
  summary: Summary;
  startDate?: string;
  endDate?: string;
}

// 📄 Component
const ProfitCostReportPDF: React.FC<ProfitCostReportPDFProps> = ({
  reports,
  summary,
  startDate,
  endDate,
}) => {
  const formatDate = (date?: string) =>
    date ? new Date(date).toLocaleDateString("en-GB") : "N/A";

  const formatCurrency = (amount: number) =>
    `Rs. ${amount.toLocaleString("en-LK", { minimumFractionDigits: 2 })}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.companyName}>47 Tours</Text>
          <Text style={styles.reportTitle}>Profit & Cost Report</Text>
        </View>

        {/* Date Range */}
        {startDate && endDate && (
          <Text style={styles.dateRange}>
            Period: {formatDate(startDate)} - {formatDate(endDate)}
          </Text>
        )}

        {/* Table Section */}
        <Text style={styles.sectionTitle}>Inquiries</Text>

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.tableCell, { flex: 0.6 }]}>Type</Text>
          <Text style={[styles.tableCell, { flex: 1.5 }]}>Customer</Text>
          <Text style={[styles.tableCell, { flex: 1 }]}>Phone</Text>
          <Text style={[styles.tableCell, { flex: 1 }]}>Date</Text>
          <Text style={[styles.tableCellRight, { flex: 1 }]}>Revenue</Text>
          <Text style={[styles.tableCellRight, { flex: 1 }]}>Cost</Text>
          <Text style={[styles.tableCellRight, { flex: 1 }]}>Profit</Text>
        </View>

        {/* Table Rows */}
        {reports.length > 0 ? (
          reports.map((r, index) => (
            <View key={r.inquiryId + index} style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 0.6 }]}>
                {r.type === "wedding" ? "Wedding" : "Normal"}
              </Text>
              <Text style={[styles.tableCell, { flex: 1.5 }]}>
                {r.customerName}
              </Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>{r.phone}</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>
                {formatDate(r.tourDate || r.bookingDate)}
              </Text>
              <Text style={[styles.tableCellRight, { flex: 1 }]}>
                {formatCurrency(r.finalPrice)}
              </Text>
              <Text style={[styles.tableCellRight, { flex: 1 }]}>
                {formatCurrency(r.totalCost)}
              </Text>
              <Text style={[styles.tableCellRight, { flex: 1 }]}>
                {formatCurrency(r.profit)}
              </Text>
            </View>
          ))
        ) : (
          <Text style={{ marginTop: 10, fontSize: 10, color: "#999" }}>
            No inquiries found in this period.
          </Text>
        )}

        {/* Summary Section */}
        <View style={styles.summarySection}>
          <Text style={styles.summaryHeader}>Summary</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Revenue:</Text>
            <Text style={styles.summaryValue}>
              {formatCurrency(summary.totalSales)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Cost:</Text>
            <Text style={styles.summaryValue}>
              {formatCurrency(summary.totalCost)}
            </Text>
          </View>

          {/* Profit Highlight Box */}
          <View style={styles.profitHighlight}>
            <Text style={styles.profitLabel}>Net Profit:</Text>
            <Text style={styles.profitValue}>
              {formatCurrency(summary.totalProfit)}
            </Text>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Generated by 47 Tours Management System
        </Text>
      </Page>
    </Document>
  );
};

export default ProfitCostReportPDF;
