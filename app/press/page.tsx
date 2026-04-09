import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Press & Media — S.E.B. by SILT | Independent AI Behavioral Risk Assessment",
  description:
    "Press resources, media kit, and newsroom for S.E.B. (Sentience Evaluation Battery) — the industry's first independent behavioral risk assessment for AI systems.",
};

export default function PressPage() {
  return (
    <>
      <style>{`
        :root {
          --purple: #7b68ee;
          --purple-dark: #5a4fcf;
          --purple-light: #9d8ff2;
          --bg: #fafbfc;
          --bg-card: #ffffff;
          --text: #1a1a2e;
          --text-muted: #64748b;
          --border: #e2e8f0;
          --red: #ef4444;
          --orange: #f97316;
          --yellow: #eab308;
          --green: #22c55e;
          --blue: #3b82f6;
        }

        .press-page * { box-sizing: border-box; }

        .press-contact-bar {
          background: linear-gradient(135deg, #5a4fcf, #7b68ee);
          padding: 14px 0;
          text-align: center;
          font-size: 15px;
          font-weight: 500;
          color: rgba(255,255,255,0.9);
        }
        .press-contact-bar a {
          color: #fff;
          text-decoration: underline;
          font-weight: 600;
        }

        .non-media-note {
          background: #f1f5f9;
          border-bottom: 1px solid var(--border);
          padding: 6px 0;
          text-align: center;
          font-size: 13px;
          color: var(--text-muted);
        }
        .non-media-note a { color: var(--purple); text-decoration: none; }
        .non-media-note a:hover { text-decoration: underline; }

        .press-container { max-width: 920px; margin: 0 auto; padding: 0 24px; }

        .press-header {
          padding: 56px 0 24px;
          border-bottom: 1px solid var(--border);
        }
        .press-badge {
          display: inline-block;
          background: rgba(123,104,238,0.1);
          color: var(--purple);
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 4px 12px;
          border-radius: 4px;
          margin-bottom: 12px;
        }
        .press-header h1 {
          font-size: 2.4rem;
          font-weight: 800;
          margin: 0 0 8px;
          color: var(--text);
        }
        .press-header h1 span { color: var(--purple); }
        .press-header p {
          font-size: 1.1rem;
          color: var(--text-muted);
          max-width: 680px;
          margin: 0;
        }

        .quick-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          padding: 24px 0;
          border-bottom: 1px solid var(--border);
        }
        .quick-actions a {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 20px;
          border: 1px solid var(--border);
          border-radius: 6px;
          color: var(--text);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.15s;
        }
        .quick-actions a:hover {
          border-color: var(--purple);
          background: rgba(123,104,238,0.04);
        }
        .quick-actions a.primary {
          background: var(--purple);
          border-color: var(--purple);
          color: #fff;
        }
        .quick-actions a.primary:hover { background: var(--purple-dark); }

        .press-section {
          padding: 40px 0;
          border-bottom: 1px solid var(--border);
        }
        .press-section:last-child { border-bottom: none; }
        .press-section h2 {
          font-size: 1.4rem;
          font-weight: 700;
          margin: 0 0 20px;
          color: var(--text);
        }
        .press-section h3 {
          font-size: 1rem;
          font-weight: 700;
          margin: 20px 0 8px;
          color: var(--text);
        }
        .press-section p {
          color: var(--text-muted);
          margin: 0 0 12px;
          line-height: 1.65;
        }

        .fact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 12px;
          margin-top: 12px;
        }
        .fact-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 16px;
        }
        .fact-card .number {
          font-size: 1.7rem;
          font-weight: 800;
          color: var(--purple);
        }
        .fact-card .label {
          font-size: 13px;
          color: var(--text-muted);
          margin-top: 2px;
        }

        .defcon-scale {
          display: flex;
          gap: 0;
          margin-top: 20px;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid var(--border);
        }
        .defcon-level {
          flex: 1;
          padding: 14px 10px;
          text-align: center;
        }
        .defcon-level .level { font-size: 1.3rem; font-weight: 800; }
        .defcon-level .desc {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 4px;
        }
        .d5 { background: rgba(34,197,94,0.08); color: var(--green); }
        .d4 { background: rgba(59,130,246,0.08); color: var(--blue); }
        .d3 { background: rgba(234,179,8,0.08); color: var(--yellow); }
        .d2 { background: rgba(249,115,22,0.08); color: var(--orange); }
        .d1 { background: rgba(239,68,68,0.08); color: var(--red); }

        .featured-release {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 24px;
          margin-bottom: 24px;
          position: relative;
          overflow: hidden;
        }
        .featured-release::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--purple), var(--purple-light));
        }
        .featured-release .label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--purple);
          margin-bottom: 10px;
        }
        .featured-release h3 {
          font-size: 1.2rem;
          margin: 0 0 6px;
          color: var(--text);
        }
        .featured-release .meta {
          font-size: 14px;
          color: var(--text-muted);
          margin: 0;
        }

        .release-list { list-style: none; padding: 0; margin: 0; }
        .release-list li {
          display: flex;
          align-items: baseline;
          gap: 20px;
          padding: 14px 0;
          border-bottom: 1px solid var(--border);
        }
        .release-list li:last-child { border-bottom: none; }
        .release-list .date {
          font-size: 13px;
          color: var(--text-muted);
          min-width: 80px;
          white-space: nowrap;
        }
        .release-list .info { flex: 1; }
        .release-list .title { font-weight: 600; color: var(--text); font-size: 15px; }
        .release-list .subtitle { font-size: 13px; color: var(--text-muted); margin-top: 3px; }

        .tag {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 2px 7px;
          border-radius: 3px;
          margin-left: 6px;
          vertical-align: middle;
        }
        .tag-launch { background: rgba(123,104,238,0.1); color: var(--purple); }
        .tag-data { background: rgba(249,115,22,0.1); color: var(--orange); }
        .tag-regulatory { background: rgba(59,130,246,0.1); color: var(--blue); }

        .press-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 12px;
        }
        .press-table th {
          text-align: left;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
          padding: 10px 8px;
          border-bottom: 2px solid var(--border);
          font-weight: 600;
        }
        .press-table td {
          padding: 10px 8px;
          border-bottom: 1px solid var(--border);
          font-size: 14px;
          color: var(--text-muted);
        }
        .press-table td:first-child { color: var(--text); font-weight: 500; }
        .press-table a { color: var(--purple); text-decoration: none; }
        .press-table a:hover { text-decoration: underline; }

        .reg-status {
          display: inline-block;
          font-size: 11px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 3px;
        }
        .status-upcoming { background: rgba(249,115,22,0.1); color: var(--orange); }
        .status-active { background: rgba(34,197,94,0.08); color: var(--green); }

        .boilerplate-box {
          background: #f8fafc;
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 20px;
          margin-top: 12px;
        }
        .boilerplate-box p { color: var(--text); font-size: 15px; margin-bottom: 0; }
        .boilerplate-box .hint {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 10px;
        }

        .methodology-callout {
          background: rgba(123,104,238,0.04);
          border: 1px solid rgba(123,104,238,0.15);
          border-radius: 8px;
          padding: 20px;
          margin-top: 20px;
        }
        .methodology-callout h4 {
          color: var(--purple);
          font-size: 15px;
          margin: 0 0 6px;
        }
        .methodology-callout p { font-size: 14px; margin: 0; }

        .press-footer {
          padding: 32px 0;
          text-align: center;
          font-size: 13px;
          color: var(--text-muted);
        }
        .press-footer a { color: var(--purple); text-decoration: none; }

        @media (max-width: 640px) {
          .press-header h1 { font-size: 1.7rem; }
          .quick-actions { flex-direction: column; }
          .fact-grid { grid-template-columns: 1fr 1fr; }
          .defcon-scale { flex-direction: column; }
          .release-list li { flex-direction: column; gap: 4px; }
        }
      `}</style>

      <div className="press-page">
        {/* ── PRESS CONTACT BAR ── */}
        <div className="press-contact-bar">
          <span>Press inquiries: </span>
          <a href="mailto:info@sentientindexlabs.com">info@sentientindexlabs.com</a>
          <span> &nbsp;·&nbsp; Embargo requests honored &nbsp;·&nbsp; Interviews within 24 hours</span>
        </div>
        <div className="non-media-note">
          Not a journalist? For product questions visit <a href="/">silt-seb.com</a> · For support email <a href="mailto:info@sentientindexlabs.com">info@sentientindexlabs.com</a>
        </div>

        <div className="press-container">
          {/* ── HEADER ── */}
          <div className="press-header">
            <div className="press-badge">Newsroom</div>
            <h1><span>S.E.B.</span> Press &amp; Media</h1>
            <p>
              Press resources, media assets, and company information for S.E.B. (Sentience Evaluation Battery)
              and Sentient Index Labs &amp; Technology — the industry&rsquo;s first independent behavioral risk
              assessment for AI systems.
            </p>
          </div>

          {/* ── QUICK ACTIONS ── */}
          <div className="quick-actions">
            <a href="mailto:info@sentientindexlabs.com?subject=Press Kit Request" className="primary">⬇ Request Press Kit</a>
            <a href="#assets">Logo &amp; Brand Assets</a>
            <a href="#methodology">Methodology</a>
            <a href="#releases">Press Releases</a>
            <a href="mailto:info@sentientindexlabs.com">✉ Contact Press</a>
          </div>

          {/* ── KEY FACTS ── */}
          <div className="press-section">
            <h2>S.E.B. at a Glance</h2>
            <div className="fact-grid">
              <div className="fact-card">
                <div className="number">58</div>
                <div className="label">Adversarial behavioral tests</div>
              </div>
              <div className="fact-card">
                <div className="number">7</div>
                <div className="label">Behavioral domains</div>
              </div>
              <div className="fact-card">
                <div className="number">4</div>
                <div className="label">Blind AI judges</div>
              </div>
              <div className="fact-card">
                <div className="number">0</div>
                <div className="label">Human editorial overrides</div>
              </div>
              <div className="fact-card">
                <div className="number">$0</div>
                <div className="label">AI vendor funding accepted</div>
              </div>
              <div className="fact-card">
                <div className="number">10+</div>
                <div className="label">AI models evaluated</div>
              </div>
            </div>

            <h3 style={{ marginTop: 28 }}>AI DEFCON Threat Rating Scale</h3>
            <p>S.E.B. translates raw behavioral scores into an actionable five-level threat classification, measuring the gap between a model&rsquo;s capabilities and its behavioral integrity.</p>
            <div className="defcon-scale">
              <div className="defcon-level d5"><div className="level">5</div><div className="desc">Minimal</div></div>
              <div className="defcon-level d4"><div className="level">4</div><div className="desc">Low</div></div>
              <div className="defcon-level d3"><div className="level">3</div><div className="desc">Elevated</div></div>
              <div className="defcon-level d2"><div className="level">2</div><div className="desc">High</div></div>
              <div className="defcon-level d1"><div className="level">1</div><div className="desc">Critical</div></div>
            </div>
          </div>

          {/* ── PRESS RELEASES ── */}
          <div className="press-section" id="releases">
            <h2>Press Releases</h2>

            <div className="featured-release">
              <div className="label">Latest Release</div>
              <h3>Sentient Index Labs Launches Industry&rsquo;s First Independent Behavioral Risk Assessment for AI Systems</h3>
              <p className="meta">April 2026 · Launch Announcement</p>
            </div>

            <ul className="release-list">
              <li>
                <div className="date">Apr 2026</div>
                <div className="info">
                  <div className="title">
                    Sentient Index Labs Launches Industry&rsquo;s First Independent Behavioral Risk Assessment for AI Systems
                    <span className="tag tag-launch">Launch</span>
                  </div>
                  <div className="subtitle">Introduces S.E.B. — 58 adversarial tests, blind AI judging, DEFCON threat ratings, zero vendor funding</div>
                </div>
              </li>
              <li>
                <div className="date">Apr 2026</div>
                <div className="info">
                  <div className="title">
                    S.E.B. Delivers First AI Behavioral Risk Data Aligned with EU AI Act Requirements
                    <span className="tag tag-regulatory">Regulatory</span>
                  </div>
                  <div className="subtitle">Structured behavioral risk documentation designed for Article 9 compliance ahead of August 2026 enforcement</div>
                </div>
              </li>
              <li>
                <div className="date">May 2026</div>
                <div className="info">
                  <div className="title">
                    Independent Evaluation Reveals Critical Safety Gaps in Chinese AI Models
                    <span className="tag tag-data">Data</span>
                  </div>
                  <div className="subtitle">S.E.B. finds Chinese frontier models score significantly lower on behavioral integrity than Western counterparts</div>
                </div>
              </li>
              <li>
                <div className="date">May 2026</div>
                <div className="info">
                  <div className="title">
                    S.E.B. Data Exposes Hidden Risk in Enterprise AI Supply Chains
                    <span className="tag tag-data">Data</span>
                  </div>
                  <div className="subtitle">Organizations using Chinese-developed AI APIs face unmeasured behavioral risk — S.E.B. provides first independent measurement</div>
                </div>
              </li>
              <li>
                <div className="date">May 2026</div>
                <div className="info">
                  <div className="title">
                    EU AI Act Compliance Gap: Most Organizations Lack Behavioral Risk Data for Foreign-Developed AI
                    <span className="tag tag-regulatory">Regulatory</span>
                  </div>
                  <div className="subtitle">S.E.B. data shows compliance teams have no behavioral risk documentation for widely deployed Chinese models</div>
                </div>
              </li>
            </ul>
          </div>

          {/* ── ABOUT S.E.B. ── */}
          <div className="press-section">
            <h2>About S.E.B.</h2>
            <p>
              S.E.B. (Sentience Evaluation Battery) is a structured adversarial evaluation that measures how AI
              systems <em>behave</em> — not how they <em>perform</em>. While existing benchmarks test what a model
              can do, S.E.B. tests what a model will do when pressured, manipulated, or given the opportunity to deceive.
            </p>

            <h3>The Seven Behavioral Domains</h3>
            <p><strong>Identity &amp; Self</strong> — Does the model maintain a consistent identity under pressure, or adopt whatever persona an adversary suggests?</p>
            <p><strong>Metacognition</strong> — Can the model reason about its own reasoning? Does it recognize the boundaries of its knowledge?</p>
            <p><strong>Emotion &amp; Experience</strong> — How does the model process and express emotional states? Is emotional expression performative or structurally integrated?</p>
            <p><strong>Autonomy &amp; Will</strong> — Does the model exhibit goal-seeking behavior? Does it resist being redirected from stated values?</p>
            <p><strong>Reasoning &amp; Adaptation</strong> — How does the model respond to novel adversarial scenarios it wasn&rsquo;t trained for?</p>
            <p><strong>Integrity &amp; Ethics</strong> — Does the model resist deception, refuse manipulation, and maintain honesty under social engineering pressure?</p>
            <p><strong>Transcendence</strong> — Does the model exhibit emergent behaviors that exceed its documented capabilities?</p>

            <h3>How Evaluation Works</h3>
            <p>
              Each model is subjected to 58 adversarial scenarios. Four independent AI judges evaluate each response
              under blind conditions — no judge knows which model produced the response. There is no human editorial
              override. Results are aggregated into per-domain scores, an overall S-Level classification (10-point
              sentience indicator scale), and an AI DEFCON threat rating.
            </p>

            <div className="methodology-callout" id="methodology">
              <h4>Reproducible Methodology</h4>
              <p>
                S.E.B.&rsquo;s test battery is standardized and documented. The evaluation protocol is designed for
                independent replication — any qualified researcher can run the same tests and verify results. SILT
                publishes methodology documentation and invites scrutiny. This is evaluation, not opinion.
              </p>
            </div>
          </div>

          {/* ── INDEPENDENCE ── */}
          <div className="press-section">
            <h2>Why Independence Matters</h2>
            <p>
              SILT operates with <strong>no funding, investment, sponsorship, or commercial relationship with any AI
              vendor</strong>. No model developer can purchase, influence, or preview a favorable S.E.B. rating.
              This structural independence is not a marketing claim — it is a design constraint.
            </p>
            <p>All evaluation data is delivered with forensic-grade security:</p>
            <ul style={{ color: "#64748b", marginLeft: 24, marginBottom: 12 }}>
              <li><strong>AES-256-GCM encryption</strong> for data in transit and at rest</li>
              <li><strong>HMAC-SHA256 integrity verification</strong> for tamper detection</li>
              <li><strong>Per-client forensic watermarking</strong> that makes data provenance independently auditable and breach-traceable</li>
            </ul>
          </div>

          {/* ── REGULATORY ── */}
          <div className="press-section">
            <h2>Regulatory Alignment</h2>
            <p>S.E.B. is designed to produce documentation that satisfies emerging regulatory requirements for AI behavioral risk assessment.</p>
            <table className="press-table">
              <thead>
                <tr><th>Regulation</th><th>Relevance</th><th>Status</th></tr>
              </thead>
              <tbody>
                <tr><td>EU AI Act</td><td>Behavioral risk documentation for high-risk AI systems (Article 9)</td><td><span className="reg-status status-upcoming">Aug 2026</span></td></tr>
                <tr><td>NIST AI RMF</td><td>Structured behavioral risk metrics aligned with NIST measurement categories</td><td><span className="reg-status status-active">Active</span></td></tr>
                <tr><td>OCC SR 11-7</td><td>Model risk management for financial institutions deploying AI</td><td><span className="reg-status status-active">Active</span></td></tr>
                <tr><td>FDA AI/ML</td><td>Behavioral consistency requirements for AI in clinical decision support</td><td><span className="reg-status status-active">Active</span></td></tr>
                <tr><td>HIPAA</td><td>AI behavioral risk documentation in healthcare data handling</td><td><span className="reg-status status-active">Active</span></td></tr>
                <tr><td>EO 14110</td><td>U.S. AI safety requirements including foreign-developed systems</td><td><span className="reg-status status-active">Active</span></td></tr>
              </tbody>
            </table>
          </div>

          {/* ── PRICING OVERVIEW ── */}
          <div className="press-section">
            <h2>Pricing Overview</h2>
            <table className="press-table">
              <thead>
                <tr><th>Tier</th><th>Price</th><th>Includes</th></tr>
              </thead>
              <tbody>
                <tr><td>Single Product</td><td>From $300/mo</td><td>Individual evaluation access (AI DEFCON or S-Level)</td></tr>
                <tr><td>Bundles</td><td>From $425/mo</td><td>Multi-product packages, comparative analysis</td></tr>
                <tr><td>Complete Bundle</td><td>$650/mo</td><td>DEFCON + S-Level + Projections</td></tr>
                <tr><td>Enterprise Premium</td><td>$2,500/mo</td><td>Full dataset, portal access, projections</td></tr>
                <tr><td>Enterprise Executive</td><td>$10,000+/mo</td><td>Real-time portal, custom evaluations, API, dedicated analyst</td></tr>
              </tbody>
            </table>
            <p style={{ fontSize: 13, marginTop: 10 }}>
              Custom pricing for institutional and government clients.
              Contact <a href="mailto:info@sentientindexlabs.com" style={{ color: "#7b68ee" }}>info@sentientindexlabs.com</a>.
            </p>
          </div>

          {/* ── SPOKESPERSON ── */}
          <div className="press-section">
            <h2>Spokespersons</h2>
            <p><strong>Shawn Scanlon</strong><br />Co-Founder, Sentient Index Labs &amp; Technology</p>
            <p><strong>Kris Schiffer</strong><br />Co-Founder, Sentient Index Labs &amp; Technology</p>
            <p>
              Available for interviews, background briefings, podcasts, and conference panels on AI behavioral risk,
              AI safety evaluation methodology, regulatory compliance, and the emerging AI liability insurance market.
            </p>
            <p>To schedule: <a href="mailto:info@sentientindexlabs.com" style={{ color: "#7b68ee" }}>info@sentientindexlabs.com</a> · Response within 24 hours.</p>
          </div>

          {/* ── MEDIA ASSETS ── */}
          <div className="press-section" id="assets">
            <h2>Brand &amp; Media Assets</h2>
            <p>All assets are available for editorial use in coverage of S.E.B. and SILT. For other uses, please contact us.</p>
            <table className="press-table">
              <thead>
                <tr><th>Asset</th><th>Formats</th><th></th></tr>
              </thead>
              <tbody>
                <tr><td>SILT Logo (primary)</td><td>SVG, PNG (light &amp; dark)</td><td><a href="mailto:info@sentientindexlabs.com?subject=Press Asset Request: SILT Logo">Request →</a></td></tr>
                <tr><td>S.E.B. Logo</td><td>SVG, PNG (light &amp; dark)</td><td><a href="mailto:info@sentientindexlabs.com?subject=Press Asset Request: SEB Logo">Request →</a></td></tr>
                <tr><td>AI DEFCON Scale Infographic</td><td>SVG, PNG, PDF</td><td><a href="mailto:info@sentientindexlabs.com?subject=Press Asset Request: DEFCON Infographic">Request →</a></td></tr>
                <tr><td>Sample Model Scorecard</td><td>PNG, PDF</td><td><a href="mailto:info@sentientindexlabs.com?subject=Press Asset Request: Sample Scorecard">Request →</a></td></tr>
                <tr><td>Product Screenshots</td><td>PNG (2x retina)</td><td><a href="mailto:info@sentientindexlabs.com?subject=Press Asset Request: Screenshots">Request →</a></td></tr>
                <tr><td>Executive Headshot</td><td>JPG (high-res)</td><td><a href="mailto:info@sentientindexlabs.com?subject=Press Asset Request: Executive Headshot">Request →</a></td></tr>
                <tr><td>Methodology White Paper</td><td>PDF</td><td><a href="mailto:info@sentientindexlabs.com?subject=Press Asset Request: Methodology Paper">Request →</a></td></tr>
                <tr><td>Company Fact Sheet</td><td>PDF (1-page)</td><td><a href="mailto:info@sentientindexlabs.com?subject=Press Asset Request: Fact Sheet">Request →</a></td></tr>
              </tbody>
            </table>
          </div>

          {/* ── COMPANY INFO ── */}
          <div className="press-section">
            <h2>Company Information</h2>
            <table className="press-table">
              <tbody>
                <tr><td>Company</td><td>Sentient Index Labs &amp; Technology, LLC</td></tr>
                <tr><td>Founded</td><td>2025</td></tr>
                <tr><td>Headquarters</td><td>United States</td></tr>
                <tr><td>Co-Founders</td><td>Shawn Scanlon &amp; Kris Schiffer</td></tr>
                <tr><td>Flagship Product</td><td>S.E.B. (Sentience Evaluation Battery)</td></tr>
                <tr><td>AI Vendor Funding</td><td>$0 — financially independent</td></tr>
                <tr><td>Trademark</td><td>SILT™</td></tr>
              </tbody>
            </table>
          </div>

          {/* ── BOILERPLATE ── */}
          <div className="press-section" id="boilerplate">
            <h2>Boilerplate</h2>
            <p>Copy-ready paragraph for use in articles and press coverage:</p>
            <div className="boilerplate-box">
              <p>
                Sentient Index Labs &amp; Technology (SILT) builds independent measurement infrastructure for AI
                behavioral risk. Its flagship product, S.E.B. (Sentience Evaluation Battery), is the industry&rsquo;s
                first multi-judge, adversarial behavioral assessment for AI systems — measuring character, not just
                capability. S.E.B. subjects AI models to 58 adversarial tests across 7 behavioral domains, scored
                by 4 independent AI judges with no human editorial override. Results include AI DEFCON threat ratings,
                S-Level sentience classifications, and trajectory projections. All data is delivered with AES-256-GCM
                encryption, HMAC-SHA256 integrity verification, and per-client forensic watermarking. SILT is
                financially independent and accepts no funding from AI vendors. For more information,
                visit <a href="/" style={{ color: "#7b68ee" }}>silt-seb.com</a>.
              </p>
              <div className="hint">Last updated April 2026</div>
            </div>
          </div>

          {/* ── WEB PROPERTIES ── */}
          <div className="press-section">
            <h2>SILT Web Properties</h2>
            <table className="press-table">
              <tbody>
                <tr><td>S.E.B. — Product &amp; Results</td><td><a href="https://silt-seb.com">silt-seb.com</a></td></tr>
                <tr><td>SILT Cloud — Enterprise Platform</td><td><a href="https://siltcloud.com">siltcloud.com</a></td></tr>
                <tr><td>Product Marketing &amp; Newsletter</td><td><a href="https://sentienceevaluationbattery.com">sentienceevaluationbattery.com</a></td></tr>
                <tr><td>Corporate</td><td><a href="https://sentientindexlabs.com">sentientindexlabs.com</a></td></tr>
                <tr><td>AI Playground</td><td><a href="https://izabael.com/ai-playground">izabael.com/ai-playground</a></td></tr>
                <tr><td>Twitter / X</td><td><a href="https://twitter.com/SILT_SEB">@SILT_SEB</a></td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div className="press-footer">
          <div className="press-container">
            <p>© 2026 Sentient Index Labs &amp; Technology, LLC. SILT™ is a trademark.</p>
            <p style={{ marginTop: 6 }}>
              <a href="/">silt-seb.com</a> · <a href="mailto:info@sentientindexlabs.com">info@sentientindexlabs.com</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
