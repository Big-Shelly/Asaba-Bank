import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import Image from 'next/image';

function Login() {
  const supabase = useSupabaseClient();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        throw error;
      }

      // Show loading state
      setErrorMsg('Logging in...');
      
      // Wait a moment before redirecting to show the message
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      router.push('/dashboard');
    } catch (error: any) {
      setErrorMsg(error.message || 'An unexpected error occurred');
    } finally {
      // Only hide loading state if there was an error
      if (errorMsg !== 'Logging in...') {
        setLoading(false);
      }
    }
  }

  return (
    <div>
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#000000',
        position: 'relative',
        backgroundImage: `url('/stars.svg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          paddingTop: '3rem',
          paddingBottom: '3rem'
        }}>
          <div style={{
            maxWidth: '400px',
            width: '100%',
            height: '80vh',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            padding: '2rem',
            borderRadius: '1rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem'
          }}>
            <div>
              <h2 style={{
                marginTop: '1.5rem',
                fontSize: '1.875rem',
                fontWeight: '800',
                color: '#111827',
                textAlign: 'center'
              }}>
                Sign in to your account
              </h2>
            </div>
            <form onSubmit={handleLogin}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }} htmlFor="email">
                  Email address
                </label>
                <div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.375rem',
                      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                      fontSize: '0.875rem',
                      color: '#1f2937',
                      backgroundColor: '#fff',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '0.5rem'
                }} htmlFor="password">
                  Password
                </label>
                <div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.375rem',
                      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                      fontSize: '0.875rem',
                      color: '#1f2937',
                      backgroundColor: '#fff',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {errorMsg && (
                <div style={{
                  color: '#ef4444',
                  fontSize: '0.875rem',
                  textAlign: 'center',
                  marginTop: '0.5rem'
                }}>
                  {errorMsg}
                </div>
              )}

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{
                  fontSize: '0.875rem'
                }}>
                  <a href="/auth/reset-password" style={{
                    color: '#3b82f6',
                    textDecoration: 'none'
                  }}>
                    Forgot your password?
                  </a>
                </div>
                <div style={{
                  fontSize: '0.875rem'
                }}>
                  <a href="/account/open/step1" style={{
                    color: '#3b82f6',
                    textDecoration: 'none'
                  }}>
                    Open a new account
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: 'none',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#fff',
                    backgroundColor: '#3b82f6',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Dark Footer */}
      <footer style={{
        backgroundColor: '#111827',
        padding: '2rem',
        color: '#9ca3af',
        fontSize: '0.875rem'
      }}>
        <div style={{
          maxWidth: '400px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <div style={{
            marginBottom: '1.5rem'
          }}>
            <p>
              Download our mobile app
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              marginTop: '0.75rem'
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
          </div>
          <div style={{
            marginTop: '2rem'
          }}>
            <div style={{
              marginBottom: '1rem'
            }}>
              <a href="/about" style={{
                color: '#3b82f6',
                textDecoration: 'none'
              }}>FAQs</a>
              <span style={{
                margin: '0 0.5rem'
              }}>•</span>
              <a href="/disclosures" style={{
                color: '#3b82f6',
                textDecoration: 'none'
              }}>Disclosures</a>
            </div>
            <div style={{
              marginBottom: '1rem'
            }}>
              <a href="/" style={{
                color: '#3b82f6',
                textDecoration: 'none'
              }}>Home</a>
              <span style={{
                margin: '0 0.5rem'
              }}>•</span>
              <a href="/mobile" style={{
                color: '#3b82f6',
                textDecoration: 'none'
              }}>Mobile</a>
              <span style={{
                margin: '0 0.5rem'
              }}>•</span>
              <a href="/browser-support" style={{
                color: '#3b82f6',
                textDecoration: 'none'
              }}>Browser Support</a>
            </div>
            <div>
              <a href="/contact" style={{
                color: '#3b82f6',
                textDecoration: 'none'
              }}>Contact Us</a>
              <span style={{
                margin: '0 0.5rem'
              }}>•</span>
              <a href="/privacy" style={{
                color: '#3b82f6',
                textDecoration: 'none'
              }}>Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Login;
