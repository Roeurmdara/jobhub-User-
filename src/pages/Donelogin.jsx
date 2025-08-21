"use client"

const Donelogin = () => {
  const handleLogin = () => {
    // Add your login navigation logic here
    console.log("Navigating to login...")
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.checkmarkContainer}>
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#22c55e"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </div>

        <h1 style={styles.title}>Your password has been changed</h1>

        <p style={styles.subtitle}>Click bellow to login</p>

        <button
          style={styles.loginButton}
          onClick={handleLogin}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#1d4ed8")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#2563eb")}
        >
          Login
        </button>
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
  checkmarkContainer: {
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
  subtitle: {
    fontSize: "16px",
    color: "#6b7280",
    margin: "0 0 32px 0",
    lineHeight: "1.5",
  },
  loginButton: {
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "12px 24px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    width: "100%",
    transition: "background-color 0.2s ease",
    outline: "none",
  },
}

export default Donelogin
