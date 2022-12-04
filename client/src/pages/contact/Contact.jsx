import Sidebar from '../../components/sidebar/Sidebar'
import './contact.css'

function Contact() {
  return (
    <div className='contact'>
      <div className="contactWrapper">
        <div className="contactTitle">
            <h1 className='contactTitleText'>Please get in touch and our expert support team will answer all your questions.</h1>
        </div>
        <form action="" className="contactForm">
            
            <input type="text" placeholder='Full name' className='contactInput'/>
            <input type="text" placeholder='Email' className='contactInput'/>
            <input type="text" placeholder='Company' className='contactInput'/>
            <div style={{marginTop:'20px'}}></div>
            <label htmlFor="">Are you an existing user?</label>
            <div className="contactCheckbox">
                <label htmlFor="checkboxyes">Yes</label>
                <input type="checkbox" name="" id="checkboxyes" className='contactCheck' />
                <label htmlFor="checkboxno">No</label>
                <input type="checkbox" name="" id="checkboxno" className='contactCheck'/>
            </div>
            <textarea className='contactText' placeholder='Your message...'></textarea>
        <button className='contactBtn'>Submit</button>
        
        </form>

      </div>
      <Sidebar />
    </div>
  )
}

export default Contact
