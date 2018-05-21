import React from 'react'
import moment from 'moment'
import * as emailjs from 'emailjs-com'
import { Input, Button } from 'antd'
import 'antd/lib/button/style/css'
import 'antd/lib/input/style/css'

const format = 'h:mm A on M/D'
emailjs.init("user_3E2uLUmbsB5dvMMsQhFaB");

export default class Interview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: undefined,
      submitted: window.localStorage.getItem('submitted'),
    }
  }

  render() {
    return (
      <div style={wrapper_style}>
        <span style={header_style}>Polymer Technical Challenge</span>
        <ol style={ol_style}>
          <Li>After you hit <b>Start</b>, the challenge prompt PDF will download and your timer will start. You will have <b>3 hours</b> to submit your work. Make sure have a quiet place to work and no distractions for the next few hours!</Li>
          <Li> We use React at Polymer, so if you know it, great! If you don’t, not a problem - feel free to use any language or framework you’re comfortable in. </Li>
          <Li>Document your work carefully. Note down any external resources, libraries or frameworks you used.</Li>
          <Li><b>When you’re done, email your work to us at <Email email="interview@usepolymer.com"/></b> with full instructions on how to view your code and run the app. You can send us a JSFiddle, .zip file, public Github repo, or any other easily accessible source.</Li>
        </ol>
        <div style={{display: "flex"}}>
          <div style={{paddingRight: '8px', width: "100%"}}>
            <Input placeholder="Your full name" value={this.state.name} onChange={e => this.setState({name: e.target.value})}/>
          </div>
          <Button type="primary" onClick={this.handleSubmit.bind(this)} disabled={!this.state.name || this.state.submitted}>Start!</Button>
        </div>
        <span>{this.state.submitted && <Time t={this.state.submitted}/> }</span>
      </div>
    )
  }

  handleSubmit() {
    let now = new Date()
    this.setState({ submitted: now })
    window.localStorage.setItem('submitted', now)

    emailjs.send("gmail", "template_interview_started", { 
      candidate: this.state.name,
      start_time: moment(now).format(format),
      end_time: moment(now).add(3, 'h').format(format),
    })
  }
}

function Time({t}) {
  let submitted = moment(t)
  let deadline = moment(submitted).add(3, 'h')
  return (
    <div style={{textAlign: 'center', marginTop: "24px", fontSize: "20px", lineHeight: "30px"}}>
      <div>You started at {submitted.format(format)}.</div>
      <div style={{display: 'block'}}>Submit your work by <b>{deadline.format(format)}</b>.</div> 
    </div>
  )
}

function Li({ children, ...rest }) {
  return <li style={{marginBottom: "20px"}} {...rest}>{children}</li>
}

function Email({ email, ...rest}) {
  return <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer" {...rest}>{email}</a>
}

const wrapper_style = {
  maxWidth: "700px",
  margin: "0 auto",
  padding: '48px 100px 0 100px',
  color: "black",
  backgroundColor: 'white',
  height: '100%',
}

const header_style = {
  display: "block",
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "20px",
}

const ol_style = {
  margin: 0,
  padding: 0,
  border: 0,
  listStyle: "decimal",
}