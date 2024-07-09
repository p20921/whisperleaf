function CookiePolicy(props) {
    return (
        <>
        <header>
            <title>Cookie Policy</title>
        </header>
        <main>
            <div style={{ padding: 20 }}>
                <h1>Cookie Policy</h1>
                
                <h2>Introduction</h2>
                <p>This Cookie Policy explains how and when we use cookies on our website. By using our website, you agree to the use of cookies as described in this policy. We only use cookies when you interact with specific features, such as liking a post or writing a comment.</p>
                
                <h2>What are Cookies?</h2>
                <p>Cookies are small text files stored on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work, improve user experience, and provide information to the site owners.</p>
                
                <h2>How We Use Cookies</h2>
                <p>We use cookies selectively to enhance your interaction with our website. Specifically, we use cookies for the following purposes:</p>
                <ul>
                    <li><strong>Liking a Post</strong>: When you like a post, we use cookies to remember your action and to prevent multiple likes from the same user.</li>
                    <li><strong>Writing a Comment</strong>: When you write a comment, we use cookies to remember your input details, such as your username and email address, for future convenience.</li>
                </ul>
                
                <h2>Types of Cookies We Use</h2>
                <h3>Session Cookies</h3>
                <ul>
                    <li><strong>Purpose</strong>: These cookies are temporary and are deleted from your device when you close your browser.</li>
                    <li><strong>Use</strong>: We use session cookies to maintain the state of your interaction, such as when you like a post or write a comment.</li>
                </ul>
                
                <h3>Persistent Cookies</h3>
                <ul>
                    <li><strong>Purpose</strong>: These cookies remain on your device for a set period or until you delete them.</li>
                    <li><strong>Use</strong>: We use persistent cookies to remember your preferences and actions, such as the posts you've liked and the comments you've made, for your convenience in future visits.</li>
                </ul>
                
                <h2>Managing Cookies</h2>
                <p>You can manage and control the use of cookies through your browser settings. Most browsers allow you to:</p>
                <ul>
                    <li>View the cookies stored on your device and delete them on an individual basis.</li>
                    <li>Block third-party cookies.</li>
                    <li>Block cookies from specific sites.</li>
                    <li>Block all cookies from being set.</li>
                    <li>Delete all cookies when you close your browser.</li>
                </ul>
                <p>Please note that if you disable or delete cookies, you may not be able to fully experience some of the features our website offers, particularly those related to liking posts and commenting.</p>
                
                <h2>Changes to This Cookie Policy</h2>
                <p>We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this policy periodically to stay informed about our use of cookies.</p>
                
                <h2>Contact Us</h2>
                <p>If you have any questions about our use of cookies, please contact us at:</p>
                <ul>
                    <li><strong>Email</strong>: makejday@gmail.com</li>
                </ul>
                
                <p>By using our website and interacting with the features such as liking posts or writing comments, you consent to the use of cookies as outlined in this policy.</p>
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