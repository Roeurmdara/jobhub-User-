"use client"

import { useState } from "react"

const Forgetpassword = () => {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Password reset requested for:", email)
    setIsSubmitted(true)
    // Here you would typically call your password reset API
  }

  const handleBackToLogin = () => {
    console.log("Back to login clicked")
    // Here you would typically navigate back to the login page
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "48px",
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          textAlign: "center",
        }}
      >
        {!isSubmitted ? (
          <>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "600",
                color: "#3b82f6",
                marginBottom: "16px",
              }}
            >
              Forgot your password?
            </h1>

            <p
              style={{
                fontSize: "16px",
                color: "#6b7280",
                marginBottom: "32px",
                lineHeight: "1.5",
              }}
            >
              Your password will be reset by email.
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "24px", textAlign: "left" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "8px",
                  }}
                >
                  Enter your email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "16px",
                    outline: "none",
                    transition: "border-color 0.2s",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                  onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                  placeholder=""
                  required
                />
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "12px 24px",
                  backgroundColor: "#1f2937",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                  marginBottom: "24px",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#111827")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#1f2937")}
              >
                Next
              </button>
            </form>

            <button
              onClick={handleBackToLogin}
              style={{
                background: "none",
                border: "none",
                color: "#3b82f6",
                fontSize: "16px",
                cursor: "pointer",
                textDecoration: "none",
              }}
              onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
              onMouseOut={(e) => (e.target.style.textDecoration = "none")}
            >
              Back to log in
            </button>
          </>
        ) : (
          <>
            <div
              style={{
                width: "64px",
                height: "64px",
                backgroundColor: "#10b981",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px",
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20,6 9,17 4,12" />
              </svg>
            </div>

            <h1
              style={{
                fontSize: "24px",
                fontWeight: "600",
                color: "#111827",
                marginBottom: "16px",
              }}
            >
              Check your email
            </h1>

            <p
              style={{
                fontSize: "16px",
                color: "#6b7280",
                marginBottom: "32px",
                lineHeight: "1.5",
              }}
            >
              We've sent a password reset link to <span style={{ fontWeight: "500", color: "#111827" }}>{email}</span>
            </p>

            <button
              onClick={handleBackToLogin}
              style={{
                width: "100%",
                padding: "12px 24px",
                backgroundColor: "#1f2937",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "background-color 0.2s",
                marginBottom: "16px",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#111827")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#1f2937")}
            >
              Back to log in
            </button>

            <p
              style={{
                fontSize: "14px",
                color: "#6b7280",
                lineHeight: "1.5",
              }}
            >
              Didn't receive the email? Check your spam folder or{" "}
              <button
                onClick={() => {
                  setIsSubmitted(false)
                  setEmail("")
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#3b82f6",
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontSize: "14px",
                }}
              >
                try again
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default Forgetpassword
