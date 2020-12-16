import React, { Component } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
class TextEditor extends Component {
    state = {
EditorText:'',
length:8000,
charLengthEditor:0,
    }
    render() {
     const OnChangeEditor =  ( event, editor ) => {
            const data = editor.getData();
            this.setState({
                // charLengthEditor: event.target.data.length ,
                // EditorText :event.target.data
            })
            console.log( { event, editor, data } );
        }

            return (
                <div>
                    <CKEditor
                        editor={ ClassicEditor }
                        maxlength={this.state.length}
                        placeholder="<p>Description  (max limit 8000 characters) * </p>"
                        onReady={ editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={OnChangeEditor }
                        onBlur={ ( event, editor ) => {
                            console.log( 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                            console.log( 'Focus.', editor );
                        } }
                    />
                      <p style={{ float: 'right' }}> {this.state.charLengthEditor}/{this.state.length}</p>

                </div>
            );
                    }
                }
            
export default TextEditor;