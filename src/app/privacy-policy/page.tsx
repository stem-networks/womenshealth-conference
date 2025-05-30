"use client";

import React from "react";
import Link from "next/link";
import { useAppData } from "../../context/AppDataContext";

const PrivacyPolicy = () => {
  const { general } = useAppData();
  return (
    <div>
      {/* <Head>
                <title>{privacy_policy ? privacy_policy[0]?.title : ''}</title>
                <meta name="description" content={privacy_policy ? privacy_policy[0]?.content : ''} />
                <meta name="keywords" content={privacy_policy ? privacy_policy[0]?.meta_keywords : ''} />
                <link rel="canonical" href={canonicalUrl} />
            </Head> */}
      <div className="brand_wrap">
        <div className="auto-container">
          <div className="row">
            <div className="col-md-12">
              <Link href="/" title="Navigate to Homepage">
                Home
              </Link>{" "}
              <i className="fa fa-angle-right"></i>
              <span>Privacy Policy</span>
            </div>
          </div>
        </div>
      </div>

      <h2
        className="abs_wrap5 wow fadeInUp"
        data-wow-delay="400ms"
        data-wow-duration="1000ms"
      >
        Privacy Policy
      </h2>

      <div className="auto-container">
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 mar_center">
            <div className="row clearfix">
              <div
                className="col-lg-12 col-md-12 wow fadeInUp animated"
                data-wow-delay="400ms"
                data-wow-duration="1000ms"
              >
                <div className="content1">
                  {/* <div className='heading speaker-heading'>Speaker Guidelines</div> */}
                  <ul>
                    <li>
                      05. This Privacy Policy document contains types of
                      information that is collected and recorded by{" "}
                      {general.site_url
                        ? general.site_url.replace(/^https?:\/\//, "")
                        : ""}{" "}
                      and how we use it.
                    </li>
                    <li>
                      If you have additional questions or require more
                      information about our Privacy Policy, do not hesitate to
                      contact us.
                    </li>
                    <li>
                      This Privacy Policy applies only to our online activities
                      and is valid for visitors to our website with regards to
                      the information that they shared and/or collect in{" "}
                      {general.site_url
                        ? general.site_url.replace(/^https?:\/\//, "")
                        : ""}
                      . This policy is not applicable to any information
                      collected offline or via channels other than this website.
                      Our Privacy Policy was created with the help of the
                      Privacy Policy Generator.
                    </li>
                  </ul>
                  <div className="heading Poster-heading">Consent</div>
                  <ul>
                    <li>
                      By using our website, you hereby consent to our Privacy
                      Policy and agree to its terms.
                    </li>
                  </ul>
                  <div className="heading Participants-heading">
                    Information we collect
                  </div>
                  <ul>
                    <li>
                      The personal information that you are asked to provide,
                      and the reasons why you are asked to provide it, will be
                      made clear to you at the point we ask you to provide your
                      personal information.
                    </li>
                    <li>
                      If you contact us directly, we may receive additional
                      information about you such as your name, email address,
                      phone number, the contents of the message and/or
                      attachments you may send us, and any other information you
                      may choose to provide.
                    </li>
                    <li>
                      When you register for an Account, we may ask for your
                      contact information, including items such as name, company
                      name, address, email address, and telephone number.
                    </li>
                  </ul>

                  <div className="heading Participants-heading">
                    How we use your information
                  </div>
                  <p>
                    We use the information we collect in various ways, including
                    to:
                  </p>
                  <ul>
                    <li>Provide, operate, and maintain our website</li>
                    <li>Improve, personalize, and expand our website</li>
                    <li>Understand and analyze how you use our website</li>
                    <li>
                      Develop new products, services, features, and
                      functionality
                    </li>
                    <li>
                      Communicate with you, either directly or through one of
                      our partners, including for customer service, to provide
                      you with updates and other information relating to the
                      website, and for marketing and promotional purposes
                    </li>
                    <li>Send you emails</li>
                    <li>Find and prevent fraud</li>
                  </ul>
                  <div className="heading Participants-heading">Payment</div>
                  <p>
                    We use PayPal as one of our online payment options to
                    provide a secure and convenient way for you to register and
                    pay for our conference events. By choosing PayPal as your
                    payment method, you consent to the collection, use, and
                    sharing of your personal and financial information as
                    outlined below:
                  </p>

                  <div>
                    <b>Data Collection and Use</b>
                  </div>
                  <p>
                    When you choose to pay via PayPal, certain personal
                    information, such as your name, email address, and
                    transaction amount, will be shared with PayPal to facilitate
                    the payment process. PayPal may also collect other
                    information as per its own privacy policies. This
                    information is used solely for processing your payment and
                    is not shared with unauthorized parties.
                  </p>

                  <div>
                    <b>Data Security</b>
                  </div>
                  <p>
                    PayPal uses advanced security measures to protect your
                    information, and we follow industry standards to ensure that
                    your data remains secure throughout the transaction.
                    However, please note that once you are redirected to
                    PayPal’s site, their Privacy Policy and security practices
                    will apply.
                  </p>

                  <div>
                    <b>Data Retention</b>
                  </div>
                  <p>
                    We retain transaction information to comply with legal and
                    financial obligations, and it may also be used to respond to
                    any transaction-related inquiries.
                  </p>

                  <div>
                    <b>Third-Party Payment Processor</b>
                  </div>
                  <p>
                    PayPal is an independent third-party payment processor, and
                    we do not control or have access to your full payment
                    details. For more information on how PayPal handles your
                    information, please review
                    <Link
                      href="https://www.paypal.com/privacy"
                      title="PayPal's Privacy Policy"
                      target="_blank"
                    >
                      {" "}
                      PayPals Privacy Policy
                    </Link>
                    .
                  </p>

                  <div>
                    <b>Your Rights</b>
                  </div>
                  <p>
                    If you have questions about your payment or need assistance
                    with a refund, you may contact us directly, or you can reach
                    out to PayPal for support.
                  </p>

                  <div className="heading Participants-heading">Log Files</div>
                  <p>
                    {general.site_url
                      ? general.site_url.replace(/^https?:\/\//, "")
                      : ""}{" "}
                    follows a standard procedure of using log files. These files
                    log visitors when they visit websites. All hosting companies
                    do this and a part of hosting services’ analytics. The
                    information collected by log files include internet protocol
                    (IP) addresses, browser type, Internet Service Provider
                    (ISP), date and time stamp, referring/exit pages, and
                    possibly the number of clicks. These are not linked to any
                    information that is personally identifiable. The purpose of
                    the information is for analyzing trends, administering the
                    site, tracking users’ movement on the website, and gathering
                    demographic information.
                  </p>

                  <div className="heading Participants-heading">
                    Google DoubleClick DART Cookie
                  </div>
                  <p>
                    Google is one of a third-party vendor on our site. It also
                    uses cookies, known as DART cookies, to serve ads to our
                    site visitors based upon their visit to www.website.com and
                    other sites on the internet. However, visitors may choose to
                    decline the use of DART cookies by visiting the Google ad
                    and content network Privacy Policy at the following URL –
                    <Link
                      href="https://policies.google.com/technologies/ads"
                      title="https://policies.google.com/technologies/ads"
                      target="_blank"
                    >
                      {" "}
                      https://policies.google.com/technologies/ads{" "}
                    </Link>
                  </p>

                  <div className="heading Participants-heading">
                    Our Advertising Partners
                  </div>
                  <p>
                    Some of advertisers on our site may use cookies and web
                    beacons. Our advertising partners are listed below. Each of
                    our advertising partners has their own Privacy Policy for
                    their policies on user data. For easier access, we
                    hyperlinked to their Privacy Policies below.
                  </p>
                  <ul>
                    <li>
                      <Link
                        href="https://policies.google.com/technologies/ads"
                        title="Google"
                        target="_blank"
                      >
                        Google
                      </Link>
                    </li>
                  </ul>

                  <div className="heading Participants-heading">
                    Third Party Privacy Policies
                  </div>
                  <ul>
                    <li>
                      {general.site_url
                        ? general.site_url.replace(/^https?:\/\//, "")
                        : ""}
                      ’s Privacy Policy does not apply to other advertisers or
                      websites. Thus, we are advising you to consult the
                      respective Privacy Policies of these third-party ad
                      servers for more detailed information. It may include
                      their practices and instructions about how to opt-out of
                      certain options.
                    </li>
                    <li>
                      You can choose to disable cookies through your individual
                      browser options. To know more detailed information about
                      cookie management with specific web browsers, it can be
                      found at the browsers’ respective websites.
                    </li>
                  </ul>

                  <div className="heading Participants-heading">
                    CCPA Privacy Rights (Do Not Sell My Personal Information)
                  </div>
                  <p>
                    Under the CCPA, among other rights, California consumers
                    have the right to:
                  </p>

                  <ul>
                    <li>
                      Request that a business that collects a consumer’s
                      personal data disclose the categories and specific pieces
                      of personal data that a business has collected about
                      consumers.
                    </li>
                    <li>
                      Request that a business delete any personal data about the
                      consumer that a business has collected.
                    </li>
                    <li>
                      Request that a business that sells a consumer’s personal
                      data, not sell the consumer’s personal data.
                    </li>
                  </ul>

                  <p>
                    If you make a request, we have one month to respond to you.
                    If you would like to exercise any of these rights, please
                    contact us.
                  </p>

                  <div className="heading Participants-heading">
                    GDPR Data Protection Rights
                  </div>
                  <p>
                    We would like to make sure you are fully aware of all of
                    your data protection rights. Every user is entitled to the
                    following:
                  </p>
                  <ul>
                    <li>
                      <b>The right to access –</b> You have the right to request
                      copies of your personal data. We may charge you a small
                      fee for this service.
                    </li>
                    <li>
                      <b>The right to rectification –</b>You have the right to
                      request that we correct any information you believe is
                      inaccurate. You also have the right to request that we
                      complete the information you believe is incomplete.
                    </li>
                    <li>
                      <b>The right to erasure –</b>You have the right to request
                      that we erase your personal data, under certain
                      conditions.
                    </li>

                    <li>
                      <b>The right to restrict processing –</b> You have the
                      right to request that we restrict the processing of your
                      personal data, under certain conditions.
                    </li>

                    <li>
                      <b>The right to object to processing –</b> You have the
                      right to object to our processing of your personal data,
                      under certain conditions.
                    </li>

                    <li>
                      <b>The right to data portability –</b> You have the right
                      to request that we transfer the data that we have
                      collected to another organization, or directly to you,
                      under certain conditions.
                    </li>
                  </ul>

                  <p>
                    If you make a request, we have one month to respond to you.
                    If you would like to exercise any of these rights, please
                    contact us.
                  </p>

                  <div className="heading Participants-heading">
                    Children’s Information
                  </div>
                  <p>
                    Another part of our priority is adding protection for
                    children while using the internet. We encourage parents and
                    guardians to observe, participate in, and/or monitor and
                    guide their online activity.{" "}
                    {general.site_url
                      ? general.site_url.replace(/^https?:\/\//, "")
                      : ""}{" "}
                    does not knowingly collect any Personal Identifiable
                    Information from children under the age of 13. If you think
                    that your child provided this kind of information on our
                    website, we strongly encourage you to contact us immediately
                    and we will do our best efforts to promptly remove such
                    information from our records.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
