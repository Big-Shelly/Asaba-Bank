function PrivacyPolicy() {
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
        Privacy Policy
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
            Information We Collect
          </h2>
          <p style={{
            fontSize: '0.875rem',
            color: '#4b5563',
            marginBottom: '1rem'
          }}>
            We collect information that you provide to us when opening an account, making transactions, or using our services. This includes:
          </p>
          <ul style={{
            listStyleType: 'disc',
            paddingLeft: '1.5rem',
            marginBottom: '1rem'
          }}>
            <li style={{
              marginBottom: '0.5rem'
            }}>Personal information (name, address, contact details)</li>
            <li style={{
              marginBottom: '0.5rem'
            }}>Financial information (account numbers, transaction history)</li>
            <li style={{
              marginBottom: '0.5rem'
            }}>Usage data (how you interact with our services)</li>
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
            How We Use Your Information
          </h2>
          <p style={{
            fontSize: '0.875rem',
            color: '#4b5563',
            marginBottom: '1rem'
          }}>
            We use your information to:
          </p>
          <ul style={{
            listStyleType: 'disc',
            paddingLeft: '1.5rem',
            marginBottom: '1rem'
          }}>
            <li style={{
              marginBottom: '0.5rem'
            }}>Provide and maintain our services</li>
            <li style={{
              marginBottom: '0.5rem'
            }}>Process transactions</li>
            <li style={{
              marginBottom: '0.5rem'
            }}>Detect and prevent fraud</li>
            <li style={{
              marginBottom: '0.5rem'
            }}>Comply with legal requirements</li>
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
            Security
          </h2>
          <p style={{
            fontSize: '0.875rem',
            color: '#4b5563',
            marginBottom: '1rem'
          }}>
            We implement industry-standard security measures to protect your information. This includes encryption, secure servers, and regular security audits.
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
            Your Rights
          </h2>
          <p style={{
            fontSize: '0.875rem',
            color: '#4b5563',
            marginBottom: '1rem'
          }}>
            You have the right to:
          </p>
          <ul style={{
            listStyleType: 'disc',
            paddingLeft: '1.5rem',
            marginBottom: '1rem'
          }}>
            <li style={{
              marginBottom: '0.5rem'
            }}>Access your information</li>
            <li style={{
              marginBottom: '0.5rem'
            }}>Correct inaccurate information</li>
            <li style={{
              marginBottom: '0.5rem'
            }}>Request deletion of your information</li>
          </ul>
        </section>

        <section>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: '#111827'
          }}>
            Changes to This Policy
          </h2>
          <p style={{
            fontSize: '0.875rem',
            color: '#4b5563'
          }}>
            We may update this privacy policy from time to time. Any changes will be posted on this page with an updated effective date.
          </p>
        </section>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
