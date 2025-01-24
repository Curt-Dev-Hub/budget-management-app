import { Card } from "react-bootstrap"

function PrivacyPolicy() {
  return (
    <>
      <h1 style={{paddingLeft: "15px"}}>Privacy Policy</h1>
      <Card bg="primary" text="light" style={{ width: '90%', margin: '43px auto' }}>
        <Card.Body>
          {/* <Card.Title>Privacy Policy</Card.Title> */}
          <Card.Text>
            This privacy policy is provided in a layered format so you can click through to the specific areas set out below.
          </Card.Text>
          <ol style={{ textAlign: 'left', margin: '48px auto', width: '86%' }}>
            <li><a className="policy-link" href="#purpose">Important Information and purpose of this privacy policy </a></li>
            <li><a className="policy-link" href="#data">The data that is collected about you</a></li>
            <li><a className="policy-link" href="#collection">How is your personal data collected</a></li>
            <li><a className="policy-link" href="#use">How is your personal data used</a></li>
            <li><Card.Link className="policy-link" href="">This is a card link</Card.Link></li>
          </ol>
          <h3 id="purpose">1. Purpose of this privacy policy</h3>
          <Card.Text>
            This privacy policy aims to give you information on how your personal data is collected and processed through your 
            use of this website, including any data you may provide through this website.  <br /> <br />
            
            Please contact myself using the below details if you have any questions about this privacy policy or your information. <br /> <br />

            <b>Contact Details</b>
            <br /> <br />
            Full name of legal entity: Curtis King<br />
            Email address: curt_king@coolsite.net<br />
            Telephone number: 07507 465777 <br/> <br />
            
            You have the right to make a complaint at any time to the Information Commissioners Office (ICO), 
            the UK supervisory authority for data protection issues (www.ico.org.uk). I would, however, appreciate the chance to deal with your 
            concerns before you approach the ICO so please contact me in the first instance. <br /> <br />   

            <b>Changes to the privacy policy and the duty to inform us of changes</b>
            <br /> <br />

            This privacy policy will be kept under regular review. This version was last reviewed on 06 December 2025.  <br /> <br />

            <b>Third Party Links</b> <br /> <br />

            This website does not contain links to any third party websites, plug-ins and applications.
          </Card.Text>
          <h3 id="data">2. The data that is collected about you</h3>
          <Card.Text>
              Personal data, or personal information, means any information about an individual from which that person can be identified. 
              It does not include data where the identity has been removed (anonymous data). <br /> <br />
              
              I may collect, use, store different kinds of personal data about you which I have grouped together as follows: <br /> <br />
              
              Identity Data includes first name, last name, username or similar identifier, title, date
          </Card.Text>
          <ul style={{ textAlign: 'left' }}>
            <li><b>Identity Data</b> includes a name, username and password</li>
            {/* <li>Contact Data</li> */}
            <li><b>Technical Data</b> includes internet protocol (IP) address and browser 
            characteristics (User Agent), timestamp, operating system, on the devices you use to access this website.
            </li>
            <li><b>Usage Data</b> includes information on any errors you may encounter whilst using the website.</li>
          </ul> <br /> <br />
          <h3 id="collection">3. How is your personal data collected</h3>
          <Card.Text>
            Although your use of this application does not require you to provide 
            data that directly and personally identifies you, any data that 
            may be linked to you is treated as such. <br /> <br />
            Different methods are used to collect data from and about you including through: <br /> <br />
          </Card.Text>
          <ul style={{ textAlign: 'left' }}>
            <li><b>Direct interactions</b>. You may give me your Identity Data by filling in forms or by corresponding with me by post, phone, email or otherwise. This includes personal data you provide when you:
              <ul>
                <li>create an account on my website</li>
                <li>give me feedback or contact me</li>
              </ul>
            </li>
            <li><b>Your interactions</b>. As you interact with my website, I may automatically collect Technical Data about your equipment. I collect this personal data by using cookies, server logs and other similar technologies.</li>
          </ul> <br /> <br />
          <h3 id="use">4. How your data is used</h3>
          <Card.Text>
          Data collected will be used for the following purposes: <br /> <br />
          a) to help keep this website secure, including for security monitoring and identity management; <br />
          b) to investigate and prevent potential fraud or illegal activities including to prevent cyber-attacks and to detect bots; <br />
          c) to analyze, develop, improve and optimize the use, function and performance of this website; <br />
          d) for research and development purposes, including to analyze, develop, improve and optimize our Services; <br />
          f) to comply with applicable laws and regulations, disclosure or other legal process requests, and in the context of dispute resolution.
        </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}

export default PrivacyPolicy