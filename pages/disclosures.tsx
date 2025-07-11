function Disclosures() {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '2rem auto',
      padding: '1rem'
    }}>
      <h1 style={{
        fontSize: '2rem',
        fontWeight: 'bold',
        marginBottom: '1.5rem'
      }}>
        Important Disclosures
      </h1>

      <div style={{
        backgroundColor: '#f8fafc',
        padding: '1.5rem',
        borderRadius: '0.5rem'
      }}>
        <section style={{
          marginBottom: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: '#111827'
          }}>
            Account Terms and Conditions
          </h2>
          <p style={{
            fontSize: '0.875rem',
            color: '#4b5563',
            marginBottom: '1rem'
          }}>
            By opening an account with Asaba Bank, you agree to our terms and conditions. Please review them carefully before proceeding.
          </p>
          <ul style={{
            listStyleType: 'disc',
            paddingLeft: '1.5rem',
            marginBottom: '1rem'
          }}>
            <li style={{
              marginBottom: '0.5rem'
            }}>Minimum opening deposit: $100</li>
            <li style={{
              marginBottom: '0.5rem'
            }}>No monthly maintenance fees</li>
            <li style={{
              marginBottom: '0.5rem'
            }}>Free unlimited transactions</li>
          </ul>
        </section>

        <section style={{
          marginBottom: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: '#111827'
          }}>
            Privacy Policy
          </h2>
          <p style={{
            fontSize: '0.875rem',
            color: '#4b5563',
            marginBottom: '1rem'
          }}>
            We are committed to protecting your privacy. Please review our privacy policy to understand how we collect, use, and protect your personal information.
          </p>
        </section>

        <section style={{
          marginBottom: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: '#111827'
          }}>
            Mobile Banking Terms
          </h2>
          <p style={{
            fontSize: '0.875rem',
            color: '#4b5563',
            marginBottom: '1rem'
          }}>
            Our mobile banking services are subject to certain terms and conditions. Standard data rates may apply.
          </p>
        </section>

        <section>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: '#111827'
          }}>
            Important Notices
          </h2>
          <p style={{
            fontSize: '0.875rem',
            color: '#4b5563'
          }}>
            This information is subject to change. Please check back regularly for updates.
          </p>
        </section>
      </div>
    </div>
  );
}

export default Disclosures;
