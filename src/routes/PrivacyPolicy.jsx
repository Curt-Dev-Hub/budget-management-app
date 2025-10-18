import { useState, useEffect } from "react";

function PrivacyPolicy() {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isLargeScreen = windowWidth >= 992;

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      backgroundColor: '#ffffff'
    }}>
      {/* Teal Background Section */}
      <div style={{
        background: 'linear-gradient(135deg, #20b2aa 0%, #48d1cc 100%)',
        padding: '3rem 1.25rem',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Hero */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem',
          maxWidth: '900px',
          margin: '0 auto 2rem auto'
        }}>
          <h1 style={{
            margin: '0 0 0.5rem',
            color: '#2b3959',
            fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
            fontWeight: '700',
            letterSpacing: '-0.5px',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            Privacy Policy
          </h1>
          <p style={{
            margin: '0',
            color: 'rgba(255,255,255,0.95)',
            fontSize: '1rem',
            lineHeight: '1.5',
            textShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}>
            Clear, concise information about what we collect, why we collect it and how we keep it safe.
          </p>
        </div>

        {/* Content Container */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: isLargeScreen ? '280px 1fr' : '1fr',
          gap: isLargeScreen ? '1.5rem' : '0',
          flex: 1
        }}>
          {/* Table of Contents */}
          {isLargeScreen && (
            <div style={{
              position: 'sticky',
              top: '1rem',
              height: 'fit-content'
            }}>
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.95)',
                borderRadius: '12px',
                padding: '1.5rem',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                backdropFilter: 'blur(10px)'
              }}>
                <h5 style={{
                  margin: '0 0 0.75rem 0',
                  color: '#20b2aa',
                  fontWeight: '700',
                  fontSize: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Contents
                </h5>
                <nav style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}>
                  {[
                    { href: '#purpose', text: '1. Purpose' },
                    { href: '#data', text: '2. Data Collected' },
                    { href: '#collection', text: '3. How We Collect' },
                    { href: '#use', text: '4. How We Use' },
                    { href: '#contact', text: '5. Contact' }
                  ].map((item, i) => (
                    <a
                      key={i}
                      href={item.href}
                      style={{
                        color: '#2b3959',
                        textDecoration: 'none',
                        padding: '0.6rem 0.75rem',
                        borderRadius: '6px',
                        transition: 'all 0.15s ease',
                        cursor: 'pointer',
                        borderLeft: '3px solid transparent',
                        fontSize: '0.95rem',
                        fontWeight: '500'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(32,178,170,0.1)';
                        e.currentTarget.style.borderLeftColor = '#20b2aa';
                        e.currentTarget.style.paddingLeft = '1rem';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.borderLeftColor = 'transparent';
                        e.currentTarget.style.paddingLeft = '0.75rem';
                      }}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.98)',
            borderRadius: '12px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
            backdropFilter: 'blur(10px)',
            padding: isLargeScreen ? '2.5rem' : '1.5rem',
            lineHeight: '1.7'
          }}>
            {/* Section 1 */}
            <section style={{ marginBottom: '2rem', scrollMarginTop: '100px' }} id="purpose">
              <h2 style={{
                color: '#2b3959',
                fontSize: '1.15rem',
                fontWeight: '700',
                margin: '0 0 0.75rem 0',
                letterSpacing: '-0.3px'
              }}>
                1. Purpose of this privacy policy
              </h2>
              <p style={{
                color: '#6b7380',
                lineHeight: '1.7',
                fontSize: '0.98rem',
                margin: '0'
              }}>
                This privacy policy explains how personal data is collected, processed and stored when you use this application.
                If you have questions, please get in touch using the contact details below.
              </p>
            </section>

            {/* Section 2 */}
            <section style={{ marginBottom: '2rem', scrollMarginTop: '100px' }} id="data">
              <h2 style={{
                color: '#2b3959',
                fontSize: '1.15rem',
                fontWeight: '700',
                margin: '0 0 0.75rem 0',
                letterSpacing: '-0.3px'
              }}>
                2. The data that is collected about you
              </h2>
              <p style={{
                color: '#6b7380',
                lineHeight: '1.7',
                fontSize: '0.98rem',
                margin: '0 0 0.75rem 0'
              }}>
                Personal data means any information from which a person can be identified. We may collect:
              </p>
              <ul style={{
                color: '#6b7380',
                lineHeight: '1.7',
                fontSize: '0.98rem',
                paddingLeft: '1.75rem',
                margin: '0'
              }}>
                <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#2b3959' }}>Identity data:</strong> name, username.</li>
                <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#2b3959' }}>Technical data:</strong> IP address, browser user agent, timestamps.</li>
                <li><strong style={{ color: '#2b3959' }}>Usage data:</strong> interactions and errors encountered in the app.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section style={{ marginBottom: '2rem', scrollMarginTop: '100px' }} id="collection">
              <h2 style={{
                color: '#2b3959',
                fontSize: '1.15rem',
                fontWeight: '700',
                margin: '0 0 0.75rem 0',
                letterSpacing: '-0.3px'
              }}>
                3. How is your personal data collected
              </h2>
              <p style={{
                color: '#6b7380',
                lineHeight: '1.7',
                fontSize: '0.98rem',
                margin: '0'
              }}>
                We collect data via direct interactions (forms), automated technologies (cookies, logs) and when you contact us for support.
              </p>
            </section>

            {/* Section 4 */}
            <section style={{ marginBottom: '2rem', scrollMarginTop: '100px' }} id="use">
              <h2 style={{
                color: '#2b3959',
                fontSize: '1.15rem',
                fontWeight: '700',
                margin: '0 0 0.75rem 0',
                letterSpacing: '-0.3px'
              }}>
                4. How your data is used
              </h2>
              <p style={{
                color: '#6b7380',
                lineHeight: '1.7',
                fontSize: '0.98rem',
                margin: '0 0 0.75rem 0'
              }}>
                We use data to:
              </p>
              <ol style={{
                color: '#6b7380',
                lineHeight: '1.7',
                fontSize: '0.98rem',
                paddingLeft: '1.75rem',
                margin: '0'
              }}>
                <li style={{ marginBottom: '0.5rem' }}>Protect and secure the app.</li>
                <li style={{ marginBottom: '0.5rem' }}>Improve functionality and performance.</li>
                <li>Investigate and prevent fraud or abuse.</li>
              </ol>
            </section>

            {/* Section 5 */}
            <section style={{ marginBottom: '2rem', scrollMarginTop: '100px' }} id="contact">
              <h2 style={{
                color: '#2b3959',
                fontSize: '1.15rem',
                fontWeight: '700',
                margin: '0 0 0.75rem 0',
                letterSpacing: '-0.3px'
              }}>
                5. Contact
              </h2>
              <p style={{
                color: '#6b7380',
                lineHeight: '1.7',
                fontSize: '0.98rem',
                margin: '0'
              }}>
                Full name: [Curtis King]<br />
                Email: <a href="mailto:example@email.com" style={{
                  color: '#20b2aa',
                  textDecoration: 'none',
                  fontWeight: '600',
                  transition: 'opacity 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>
                  [curt_king@coolsite.net]
                </a>
              </p>
              <div style={{
                backgroundColor: 'rgba(32,178,170,0.08)',
                padding: '1rem',
                borderRadius: '8px',
                borderLeft: '3px solid #20b2aa',
                marginTop: '1rem'
              }}>
                <p style={{
                  color: '#6b7380',
                  lineHeight: '1.7',
                  fontSize: '0.95rem',
                  margin: '0'
                }}>
                  If you have concerns you may contact the Information Commissioner&apos;s Office (ICO) in the UK. I would prefer you contact me first so I can resolve concerns quickly.
                </p>
              </div>
            </section>

            {/* Footer */}
            <footer style={{
              borderTop: '1px solid rgba(32,178,170,0.15)',
              paddingTop: '1rem',
              marginTop: '2rem',
              color: '#6b7380',
              textAlign: 'right',
              fontSize: '0.85rem'
            }}>
              <small>Last reviewed: 10 October 2025</small>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}


export default PrivacyPolicy;