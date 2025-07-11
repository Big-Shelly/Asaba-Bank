function Mobile() {
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
        Mobile Banking
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
            Download Our Mobile App
          </h2>
          <p style={{
            fontSize: '0.875rem',
            color: '#4b5563',
            marginBottom: '1rem'
          }}>
            Experience the convenience of banking on the go with the Asaba Bank mobile app. Available for both iOS and Android devices.
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <a href="https://play.google.com/store/apps/details?id=com.asababank" style={{
              opacity: 1,
              transition: 'opacity 0.2s'
            }}>
              <img
                src="/google-play.svg"
                alt="Get it on Google Play"
                style={{
                  width: '160px',
                  height: '50px'
                }}
              />
            </a>
            <a href="https://apps.apple.com/app/asababank/id123456789" style={{
              opacity: 1,
              transition: 'opacity 0.2s'
            }}>
              <img
                src="/apple-store.svg"
                alt="Download on the App Store"
                style={{
                  width: '160px',
                  height: '50px'
                }}
              />
            </a>
          </div>
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
            Features
          </h2>
          <ul style={{
            listStyleType: 'disc',
            paddingLeft: '1.5rem',
            marginBottom: '1rem'
          }}>
            <li style={{
              marginBottom: '0.5rem'
            }}>Secure login with biometric authentication</li>
            <li style={{
              marginBottom: '0.5rem'
            }}>Quick account balance checks</li>
            <li style={{
              marginBottom: '0.5rem'
            }}>Easy money transfers</li>
            <li style={{
              marginBottom: '0.5rem'
            }}>Bill payments</li>
            <li style={{
              marginBottom: '0.5rem'
            }}>Mobile check deposit</li>
            <li style={{
              marginBottom: '0.5rem'
            }}>24/7 customer support</li>
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
            System Requirements
          </h2>
          <p style={{
            fontSize: '0.875rem',
            color: '#4b5563',
            marginBottom: '1rem'
          }}>
            <strong>Android:</strong> Android 7.0 (Nougat) or higher<br/>
            <strong>iOS:</strong> iOS 13.0 or higher
          </p>
        </section>

        <section>
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
            color: '#4b5563'
          }}>
            Your security is our priority. Our mobile app features:<br/>
            - Biometric authentication<br/>
            - End-to-end encryption<br/>
            - Session timeout<br/>
            - Secure data storage
          </p>
        </section>
      </div>
    </div>
  );
}

export default Mobile;
