function CookiePolicy(props) {
    return (
        <>
        <header>
            <title>Privacy Policy</title>
        </header>
        <main>
            <div style={{ padding: 20 }}>
            <h1>Whisperleap Blog Privacy Policy</h1>

            <p>At Whisperleap, your privacy is of utmost importance to us. This Privacy Policy outlines how we handle your personal information and what measures we take to protect it.</p>

            <h2>Personal Information Collection</h2>
            <p><strong>Whisperleap Blog Operator:</strong> We do not collect any personal information from our users. Our primary goal is to provide you with valuable content without compromising your privacy.</p>
            <p><strong>Advertisers:</strong> Please be aware that third-party advertisers, including those displaying AdSense ads, may collect personal information. This collection is beyond our control and is governed by their respective privacy policies.</p>

            <h2>Google AdSense and GDPR Compliance</h2>
            <p><strong>AdSense Ads:</strong> Advertisements served by Google AdSense on our blog may involve the collection of personal information by Google or other third-party advertisers. This is to deliver personalized ads based on your interests.</p>
            <p><strong>GDPR Message:</strong> Google provides a GDPR-compliant message to inform and protect your personal information. We recommend reviewing the GDPR message provided by Google for detailed information on how your data is handled.</p>

            <h2>Protecting Your Information</h2>
            <p><strong>User Control:</strong> You have the right to control your personal information. For more details on how advertisers handle your data and how you can manage your privacy settings, please refer to the Google AdSense Privacy Policy and the GDPR message.</p>
            <p><strong>Data Security:</strong> While we do not collect personal information, we are committed to maintaining a secure environment. We use standard security protocols to protect our site and its visitors.</p>

            <h2>Contact Us</h2>
            <p>If you have any questions or concerns about our privacy practices, please feel free to contact us at <strong>Email</strong>: makejday@gmail.com</p>

            <p>By using the Whisperleap blog, you agree to this Privacy Policy. We reserve the right to update this policy as needed to reflect changes in our practices or for other operational, legal, or regulatory reasons.</p>

            <p>Thank you for visiting Whisperleap.</p>
            </div>
        </main>
        <footer>
        </footer>
        </>
    )
}

export const getStaticProps = async (props) => {
    return {
         props
    }
}

export default CookiePolicy