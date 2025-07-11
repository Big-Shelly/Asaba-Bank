function BrowserSupport() {
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
        Browser Support
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
            Supported Browsers
          </h2>
          <ul style={{
            listStyleType: 'none',
            padding: '0'
          }}>
            <li style={{
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <span style={{
                width: '30px',
                height: '30px',
                backgroundColor: '#000000',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}>C</span>
              <div>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '500',
                  margin: '0',
                  color: '#334155'
                }}>Chrome</h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#4b5563',
                  margin: '0'
                }}>Latest version and previous major version</p>
              </div>
            </li>

            <li style={{
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <span style={{
                width: '30px',
                height: '30px',
                backgroundColor: '#007AFF',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}>S</span>
              <div>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '500',
                  margin: '0',
                  color: '#334155'
                }}>Safari</h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#4b5563',
                  margin: '0'
                }}>Latest version and previous major version</p>
              </div>
            </li>

            <li style={{
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <span style={{
                width: '30px',
                height: '30px',
                backgroundColor: '#2196F3',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}>F</span>
              <div>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '500',
                  margin: '0',
                  color: '#334155'
                }}>Firefox</h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#4b5563',
                  margin: '0'
                }}>Latest version and previous major version</p>
              </div>
            </li>

            <li style={{
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <span style={{
                width: '30px',
                height: '30px',
                backgroundColor: '#0078D7',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}>E</span>
              <div>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '500',
                  margin: '0',
                  color: '#334155'
                }}>Edge</h3>
                <p style={{
                  fontSize: '0.875rem',
                  color: '#4b5563',
                  margin: '0'
                }}>Latest version and previous major version</p>
              </div>
            </li>
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
            Browser Recommendations
          </h2>
          <p style={{
            fontSize: '0.875rem',
            color: '#4b5563',
            marginBottom: '1rem'
          }}>
            For the best experience with Asaba Bank's online services, we recommend using the latest version of your preferred browser. Older versions may not support all features and may have security vulnerabilities.
          </p>
        </section>

        <section>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: '#111827'
          }}>
            Mobile Browser Support
          </h2>
          <p style={{
            fontSize: '0.875rem',
            color: '#4b5563'
          }}>
            Our mobile app is optimized for mobile browsers. For the best experience, please use the official Asaba Bank mobile app available on the App Store and Google Play.
          </p>
        </section>
      </div>
    </div>
  );
}

export default BrowserSupport;
