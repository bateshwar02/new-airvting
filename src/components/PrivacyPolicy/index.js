/**
 *
 * PrivacyPolicy
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';

function PrivacyPolicy() {
  const getContent = () => (
    <div className="main_content">
      <div className="main_content_inner">
        <h1> Privacy </h1>
        <div className="uk-grid">
          <div className="uk-width-1-4@m uk-flex-last@m">
            <nav
              className="responsive-tab style-3 setting-menu"
              uk-sticky="top:10 ; offset:100; media:@m ;bottom:true; animation: uk-animation-slide-top"
            >
              <ul uk-scrollspy-nav="closest: li; scroll: true">
                <li className="uk-active">
                  <a href="#link-1"> Privacy </a>
                </li>
                <li>
                  <a href="#link-2"> Careers</a>
                </li>
                <li>
                  <a href="#link-3"> Terms &amp; Conditions</a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="uk-width-expand@m mt-0">
            <div className="my-4">
              <h2>AIRVTING Privacy Policy</h2>
              <hr className="m-0" />
            </div>
            <article className="uk-article" id="link-1">
              <h4>Scope of this Privacy Policy</h4>
              <p>
                                This privacy policy is applicable to how AIRVTING handles personally identifiable information is left when you log in to the
                                website and server, as well as other personally identifiable information shared with our business partners
                {' '}
              </p>
              <p>
                                This privacy policy constitutes an integral part of AIRVTING User Agreement and must be read together with AIRVTING User
                                Agreement.
              </p>
              <h4 className="mt-4" id="link-2">
                                Account Information
              </h4>
              <p>You may avail some of our services without creating a AIRVTING account, such as watching AIRVTING broadcasts on our website.</p>
              <p>
                                If you choose to create a AIRVTING account, AIRVTING may ask for your name (you may use your real name if you are comfortable to
                                do so, and you may also use an alias), birthday, gender, hometown, bio, education, career, profile image, email address and cell
                                phone number, so that we could identify you and provide better Services to you. Some of the aforementioned information is not
                                mandatory.
              </p>
              <p>
                                If you create a AIRVTING account by connecting with a third-party service, such as Facebook, Twitter, Google, YouTube, Instagram
                                or VK, or if you connect a AIRVTING account with a thirdparty account, we will use information from such third-party service,
                                including your third-party service user name, gender, profile image and birthday. Certain information will be displayed publicly
                                on your profile page, such as your user name, your age and who you are following. Your recent videos will also be displayed
                                publicly on your profile page.
              </p>
              <p>
                                We use your birthday to determine whether you have reached the minimum age to avail our Services. We use your contact
                                information, such as your phone number, to authenticate your account, and keep your account as well as our Services secure. We
                                use your background information, such as your hometown, to recommend contents that may interest you and to improve our Services.
              </p>
              <p>
                                If you provide us with your phone number or email address, you agree that we may send text messages to that phone number, or
                                email to that email address. We will do so only in compliance with applicable laws and regulations. If you deactivate our
                                Services, you will no longer receive any text or email from us.
              </p>
              <h4 className="mt-4" id="link-3">
                {' '}
                                Address Book
              </h4>
              <p>
                                You may choose to share with us your address book so that we can cross-reference with AIRVTING database and show you contacts
                                who are also using AIRVTING.
              </p>
              <h4 className="mt-4" id="link-4">
                                Cookie
                {' '}
              </h4>
              <p>
                                A cookie is a small piece of data that is stored on your computer or mobile device. Like many other websites and mobile
                                applications, AIRVTING will set or access AIRVTING cookies on your computer or mobile device.
              </p>
              <h4 className="mt-4" id="link-4">
                                Location
                {' '}
              </h4>
              <p>
                                We require your location information, such as your IP address, in order to set up and maintain connection and provide Services
                                to you. If your privacy settings allow, we will make recommendations using on your location information.
              </p>
              <h4 className="mt-4" id="link-4">
                                History
                {' '}
              </h4>
              <p>
                                We will keep record of your interests, such as your viewing history, to recommend contents that may interest you. We will also
                                keep record of the virtual gift you send or receive on AIRVTING for the gift system to function.
              </p>
              <h4 className="mt-4" id="link-4">
                                Device Information
                {' '}
              </h4>
              <p>
                                AIRVTING automatically receives and records additional information about your device, such as device model. We will use such
                                information to detect abnormal activities and prevent security breach. We will also use such information to identify a banned
                                account or device.
              </p>
              <h4 className="mt-4" id="link-4">
                                Bank Information
                {' '}
              </h4>
              <p>
                                We require your bank information and other sensitive information in order to make payment to you. You shall be solely
                                responsible for the accuracy of such information in order for us to process the payment.
              </p>
              <h4 className="mt-4" id="link-4">
                                Information Shared by You
                {' '}
              </h4>
              <p>
                                Most communications on AIRVTING are public and some may be immediately viewed by others. Therefore, you should think twice
                                before sharing any sensitive information. Your group messages and private messages may also be monitored by us to prevent
                                illegal activities. Your group messages and private messages (including any image or video contained) may be shared with law
                                enforcement agencies if we are requested to do so.
              </p>
              <h4 className="mt-4" id="link-4">
                                Children Protection
                {' '}
              </h4>
              <p>
                                If you are under the minimum age as specified in AIRVTING User Agreement, you may not create a AIRVTING account or use AIRVTING
                                services. AIRVTING has zero tolerance to any form of child abuse or exploitation. Your data (including group messages and
                                private messages) may be shared with law enforcement agencies if we have reasonable grounds to believe that you have engaged in
                                child pornography, or if we are requested to do so by law enforcement agencies.
              </p>
              <h4 className="mt-4" id="link-4">
                                Global Operation
                {' '}
              </h4>
              <p>
                                In order to provide Services to our users all over the world, we operate globally. You hereby authorize us to transfer, store,
                                and use your data in any country and region we operate, including Singapore, the People’s Republic of China and the European
                                Union. In doing so we shall ensure the security of your data.
              </p>
              <h4 className="mt-4" id="link-4">
                                How to Manage Your Personal Information
                {' '}
              </h4>
              <p>
                                The privacy settings allow you to control whether or not to share certain information and whether you may be found by certain
                                AIRVTING function. You may download the short videos you have shared through our Services. If you need to download videos on a
                                massive basis (more than 50 videos), please email us. You will need to use other services in order to record or download your
                                live streaming that is conducted through our Services. You may modify your account information on your profile page. If you
                                believe the personal information we have about you is inaccurate, you may also email us to update such inaccurate information.
                                You may also deactivate your account by emailing to us. Once your account is deactivated, you will not be able to restore your
                                account again. Please note that third parties may still retain copies of your information even after your account is
                                deactivated. If your account is deactivated due to your violation of our Terms of Use, we may retain certain information (such
                                as device information, phone number) to prevent you from accessing our Services again.
              </p>
              <h4 className="mt-4" id="link-4">
                                Disclosure
                {' '}
              </h4>
              <p>
                                I. The protection of user privacy is a fundamental policy of AIRVTING. AIRVTING guarantees that it will not publicly disclose or
                                provide a third party with your non-public information, unless in the following circumstances as follows:
                {' '}
              </p>
              <p>a) When prior express authorization is obtained from you;</p>
              <p>b) When and as required by prevailing laws and/or regulations; </p>
              <p>c) When and as required by relevant competent authorities of the government; </p>
              <p>d) When it is necessary to safeguard the public interest; </p>
              <p>e) When it is necessary to protect the safety of any person (including you); </p>
              <p>f) When it is necessary to address fraud, security or technical issues; and </p>
              <p>g) When it is necessary to safeguard the legal rights and interests of AIRVTING.</p>
              <p>
                                II. AIRVTING may collaborate with a third party (an affiliate or otherwise) to provide you with relevant Services. In this
                                scenario, AIRVTING has the right to share your information with a third party, if the third party agrees to bear responsibility
                                for providing privacy protection no less favorable to that of AIRVTING.
              </p>
              <p>
                                III. Under the condition that no private information of an individual user is disclosed, AIRVTING has the right to analyze the
                                entire user database and utilize the database for commercial purposes.
              </p>
              <h4 className="mt-4" id="link-4">
                                Contact Information
                {' '}
              </h4>
              <p>You may reach us via the following email address: wevalueyou@airvting.com</p>
              <h4 className="mt-4" id="link-4">
                                Law Enforcement
                {' '}
              </h4>
              <p>AIRVTING is willing to cooperate with law enforcement agencies to combat crimes.</p>

              <p>
                                Due to security concerns, we are unable to accept requests for non-public user information that are served via email. Except for
                                exigent emergency involving imminent danger to life, original document of the formal request (subpoena, search warrant, court
                                order or other legal proceedings) and any supporting document (such as scan copy of identification card or police badges) must
                                be served to the office address of Airvting Pte. Ltd. (as indicated above) before the user information is enforcement agencies.
                                We encourage law enforcement agencies to notarize the formal request to help us verify its authenticity. We will not release
                                sensitive user information unless we are convinced of the authenticity of the request.
              </p>

              <p>
                                The formal request should: (a) identify the AIRVTING ID or UID of requested account, (b) identify the information requested, (c)
                                indicate the purpose of the request or indicate that the purpose is confidential; and (d) state the legal basis for the request.
                                If the formal request is not in English, we encourage the law enforcement agencies to provide an English translation. We will
                                keep the existence of the request confidential if requested by the law enforcement agencies. However, we may take actions
                                against any account that violates the User Agreement, including disabling the account.
              </p>

              <p>
                                We encourage law enforcement agencies to contact us via email (legal@airvting.com) regarding the availability of user
                                information before serving the formal request
              </p>

              <h4 className="mt-4" id="link-4">
                                Amendments to the Privacy Policy
                {' '}
              </h4>

              <p>
                                AIRVTING periodically makes changes to the privacy policy. And the current version will be found at the following link: About
                                us`&gt;`Privacy Policy. By continuing to avail our Services, you agree to be bound by the revised Privacy Policy.
              </p>
            </article>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Privacy Policy</title>
        <meta name="description" content="Description of Followers" />
      </Helmet>
      <Header />
      <Sidebar />
      {getContent()}
    </>
  );
}

PrivacyPolicy.propTypes = {};

export default memo(PrivacyPolicy);
