"use client"

const Checkemail = ({ email = "aishauxui@gmail.com" }) => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.iconContainer}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2563eb"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            <path d="M16 19H8" />
          </svg>
        </div>

        <h1 style={styles.title}>Check your email</h1>

        <p style={styles.message}>
          We've sent instructions on how to reset your user password to <span style={styles.email}>{email}</span>.
        </p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  card: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "48px 40px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    textAlign: "center",
    maxWidth: "500px",
    width: "100%",
  },
  iconContainer: {
    marginBottom: "24px",
    display: "flex",
    justifyContent: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#1f2937",
    margin: "0 0 16px 0",
    lineHeight: "1.3",
  },
  message: {
    fontSize: "16px",
    color: "#6b7280",
    margin: "0",
    lineHeight: "1.6",
  },
  email: {
    fontWeight: "500",
    color: "#4b5563",
  },
}

export default Checkemail
