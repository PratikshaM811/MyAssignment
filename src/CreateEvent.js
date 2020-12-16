import React, { Component } from 'react'
import TextEditor from './TextEditor'
import moment from 'moment';
import {
  Row, Col, Select,
  Button, Icon, Upload,
   Switch, notification, Tooltip,  
   Divider
} from 'antd'
import { Form, Input, DatePicker, TimePicker } from 'antd'
import './App.css'
const { Option } = Select;
const {TextArea} =Input;
const openNotificationWithIcon = (type, message, description) => {
  notification[type]({
    message,
    description,
  })
}
//new page form
class CreateEvent extends Component {
  state = {
    event: '',
    title:'',
    category:'',
    summery:'',
    RegSite:'',
    onlineLink:'',
    timezone:undefined,
    maxlength: 250,
    charTitle: 0,
    Sitemaxlength: 1024,
    charSite:0,
    ShortSummery: 500,
    charSummery:0,
    EndTime:'',
    EndDate:'',
    StartDate:'',
    StartTime:'',
    vEvent:'',
    loading: false,
    

  }

  getBase64 (img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      openNotificationWithIcon('error','You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      openNotificationWithIcon('error','Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  handleChangeImage = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };
  
  onChangeSwitch=(e)=> {
    this.setState({vEvent:e});
    console.log("switch button",this.state.vEvent);
  }
  handleSubmit = (e) => {
    e.preventDefault()
    console.log("submit clicked")
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("all data",values);

        openNotificationWithIcon('success', 'Data Added Successfully..!!')
        return true;
      }
    }
    )
  }

  onChangeStartDate=(e, dateString) => {
  
    this.setState({StartDate :dateString})

    console.log(this.state.StartDate, dateString);
  }
   onChangeStartTime = (e, timeString) => {
     this.setState({StartTime:timeString})
    console.log(this.state.StartTime, timeString);
  }
  onChangeEndDate =(e, dateString) =>{
    this.setState({EndDate:dateString})

    console.log(this.state.EndDate, dateString);
  }
   onChangeEndTime=(e, timeString) => {
     this.setState({EndTime:timeString})
    console.log(this.state.EndTime, timeString);
  }
  
  render() {
console.log("all data ",this.state)

const uploadButton = (
  <div>
    <Icon type={this.state.loading ? 'loading' : 'plus'} />
    <div className="ant-upload-text">Upload</div>
  </div>
);
const { imageUrl } = this.state;
    const { getFieldDecorator, getFieldValue } = this.props.form

    const normFile = e => {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    };
    const OnChangeEvent=(e) =>{
      this.setState({event : e});

    }
    const CountCharTitle = (e) => {
      this.setState({
         charTitle: e.target.value.length ,
        title:e.target.value})
    }
    const OnChangeCategory=(e) =>{
      this.setState({category : e});
      
    }
    const CountCharSummery = (e) => {
      this.setState({ 
        charSummery: e.target.value.length ,
        summery:e.target.value
      })
    }
    const CountCharSite = (e) => {
      this.setState({ charSite: e.target.value.length,
        RegSite:e.target.value
       })
    }
    const OnChangeTimeZone =(e) =>{
      this.setState({ timezone: e })
console.log("timezone",e)
    }
  const OnChangeLink=(e)=>{
    this.setState({onlineLink:e.target.value})
  }
    
   
     
    return (

      <div className="container">
        <Row>
          <Col span={3} style={{ marginTop: '10px' }}><h2>Create Event</h2></Col>
          <Col span={16}></Col>

          <Col span={5} style={{ marginTop: '10px' }}>
            <Button type="primary" htmlType="submit" size="large" className="mr-2"
            onClick={this.handleSubmit}>
              Create
            </Button>

&nbsp;
           <Button htmlType="submit" size="large" className="mr-2 ">
              Cancel
           </Button>

          </Col>
        </Row>
        <Divider plain></Divider>
        <Row>
          <Col span={6}>
 
          </Col>
          <Col span={12}>
            <div>
              <Form 
               layout="vertical"
 className="form1">
                {/* select 1 */}
                <Form.Item
                  name="select"
                  label="Add event in *"
                  hasFeedback>
                  {getFieldDecorator('event', {
                    rules: [{
                      required: true,
                      message: 'Please Add Event',
                    },],

                  })(<Select placeholder="select..." onChange={OnChangeEvent}>
                    <Option value="event 1">Event 1</Option>
                    <Option value="event 2">Event 2</Option>
                  </Select>)}
                </Form.Item>
                {/* Image upload start */}
                <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={this.beforeUpload}
        onChange={this.handleChangeImage}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
                {/* image upload end */}
                {/* Input Title */}
                <Form.Item
                  name="title"
                  label="Title"
                  hasFeedback>
                  {getFieldDecorator('title', {
                    rules: [{
                      required: true,
                      message: 'Please Add Title'
                    }]
                  })(<div><TextArea placeholder="Title *"
                    onChange={CountCharTitle } rows={4}
                    showCount maxlength={this.state.maxlength} />
                    <p style={{ float: 'right' }}> {this.state.charTitle}/{this.state.maxlength}</p>
                  </div>)}
                </Form.Item>

                {/* select 2 */}

                <Form.Item
                  name="select"
                  label="Categories"
                  hasFeedback>
                  {getFieldDecorator('category', {
                    rules: [{
                      required: true,
                      message: 'Please Add Category',
                    },],

                  })(<Select placeholder="select..." onChange={OnChangeCategory}>
                    <Option value="category 1">Category 1</Option>
                    <Option value="category 2">Category 2</Option>
                  </Select>)}
                </Form.Item>
                {/* Short Summery */}
                <Form.Item
                  name="summery"
                  label="Short Summery"
                  hasFeedback>
                  {getFieldDecorator('summery', {
                    rules: [{
                      required: true,
                      message: 'Please Enter Short Summery'
                    }]
                  })(<div><Input.TextArea placeholder="Short Summery *"
                    onChange={CountCharSummery} rows={4}
                    showCount maxlength={this.state.ShortSummery} />
                    <p style={{ float: 'right' }}> {this.state.charSummery}/{this.state.ShortSummery}</p>
                  </div>)}
                </Form.Item>

                {/* type:public */}
                <Form layout="inline">
                <Form.Item label="Type"> &nbsp; :
                &nbsp;
                  <span className="ant-form-text"> <b>Public</b></span>
                </Form.Item>
</Form>
                <div>
                  {/* Input Title */}
                  <Form.Item
                    name="RegSite"
                    label="Registration Site"
                    hasFeedback>
                    {getFieldDecorator('RegSite', {

                    })(<div><Input.TextArea
                      onChange={CountCharSite} rows={4} placeholder="Registration Site"
                      showCount maxlength={this.state.Sitemaxlength} />
                      <p style={{ float: 'right' }}> {this.state.charSite}/{this.state.Sitemaxlength}</p>
                    </div>)}
                  </Form.Item>
                </div>
                <Form layout="inline">
                  <Form.Item label="Is this a Virtual Event ?" >
                &nbsp;  {getFieldDecorator('vEvent' ,{
              
              })(<>Yes &nbsp;<Switch defaultChecked onChange={this.onChangeSwitch}/></> )}
                  </Form.Item>
                  </Form>

                {/* Input Title */}
                <Form.Item
                  name="link"
                  label="Online Link"
                  hasFeedback>
                  {getFieldDecorator('onlineLink', {

                  })(<div><Input placeholder="Online Link" onChange={OnChangeLink} />
                  </div>)}
                </Form.Item>
{/* timezone */}
      
<Form.Item  style={{ marginBottom: 0 }}>
<Form.Item hasFeedback  label="Select TimeZone"
                    style={{ display: 'inline-block', width: 'calc(60% - 8px)' }}

  >
          {getFieldDecorator('timezone', {
            rules: [{
              required: true,
              message: 'Please Add Timezone',
            },],
          })(<Select placeholder="select..." onChange={OnChangeTimeZone}className="flex"  >
          <Option value="pune">Pune</Option>
             <Option value="mumbai">Mumbai</Option>
           </Select>)}
         </Form.Item>

                  <Form.Item 
                   style={{ display: 'inline-block',width: 'calc(30% - 8px)' }}
                  >
                    
                   <span><br/><br/>&nbsp;&nbsp;<b>GMT +5:30</b>&nbsp;
            <Tooltip title="Time Zone"><Icon type="question-circle-o"/>
              </Tooltip></span>
                  </Form.Item>
                </Form.Item>
{/*  */}
{/* start date section */}
                <Form.Item  style={{ marginBottom: 0 }}>
                  <Form.Item
                    name="start date"
                    label="start date"
                    
                    style={{ display: 'inline-block', width: 'calc(50% - 1px)' }}
                  > {getFieldDecorator('StartDate', {
                    rules: [{
                      required: true,
                      message: 'Please Enter Start Date',
                    },],
                  })( <DatePicker onChange={this.onChangeStartDate} />
                    )}

                  </Form.Item>
                  <Form.Item 
                    name="start time"
                    label="start Time"
                   style={{ display: 'inline-block',marginLeft:'-45px' }}
                  >
                    
                    {getFieldDecorator('Starttime', {
                    rules: [{
                      required: true,
                      message: 'Please Enter Start Time',
                    },],
                  })( 
                    <TimePicker onChange={this.onChangeStartTime} format="h:mm a" defaultOpenValue={moment('00:00', 'HH:mm')} />  

                    )}
                  </Form.Item>
                </Form.Item>           
{/* end date section*/}
                <Form.Item style={{ marginBottom: 0 }}>
                <Form.Item
                    name="End date"
                    label="End date"
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                  >
                  {getFieldDecorator('EndDate', {
                    rules: [{
                      required: true,
                      message: 'Please Enter End Date',
                    },],
                  })( <DatePicker onChange={this.onChangeEndDate} />
                    )}
                  </Form.Item>
                  <Form.Item
                    name="End time"
                    label="End Time"
                    style={{ display: 'inline-block',marginLeft:'-45px' }}
                  >
 {getFieldDecorator('EndTime', {
                    rules: [{
                      required: true,
                      message: 'Please Enter End Time',
                    },],
                  })( 
                    <TimePicker onChange={this.onChangeEndTime} format="h:mm a" defaultOpenValue={moment('00:00', 'HH:mm')} />  

                    )}
                 </Form.Item>
                </Form.Item>
{/* Text Editor */}
<TextEditor/>
{/* Text Editor end */}
{/* dragger start*/}
                <Form.Item ><span><strong>Attachments:</strong> &nbsp;
                <Tooltip title="Please Attach Documents"><Icon type="question-circle-o"/>
              </Tooltip></span>
                  <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                    <Upload.Dragger name="files" action="/upload.do">
                      <p className="ant-upload-drag-icon">
                        {/* <InboxOutlined /> */}
                      </p>
                      <p className="ant-upload-text">Click or drag file to this area to upload</p>
                      <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Upload.Dragger>
                  </Form.Item>
                </Form.Item>
{/* dragger end */}
              </Form>
            </div>
          </Col>
        </Row>

      </div>

    )
  }
}
const WrappedCreateEvent = Form.create()(CreateEvent)
export default WrappedCreateEvent

