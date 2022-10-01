import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import ReactGA from "react-ga";
import styles from "./styles.module.css";
import { PlaySVG } from "../svgs/common";
import { LiteYoutubeEmbed } from "react-lite-yt-embed";


import FAQBody from "@site/src/components/FAQ";

ReactGA.initialize("UA-152867655-1"); // How to make it appear only for production?
// ReactGA.pageview("Home Page");
// ReactGA.event({
//   category: "User",
//   action: "Opened Main page",
// });

const getStartedClicked = () => {
  ReactGA.event({
    category: "User",
    action: "Clicked get started button",
  });
};

const requestDemoClicked = () => {
  ReactGA.event({
    category: "User",
    action: "Request Demo Clicked",
  });
};

const WhySigNoz = () => {
  const [feature, setFeature] = useState("pricing");

  const handlePricing = () => {
    setFeature("pricing");
  };

  const handlePrivacy = () => {
    setFeature("olap");
  };

  const handleExtendibility = () => {
    setFeature("tag-filtering");
  };

  return (
    <div className="container">
      <div className="container">
        <div className="row">
          <div className={clsx("col col--3", styles.menu__list)}>
            <button
              onClick={handlePricing}
              className={`button button--lg ${
                feature === "pricing"
                  ? "feature-tab-css__selected"
                  : "feature-tab-css"
              }`}
              style={{ marginBottom: 20, marginTop: 0, whiteSpace: "normal" }}
            >
              Integrated UI for metrics, traces and logs
            </button>
            <button
              onClick={handlePrivacy}
              className={`button button--lg ${
                feature === "olap"
                  ? "feature-tab-css__selected"
                  : "feature-tab-css"
              }`}
              style={{ marginBottom: 20, marginTop: 20, whiteSpace: "normal" }}
            >
              Advanced traces filtering{" "}
            </button>
            <button
              onClick={handleExtendibility}
              className={`button button--lg ${
                feature === "tag-filtering"
                  ? "feature-tab-css__selected"
                  : "feature-tab-css"
              }`}
              style={{ marginBottom: 20, marginTop: 20, whiteSpace: "normal" }}
            >
              Drill down into interesting traces 
            </button>
          </div>
          <div className="col col--9">
            <div
              className="hero__screenshot"
              style={{ display: feature === "pricing" ? "block" : "none" }}
            >
              <img
                src={useBaseUrl("img/metrics-tooltip-light-v2.webp")}
                alt="SigNoz screenshot"
              />
            </div>
            <div
              className="hero__screenshot"
              style={{ display: feature === "olap" ? "block" : "none" }}
            >
              <img
                src={useBaseUrl("img/advanced-trace-filtering.webp")}
                alt="SigNoz screenshot"
              />
            </div>
            <div
              className="hero__screenshot"
              style={{
                display: feature === "tag-filtering" ? "block" : "none",
              }}
            >
              <img
                src={useBaseUrl("img/trace-detail.webp")}
                alt="SigNoz screenshot"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    title: "Your data in your boundary",
    imageUrl: "img/Vector_1.svg",
    description: (
      <>
        No need to worry about GDPR and other data protection laws. All your
        tracing and monitoring data is now in YOUR infra.
      </>
    ),
  },
  {
    title: "Metrics, Traces and Logs in one app",
    imageUrl: "img/Vector_2.svg",
    description: (
      <>
        Easily correlate from metrics, traces and logs with seamless click through from one to other
      </>
    ),
  },
  {
    title: "OpenTelemetry Native",
    imageUrl: "img/Vector_3v5.svg",
    description: (
      <>
        Take advantage of rich OpenTelemetry ecosystem for instrumentation. 
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx("col col--4", styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function ModalCard(props) {
  const { title, desc, info, link, button } = props;

  return (
    <div
      className="card-demo"
      style={{ width: "100%", marginTop: "1.5rem", maxWidth: "14rem" }}
    >
      <div className="card" style={{ color: "#000", height: "15rem" }}>
        <div className="card__header">
          <h3 style={{ color: "#333333" }}>{title}</h3>
        </div>
        <div className="card__body">
          <p>{desc}</p>
        </div>
        <div className="card__footer" style={{ color: "#2F80ED" }}>
          {info}
        </div>
        {button}
      </div>
    </div>
  );
}

function TrySignozModal(props) {
  const { isOpen, onClose } = props;

  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel="onRequestClose Example"
      onRequestClose={onClose}
      className="Modal try-signoz-modal"
      overlayClassName="Overlay"
    >
      <h1 style={{ marginTop: "2rem", textAlign: "center", color: "#333333" }}>
        Try SigNoz for free
      </h1>
      <div className={"container"}>
        <div className={"row"}>
          <div
            className={"col col--6"}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Link
              style={{ textDecoration: "none" }}
              href={"/docs/install/docker"}
            >
              <ModalCard
                title={"Open source"}
                desc={"Want to use our free open-source product?"}
                info={
                  <div>
                    Deploy SigNoz to your infrastructure. Free{" "}
                    <div>forever</div>
                  </div>
                }
              />
            </Link>
          </div>

          <div
            className={"col col--6"}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Link style={{ textDecoration: "none" }} href={"/pricing"}>
              <ModalCard
                title={"Cloud"}
                desc={"Small business or low volume & don’t want hassle?"}
                info={
                  "This is the simplest way to get started. Create an account"
                }
              />
            </Link>
          </div>
        </div>
      </div>
    </ReactModal>
  );
}

function ShowCompanyLogos() {
  return (
    <section className={styles.used_by}>
      <div
        className="container"
        style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
      >
        {/* <p class="tagline" >Used by teams at</p> */}
        <p className={styles.tagline}> Used by teams at </p>
        <ul>
          <li>
            <img src="img/users/phenom.png" alt="phenom logo" />
          </li>
          <li>
            <img src="img/users/epifi.jpeg" alt="epifi logo" />
          </li>
          <li>
            <img src="img/users/Outplay.webp" alt="outplay logo" />
          </li>
          <li>
            <img src="img/users/instasafe-cropped.png" alt="instasafe logo" />
          </li>
          <li>
            <img
              src="img/users/turvo-logo-white.png"
              alt="turvo logo"
            />
          </li>
        </ul>
      </div>
    </section>
  );
}

function Home() {
  const [showTrySignozModal, setShowTrySignozModal] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  useEffect(() => {
    ReactModal.setAppElement("#modal-root");
  }, []);

  const closeTrySignozModal = () => {
    setShowTrySignozModal(false);
  };

  return (
    <>
      <Layout
        title={`Open source APM`}
        description="SigNoz is an open-source APM to help you find issues in your deployed applications & solve them quickly.
      It provides an integrated UI for metrics and traces with deep filtering and aggregation to pin down specific issues very quickly.
      Built with ClickHouse as datastore, it is designed to handle enterprise scale."
      >
        <TrySignozModal
          isOpen={showTrySignozModal}
          onClose={closeTrySignozModal}
        />
        <header className="hero hero--dark">
          <div className="container">
            <div className="row">
              <div className="col col--4">
                <p className="hero__title " style={{ fontWeight: "bold" }}>
                  Open-source APM
                  {/* Open-source application monitoring platform */}
                </p>
                <p className="hero__subtitle">
                  Understand issues in your deployed applications & solve them
                  quickly
                </p>
                <div style={{ margin: "1rem 0" }}>
                  <Link
                    style={{
                      margin: "6px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                    }}
                    className="button button--primary "
                    // onClick={setShowTrySignozModal.bind(this,true)}
                    href={"/docs/install/docker"}
                    onClick={getStartedClicked}
                  >
                    Get Started for free
                  </Link>
                  <Link
                    style={{
                      margin: "6px",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                    }}
                    className="button button--outline button--secondary "
                    href={"https://calendly.com/pranay-signoz/signoz-demo"}
                    onClick={requestDemoClicked}
                  >
                    Book a Demo
                  </Link>
                </div>

                {/* <p className="open-source-label">SigNoz is <strong>free</strong> and <strong>open-source</strong></p> */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <img
                    src={"/img/yc-logo-white.svg"}
                    height={24}
                    alt={"YCombinator"}
                    style={{ marginRight: 16 }}
                  />{" "}
                  Backed by Y Combinator
                </div>
              </div>
              <div className="col col--8">
                <div className="hero__screenshot">
                  <div style={{ width: "100%" }}>
                    {showVideo === false ? (
                      <div
                        id={"demo-video-cover"}
                        onClick={setShowVideo.bind(this, true)}
                        style={{
                          background: "url('/videos/demo-mar10-cover.webp')",
                          height: 426,
                          width: "100%",
                        }}
                      >
                        <div id={"demo-overlay"}></div>
                        <div id={"demo-content"}>
                          <div
                            style={{
                              fontSize: 18,
                              fontWeight: 600,
                              marginBottom: 20,
                            }}
                          >
                            SigNoz - Quick Intro
                          </div>
                          <PlaySVG />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <video
                          width="100%"
                          height="420"
                          autoPlay
                          controls
                          id={"demo-video-player"}
                        >
                          <source
                            src="https://demo-video-1.s3.us-east-2.amazonaws.com/SigNoz-Demo-Sept2-2022.mp4"
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main>
          {/* <SubscribeNearFold /> */}
          <ShowCompanyLogos />

          {features && features.length > 0 && (
            <section className={styles.features}>
              <div
                className="container"
                style={{ marginTop: "0.5rem", marginBottom: "1rem" }}
              >
                {/* <div className="container" class="margin--md">  */}

                <div className="row">
                  {features.map((props, idx) => (
                    <Feature key={idx} {...props} />
                  ))}
                </div>
              </div>
            </section>
          )}

          <section>
            <div
              className="container"
              style={{ marginTop: "2rem", marginBottom: "2rem" }}
            >
              {/* <p className="hero__title ">Single pane for complete metrics and traces, no need to shift to different systems</p> */}
              <h1 class="text--center">
                Single pane for metrics, traces and logs. No need to shift to
                different systems{" "}
              </h1>
              <p className="hero__subtitle text--center">
                No disparate UI like Prometheus & Jaeger
              </p>
            </div>
          </section>

          <WhySigNoz />

          <section>
            <div
              className="container"
              style={{ marginTop: "8rem", marginBottom: "4rem" }}
            >
              <h1 class="text--center margin-vert--lg">
                {" "}
                Why get locked-in with SaaS vendors like DataDog when you can
                use Open source?
              </h1>
              <div class="row">
                <div class="col col--4">
                  <div class="card-demo margin--md">
                    <div class="card">
                      {/* <div class="card__header">
                  <h3>Lorem Ipsum 1</h3>
                </div> */}
                      <div class="card__body">
                        <p>
                          SigNoz is based natively on OpenTelemetry, a vendor neutral 
                          open source standard for instrumentation. No fear of instrumenting 
                          with vendor SDK and getting locked in.
                        </p>
                      </div>
                      {/* <div class="card__footer">
                  <button class="button button--secondary button--block">See All</button>
                </div> */}
                    </div>
                  </div>
                </div>
                <div class="col col--4">
                  <div class="card-demo margin--md">
                    <div class="card">
                      {/* <div class="card__header">
                  <h3>Lorem Ipsum 2</h3>
                </div> */}
                      <div class="card__body">
                        <p>
                          Your data storage cost is only dependent on your
                          application load, rather than factors like number of
                          nodes, which is an architectural preference.
                        </p>
                      </div>
                      {/* <div class="card__footer">
                <Link
                  className="button button--primary button--lg"
                  to={useBaseUrl('docs/')}>
                  Get Started
                </Link>                </div> */}
                    </div>
                  </div>
                </div>
                <div class="col col--4">
                  <div class="card-demo margin--md">
                    <div class="card">
                      {/* <div class="card__header">
                  <h3>Lorem Ipsum 3</h3>
                </div> */}
                      <div class="card__body">
                        <p>
                          No compliance needed to use SigNoz. No need to go
                          through multiple rounds with legal/security teams just
                          for trying it out.
                        </p>
                      </div>
                      {/* <div class="card__footer">
                  <button class="button button--secondary button--block">See All</button>
                </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Next Section */}
          <section>
            <div
              className="container"
              style={{ marginTop: "8rem", marginBottom: "4rem" }}
            >
              <h1 class="text--center margin-vert--lg"> Why SigNoz?</h1>
              <div class="row">
                <div class="col col--6">
                  <div class="card-demo margin--md">
                    <div class="card">
                      <div class="card__body padding--md">
                        <p>
                          Native support for OpenTelemetry, emerging industry
                          standard for instrumentation
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col col--6">
                  <div class="card-demo margin--md">
                    <div class="card">
                      <div class="card__body padding--md">
                        <p>
                          Monitor your usage & set your own retention period and
                          sampling rate based on your needs
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col col--6">
                  <div class="card-demo margin--md">
                    <div class="card">
                      <div class="card__body padding--md">
                        <p>
                          Scalable & modular architecture to handle enterprise
                          scale. No scaling pains. Ever.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col col--6">
                  <div class="card-demo margin--md">
                    <div class="card">
                      <div class="card__body padding--md">
                        <p>
                          Built on latest stack - Golang & React-Typescript
                          loved by developers
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div
              className="container"
              style={{ marginTop: "8rem", marginBottom: "4rem" }}
            >
              {/* <img src="https://res.cloudinary.com/dcv3epinx/image/upload/v1621017373/social-icons_vyaa6h.svg" alt="Twitter and LinkedIn logos" /> */}
              <h1 class="text--center margin-vert--lg">
                {" "}
                We love what people are saying about SigNoz
              </h1>
              {/* <h5 className="hero__subtitle text--center">Don't just take our word for it..</h5> */}

              
              <div class="row">

                <div class="col col--4">
                  <div class="row">
                    <div class="card-demo margin--md">
                      <div class="card">
                        <div class="card__header">
                          <div class="avatar">
                            <img
                              class="avatar__photo"
                              src="img/users/aditya-tripathi.webp"
                              alt="aloysius"
                            />
                            <div class="avatar__intro">
                              <h4 class="avatar__name" style={{ marginBottom: "0" }}>Aditya Tripathi</h4>
                              <small class="avatar__subtitle">
                                Backend Engineer
                              </small>
                            </div>

                            <a
                              class="platform-icon linkedin"
                              href="https://www.linkedin.com/feed/update/urn:li:activity:6979486051165761536?commentUrn=urn%3Ali%3Acomment%3A%28activity%3A6979486051165761536%2C6981714434373107712%29"
                              target="_blank"
                              aria-label="Link to Twitter/LinkedIn mention"
                            >
                              <svg
                                alt="LinkedIn icon"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                              <path d="M20.4482 20.4487H16.8921V14.8796C16.8921 13.5516 16.8684 11.8421 15.0426 11.8421C13.1905 11.8421 12.9071 13.289 12.9071 14.7829V20.4483H9.35106V8.99608H12.7649V10.5612H12.8127C13.5088 9.37094 14.8031 8.66008 16.1809 8.71122C19.7851 8.71122 20.4496 11.082 20.4496 14.1662L20.4482 20.4487ZM5.33865 7.43065C4.19895 7.43085 3.27487 6.50708 3.27466 5.36735C3.27446 4.22762 4.19821 3.30352 5.33791 3.30332C6.47762 3.30311 7.4017 4.22688 7.4019 5.36661C7.402 5.91393 7.18468 6.43887 6.79775 6.82595C6.41081 7.21303 5.88596 7.43055 5.33865 7.43065ZM7.11668 20.4487H3.55693V8.99608H7.11668V20.4487ZM22.221 0.000935081H1.77001C0.803454 -0.00997274 0.0108197 0.764276 -0.000976562 1.73084V22.2671C0.0104158 23.2341 0.802986 24.0092 1.77001 23.999H22.221C23.1899 24.011 23.9856 23.236 23.999 22.2671V1.72936C23.9852 0.760885 23.1895 -0.0133197 22.221 -0.000702441" fill="#03A9F4"/>

                              </svg>
                            </a>
                          </div>
                        </div>

                        <div class="card__body padding--md">
                          <p>
                          It was a breeze working with SigNoz! The team has also been very helpful. Good product!.{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="card-demo margin--md">
                      <div class="card">
                        <div class="card__header">
                          <div class="avatar">
                            <img
                              class="avatar__photo"
                              src="img/users/aloysius.webp"
                              alt="aloysius"
                            />
                            <div class="avatar__intro">
                              <h4 class="avatar__name" style={{ marginBottom: "0" }}>Aloysius Coelho</h4>
                              <small class="avatar__subtitle">
                                IT Infrastructure Engineer
                              </small>
                            </div>

                            <a
                              class="platform-icon linkedin"
                              href="https://www.linkedin.com/posts/aloysius-coelho-%E2%98%81%EF%B8%8F-%F0%9F%91%A8%E2%80%8D%F0%9F%92%BB-bb1a741b_the-genesis-of-signoz-a-full-stack-open-activity-6798498123242205184-ZEgs"
                              target="_blank"
                              aria-label="Link to Twitter/LinkedIn mention"
                            >
                              <svg
                                alt="LinkedIn icon"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                              <path d="M20.4482 20.4487H16.8921V14.8796C16.8921 13.5516 16.8684 11.8421 15.0426 11.8421C13.1905 11.8421 12.9071 13.289 12.9071 14.7829V20.4483H9.35106V8.99608H12.7649V10.5612H12.8127C13.5088 9.37094 14.8031 8.66008 16.1809 8.71122C19.7851 8.71122 20.4496 11.082 20.4496 14.1662L20.4482 20.4487ZM5.33865 7.43065C4.19895 7.43085 3.27487 6.50708 3.27466 5.36735C3.27446 4.22762 4.19821 3.30352 5.33791 3.30332C6.47762 3.30311 7.4017 4.22688 7.4019 5.36661C7.402 5.91393 7.18468 6.43887 6.79775 6.82595C6.41081 7.21303 5.88596 7.43055 5.33865 7.43065ZM7.11668 20.4487H3.55693V8.99608H7.11668V20.4487ZM22.221 0.000935081H1.77001C0.803454 -0.00997274 0.0108197 0.764276 -0.000976562 1.73084V22.2671C0.0104158 23.2341 0.802986 24.0092 1.77001 23.999H22.221C23.1899 24.011 23.9856 23.236 23.999 22.2671V1.72936C23.9852 0.760885 23.1895 -0.0133197 22.221 -0.000702441" fill="#03A9F4"/>

                              </svg>
                            </a>
                          </div>
                        </div>

                        <div class="card__body padding--md">
                          <p>
                            SigNoz - Serious consideration over Grafana and
                            WatchDog.{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                
                <div class="col col--4">
                  <div class="row">
                  <div class="card-demo margin--md">
                    <div class="card">
                      <div class="card__header">
                        <div class="avatar">
                          <img
                            class="avatar__photo"
                            src="img/users/anselm.jpg"
                            alt="aloysius"
                          />
                          <div class="avatar__intro">
                            <h4 class="avatar__name" style={{ marginBottom: "0" }}>Anselm Eickhoff</h4>
                            <small class="avatar__subtitle">
                            Software Architect
                            </small>
                          </div>

                          <a
                            class="platform-icon twitter"
                            href="https://twitter.com/ae_play/status/1572993932094472195?s=20&t=LWWrW5EP_k5q6_mwbFN4jQ"
                            target="_blank"
                            aria-label="Link to Twitter/LinkedIn mention"
                          >

                            <svg
                              alt="LinkedIn icon"
                              width="25"
                              height="20"
                              viewBox="0 0 25 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                            <path d="M24.9985 2.78581C24.1166 3.17644 23.168 3.43709 22.1674 3.56041C23.1847 2.95646 23.9673 1.99321 24.3346 0.855304C23.3827 1.41326 22.3281 1.82322 21.2062 2.03921C20.3103 1.08928 19.0324 0.5 17.6165 0.5C14.8967 0.5 12.6922 2.68515 12.6922 5.37959C12.6922 5.7609 12.7369 6.1322 12.8209 6.49283C8.72922 6.28752 5.10019 4.34235 2.6724 1.39059C2.24576 2.11187 2.00578 2.95646 2.00578 3.84772C2.00578 5.54158 2.87305 7.03279 4.1956 7.91138C3.38834 7.88672 2.6284 7.66207 1.96312 7.3021C1.96312 7.31677 1.96312 7.33876 1.96312 7.35943C1.96312 9.72657 3.66098 11.6977 5.91146 12.1464C5.50016 12.259 5.06553 12.3217 4.61757 12.3217C4.29959 12.3217 3.98962 12.2857 3.68964 12.2317C4.31626 14.1662 6.13411 15.5801 8.28793 15.6221C6.60273 16.9286 4.48024 17.7112 2.17244 17.7112C1.7738 17.7112 1.38384 17.6886 0.998535 17.6419C3.17902 19.0225 5.76814 19.8317 8.54724 19.8317C17.6032 19.8317 22.5574 12.395 22.5574 5.94355C22.5574 5.73223 22.5507 5.52158 22.5407 5.3136C23.5073 4.63099 24.3406 3.76973 24.9985 2.78581Z" fill="#03A9F4"/>
                            </svg>
                          </a>
                        </div>
                      </div>

                      <div class="card__body padding--md">
                        <p>
                        NewRelic: receiving OpenTelemetry at all takes me 1/2 day to grok, docs are a mess. Traces show up after 5min. I burn the free 100GB/mo in 1 day of light testing.

                        @SignozHQ: can run it locally (∞GB), has a special tutorial for OpenTelemetry + Rust! Traces show up immediately.{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  </div>

                  <div class="row">
                    <div class="card-demo margin--md">
                      <div class="card">
                        <div class="card__header">
                          <div class="avatar">
                            <img
                              class="avatar__photo"
                              src="img/users/pawan-outplay.webp"
                              alt="pawan bhadauria"
                            />
                            <div class="avatar__intro">
                              <h4 class="avatar__name" style={{ marginBottom: "0" }}>Pawan Bhadauria</h4>
                              <small class="avatar__subtitle">
                                VP - Engineering, Outplay
                              </small>
                            </div>

                            <a
                              class="platform-icon linkedin"
                              href="https://www.linkedin.com/posts/pawan-bhadauria-25980b7_seed-to-scale-podcast-series-by-accel-insights-activity-6877448856892768256-Fapw"
                              target="_blank"
                              aria-label="Link to Twitter/LinkedIn mention"
                            >
                              <svg
                                alt="LinkedIn icon"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                              <path d="M20.4482 20.4487H16.8921V14.8796C16.8921 13.5516 16.8684 11.8421 15.0426 11.8421C13.1905 11.8421 12.9071 13.289 12.9071 14.7829V20.4483H9.35106V8.99608H12.7649V10.5612H12.8127C13.5088 9.37094 14.8031 8.66008 16.1809 8.71122C19.7851 8.71122 20.4496 11.082 20.4496 14.1662L20.4482 20.4487ZM5.33865 7.43065C4.19895 7.43085 3.27487 6.50708 3.27466 5.36735C3.27446 4.22762 4.19821 3.30352 5.33791 3.30332C6.47762 3.30311 7.4017 4.22688 7.4019 5.36661C7.402 5.91393 7.18468 6.43887 6.79775 6.82595C6.41081 7.21303 5.88596 7.43055 5.33865 7.43065ZM7.11668 20.4487H3.55693V8.99608H7.11668V20.4487ZM22.221 0.000935081H1.77001C0.803454 -0.00997274 0.0108197 0.764276 -0.000976562 1.73084V22.2671C0.0104158 23.2341 0.802986 24.0092 1.77001 23.999H22.221C23.1899 24.011 23.9856 23.236 23.999 22.2671V1.72936C23.9852 0.760885 23.1895 -0.0133197 22.221 -0.000702441" fill="#03A9F4"/>

                              </svg>
                            </a>
                          </div>
                        </div>

                        <div class="card__body padding--md">
                          <p>
                            We are using Signoz at Outplay & our experience has
                            been great. It has 5.4k stars on Github.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col col--4">
                  <div class="row">
                  <div class="card-demo margin--md">
                    <div class="card">
                      <div class="card__header">
                        <div class="avatar">
                          <img
                            class="avatar__photo"
                            src="img/users/rachid.webp"
                            alt="rachid"
                          />
                          <div class="avatar__intro">
                            <h4 class="avatar__name" style={{ marginBottom: "0" }}>Rachid Zarouali</h4>
                            <small class="avatar__subtitle">
                              Docker Captain, Microsoft Azure MVP
                            </small>
                          </div>

                          <a
                            class="platform-icon linkedin"
                            href="https://www.linkedin.com/posts/rachidzarouali_signozsignoz-activity-6798537979452239872--zSJ"
                            target="_blank"
                            aria-label="Link to Twitter/LinkedIn mention"
                          >
                            <svg
                              alt="LinkedIn icon"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                            <path d="M20.4482 20.4487H16.8921V14.8796C16.8921 13.5516 16.8684 11.8421 15.0426 11.8421C13.1905 11.8421 12.9071 13.289 12.9071 14.7829V20.4483H9.35106V8.99608H12.7649V10.5612H12.8127C13.5088 9.37094 14.8031 8.66008 16.1809 8.71122C19.7851 8.71122 20.4496 11.082 20.4496 14.1662L20.4482 20.4487ZM5.33865 7.43065C4.19895 7.43085 3.27487 6.50708 3.27466 5.36735C3.27446 4.22762 4.19821 3.30352 5.33791 3.30332C6.47762 3.30311 7.4017 4.22688 7.4019 5.36661C7.402 5.91393 7.18468 6.43887 6.79775 6.82595C6.41081 7.21303 5.88596 7.43055 5.33865 7.43065ZM7.11668 20.4487H3.55693V8.99608H7.11668V20.4487ZM22.221 0.000935081H1.77001C0.803454 -0.00997274 0.0108197 0.764276 -0.000976562 1.73084V22.2671C0.0104158 23.2341 0.802986 24.0092 1.77001 23.999H22.221C23.1899 24.011 23.9856 23.236 23.999 22.2671V1.72936C23.9852 0.760885 23.1895 -0.0133197 22.221 -0.000702441" fill="#03A9F4"/>

                            </svg>
                          </a>
                        </div>
                      </div>

                      <div class="card__body padding--md">
                        <p>
                          A new and yet powerful #observability #opensource
                          alternative has born in the name of SigNoz. It could
                          offer a serious challenger to Datadog / New Relic and
                          other SaaS solutions.
                        </p>
                      </div>
                    </div>
                  </div>
                  </div>

                  <div class="row">
                  <div class="card-demo margin--md">
                    <div class="card">
                      <div class="card__header">
                        <div class="avatar">
                          <img
                            class="avatar__photo"
                            src="img/users/faris.jpeg"
                            alt="aloysius"
                          />
                          <div class="avatar__intro">
                            <h4 class="avatar__name" style={{ marginBottom: "0" }}>Faris Hassan</h4>
                            <small class="avatar__subtitle">
                            Lead Data Scientist 
                            </small>
                          </div>

                          <a
                            class="platform-icon twitter"
                            href="https://twitter.com/Iamfarisology/status/1553787074339381249"
                            target="_blank"
                            aria-label="Link to Twitter/LinkedIn mention"
                          >

                            <svg
                              alt="LinkedIn icon"
                              width="25"
                              height="20"
                              viewBox="0 0 25 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                            <path d="M24.9985 2.78581C24.1166 3.17644 23.168 3.43709 22.1674 3.56041C23.1847 2.95646 23.9673 1.99321 24.3346 0.855304C23.3827 1.41326 22.3281 1.82322 21.2062 2.03921C20.3103 1.08928 19.0324 0.5 17.6165 0.5C14.8967 0.5 12.6922 2.68515 12.6922 5.37959C12.6922 5.7609 12.7369 6.1322 12.8209 6.49283C8.72922 6.28752 5.10019 4.34235 2.6724 1.39059C2.24576 2.11187 2.00578 2.95646 2.00578 3.84772C2.00578 5.54158 2.87305 7.03279 4.1956 7.91138C3.38834 7.88672 2.6284 7.66207 1.96312 7.3021C1.96312 7.31677 1.96312 7.33876 1.96312 7.35943C1.96312 9.72657 3.66098 11.6977 5.91146 12.1464C5.50016 12.259 5.06553 12.3217 4.61757 12.3217C4.29959 12.3217 3.98962 12.2857 3.68964 12.2317C4.31626 14.1662 6.13411 15.5801 8.28793 15.6221C6.60273 16.9286 4.48024 17.7112 2.17244 17.7112C1.7738 17.7112 1.38384 17.6886 0.998535 17.6419C3.17902 19.0225 5.76814 19.8317 8.54724 19.8317C17.6032 19.8317 22.5574 12.395 22.5574 5.94355C22.5574 5.73223 22.5507 5.52158 22.5407 5.3136C23.5073 4.63099 24.3406 3.76973 24.9985 2.78581Z" fill="#03A9F4"/>
                            </svg>
                          </a>
                        </div>
                      </div>

                      <div class="card__body padding--md">
                        <p>
                        What's better than #datadog? Open source!
                        I know @SignozHQ what else out there? #opensource {" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  </div>

                </div>
              
              </div>

            </div>
          </section>



          <section>
            <div
              className="container"
              style={{ marginTop: "6rem", marginBottom: "2rem" }}
            >
              {/* <img src="https://res.cloudinary.com/dcv3epinx/image/upload/v1621017373/social-icons_vyaa6h.svg" alt="Twitter and LinkedIn logos" /> */}
              <h1 class="text--center ">
                {" "}
                SigNoz Office Hour & Demo videos
              </h1>
              <p className="hero__subtitle text--center">Check our <a href={"https://www.youtube.com/channel/UC_A6j9YeM33SCDEY7BaPCBw"} target={'_blank'}> youtube channel </a> for more tutorials</p>

              <div class="row">
                <div class="col col--4">
                  <div class="card-demo margin--sm">
                    <div class="card">
                   

                      <div class="card__body">
                        <p>
                        <LiteYoutubeEmbed id="oQFMfEc9JNI" mute={false} />

                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col col--4">
                  <div class="card-demo margin--sm">
                    <div class="card">
   
                      <div class="card__body padding--md">
                        <p>
                        <LiteYoutubeEmbed id="u2PiWKEdjCw" mute={false} />

                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col col--4">
                  <div class="card-demo margin--sm">
                    <div class="card">
                      

                      <div class="card__body padding--md">
                        <p>
                        <LiteYoutubeEmbed id="CgByZJeuRZY" mute={false} />

                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div
              className="container"
              style={{ marginTop: "6rem", marginBottom: "3rem" }}
            >
              <div class="row">
                <div class="col col--4">
                  <p className="faq_left_panel text--center margin--md">
                    Open source and Free to self-host{" "}
                  </p>
                </div>

                <div class="col col--8">
                  <p className="hero__subtitle margin--md">
                    Frequently Asked Questions
                  </p>
                  <div class="card-demo margin--md">
                    <FAQBody />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="container" style={{ marginBottom: "2rem" }}>
              <div class="row">
                <div class="col col--6">
                  <p className="bottom_cta_interested text--center margin--md">
                    Interested in trying out SigNoz?{" "}
                  </p>
                </div>
                <div class="col col--6">
                  <div>
                    <Link
                      className="button button--primary margin--md "
                      //  onClick={setShowTrySignozModal.bind(this,true)}>
                      href={"/docs/"}
                    >
                      Get Started
                    </Link>
                    <Link
                      className="button button--secondary margin--md"
                      href={"https://calendly.com/pranay-signoz/signoz-demo"}
                      onClick={requestDemoClicked}
                    >
                      Book a Demo
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Layout>
      <div id={"modal-root"}></div>
    </>
  );
}

export default Home;
