import { useRef, useState, useEffect } from 'react';
import chatbox_icon from '../assets/icon.png';
import send_icon from '../assets/send.png';
import chatbox from '../assets/chatbot.png';
import user_image from '../assets/user.jpeg';

import Avatar from './Avatar';
import Typing from './Typing';
import "./css/ChatBox.css"
import { listModels, createChat, getChatHistory, Role, changeModel, analyticTask, applySuggestion } from '../api/chat.api';
import { toast } from 'react-toastify';

enum AI_MODEL {
  GPT = "gpt",
  Gemini = "gemini",
}

interface TaskChanges {
  status: string;
  priority: string;
  start_time: string;
  end_time: string;
}

interface Task {
  id: string;
  name: string;
  changes: TaskChanges;
  explanation: string;
}

function convertTaskData(taskData: Task) {
  const { id, ...rest } = taskData;
  return JSON.stringify(rest, null, 2);
}

function ChatBotComponent() {
  const [messages, setMessages] = useState<Array<{role: Role, content: string, hasApply?: Task | undefined}>>([]);
  const [typingMessage, setTypingMessage] = useState<string | null>(null);
  const [_currentModel, setModel] = useState<string | null>(null);
  const [_modelList, setModelList] = useState<Array<string>>([]);
  const [input, setInput] = useState<string>('');
  const [isShow, setShow] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isScaled, setIsScaled] = useState(false);
  const chatboxRef = useRef<HTMLDivElement>(null);
  const [selectedModel, setSelectedModel] = useState<AI_MODEL>(AI_MODEL.GPT);

  const toggleScale = () => {
    setIsScaled((prev) => !prev);
  };
  useEffect(() => {
    getChatHistory().then(response => {
      setMessages(response.data.map(x => {return {role: x.role, content: x.content}}));
    }).catch(err => {
      console.log(err);
    });

    listModels().then(response => {
      console.log(response);
      const {models, current} = response.data;
      setModelList(models);
      setModel(current);
    }).catch(err => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    const fetch = async () => {
      await changeModel(selectedModel);
    }
    fetch();
  }, [selectedModel])

  const sendMessage = async () => {
    if (input.trim()) {
      setMessages([...messages, { role: Role.User, content: input }]);
      setInput('');
      setLoading(true);

      const botMessage = await callAPI();
      setLoading(false);
      displayTypingEffect([botMessage]);
    }
  };

  const displayTypingEffect = async (texts: Array<string>, hasApply?: Task[]) => {
    let index = 0;
    let textIndex = 0;
    setTypingMessage('');
    
    const step = () => {
      if (!texts || textIndex >= texts.length || texts[textIndex] == undefined) {
        return;
      }
      setTypingMessage((prev) => prev + texts[textIndex][index]);
      index++;
      
      if (index === texts[textIndex].length) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { 
            role: Role.Model, 
            content: texts[textIndex], 
            hasApply: hasApply === undefined ? undefined : hasApply[textIndex] 
          }
        ]);
        
        
        if (textIndex < texts.length - 1) {
          textIndex++;
          setTypingMessage('');
          index = 0;
          setTimeout(step, 10);
        } else {
          setTypingMessage(null);
        }
      } else {
        setTimeout(step, 10);
      }
    };
    setTimeout(step, 10);
  };
  
  const submitAnaly = () => {
    setMessages([...messages, { role: Role.User, content: "analyze my tasks schedule" }]);
    const fetch = async () => {
      const response = await analyticTask();
      const tasks: Task[] = typeof response.data === 'string'
      ? JSON.parse(response.data) as Task[] : response.data;
      displayTypingEffect(tasks.map(task => convertTaskData(task)), tasks)
    }
    fetch();
  }

  const submitSuggest = (task: Task) : void => {
    const fetch = async () => {
      const response = await applySuggestion(task);
      if (response.statusCode == 200) {
        toast.success(response.data)
      }
    }
    fetch();
  }

  const callAPI = async () => {
      try{
        const response = await createChat({ prompt: input });
        return response.data.data;
      }
      catch(err){
        console.log(err);
        return "I'm sorry, I am not understand what you say";
      }
  };

  const handleShowChatBox = () => {
    setShow(!isShow);
    !isShow ? chatboxRef.current?.classList.add('active') : chatboxRef.current?.classList.remove('active');
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '10000000' }}>
        <div className='chatbox-icon-container' onClick={handleShowChatBox}>
          <img src={chatbox_icon} alt='Chat Icon' className='chatbox-icon' />
        </div>
          <div ref={chatboxRef} className={`chatbox ${isScaled ? 'scaled' : ''} ${isShow ? 'active' : ''}`}
          style={{
            transition: 'all 0.3s ease',
            width: isScaled ? '1000px' : '400px',
            height: isScaled ? '80%' : '60%',
            border: '1px solid #333'
          }}
          >
          <div className='chatbox-nav'>
            <Avatar width='3rem' height='3rem' margin='0 0 0 1rem' image={user_image} />
            <div className='chatbox-nav-text'>Analytics AI</div>
            <select
              style={{color: 'black', marginLeft: '10px'}}
              value={selectedModel.toString()}
              onChange={(e) => setSelectedModel(e.target.value as AI_MODEL)}
              className="model-selector"
            >
              {Object.entries(AI_MODEL).map(([key, value]) => (
                <option key={key} value={value}>
                  {key}
                </option>
              ))}
            </select>
            <button
              onClick={toggleScale}
              className='scale-btn'
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                marginLeft: 'auto',
              }}
            >
            {isScaled ? (
                <div style={{marginRight: '10px'}}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="16"
                    height="16"
                  >
                    <path fill="#ffffff" d="M439 7c9.4-9.4 24.6-9.4 33.9 0l32 32c9.4 9.4 9.4 24.6 0 33.9l-87 87 39 39c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8l-144 0c-13.3 0-24-10.7-24-24l0-144c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2l39 39L439 7zM72 272l144 0c13.3 0 24 10.7 24 24l0 144c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-39-39L73 505c-9.4 9.4-24.6 9.4-33.9 0L7 473c-9.4-9.4-9.4-24.6 0-33.9l87-87L55 313c-6.9-6.9-8.9-17.2-5.2-26.2s12.5-14.8 22.2-14.8z"/>
                  </svg>
                </div>
            ) : (
                <div style={{marginRight: '10px'}}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="16"
                    height="16"
                  >
                    <path
                      fill="#ffffff"
                      d="M344 0L488 0c13.3 0 24 10.7 24 24l0 144c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-39-39-87 87c-9.4 9.4-24.6 9.4-33.9 0l-32-32c-9.4-9.4-9.4-24.6 0-33.9l87-87L327 41c-6.9-6.9-8.9-17.2-5.2-26.2S334.3 0 344 0zM168 512L24 512c-13.3 0-24-10.7-24-24L0 344c0-9.7 5.8-18.5 14.8 22.2s19.3-1.7 26.2 5.2l39 39 87-87c9.4-9.4 24.6-9.4 33.9 0l32 32c9.4 9.4 9.4 24.6 0 33.9l-87 87 39 39c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8z"
                    />
                  </svg>
                </div>
              )}
            </button>
          </div>
          <div className='messages'>
            {messages.map((msg, index) => (
                <div key={index} className={`message-wrapper ${msg.role}`}>
                    {msg.role === 'model' ? (
                        <>
                          <Avatar width='2.5rem' height='2.5rem' margin='1rem 0 0 0' image={chatbox} />
                          <div className='message'>
                            { msg.hasApply ? <button onClick={() => submitSuggest(msg.hasApply as Task)}  style={{backgroundColor: 'rgb(0, 0, 0)', color: 'white', borderRadius: '10px', padding: '4px'}}>apply</button> : '' }
                            <pre className={`modeltext ${msg.role}`}>
                              {msg.content.split('\n').map((line: string, index: number) => (
                                <div style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }} key={index}>
                                  {line}
                                </div>
                              ))}
                            </pre>
                          </div>
                        </>
                    ) : (
                        <>
                            <pre className={`message ${msg.role}`}>
                              {msg.content.split('\n').map((line: string, index: number) => (
                                <div style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }} key={index}>
                                  {line}
                                </div>
                              ))}
                            </pre>
                            <Avatar width='2.5rem' height='2.5rem' margin='4px 0 0 0' image={user_image} />
                        </>
                    )}
                </div>
            ))}
            {isLoading && (
              <div className='typing-box'>
                <Avatar width='2.5rem' height='2.5rem' alignSelf='flex-start' margin='0 1rem 0 0' image={chatbox} />
                <Typing />
              </div>
            )}
            {typingMessage && (
              <div className='message-wrapper'>
                <Avatar
                  width='2.5rem'
                  height='2.5rem'
                  alignSelf='flex-start'
                  margin='1rem 0 0 0'
                  image={chatbox}
                />
                <pre className='message modeltext'>
                  {typingMessage.split('\n').map((line, index) => (
                    <div style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }} key={index}>
                      {line}
                    </div>
                  ))}
                </pre>
              </div>
            )}
          </div>
          <div className='chatbox-input'>
            <div className='chat-footer'>
              <button style={{ margin: '0 10px 0 10px' }} onClick={submitAnaly}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="24px"
                  height="24px"
                >
                  <path
                    d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zm-312 8l0 64c0 13.3 10.7 24 24 24s24-10.7 24-24l0-64c0-13.3-10.7-24-24-24s-24 10.7-24 24zm80-96l0 160c0 13.3 10.7 24 24 24s24-10.7 24-24l0-160c0-13.3-10.7-24-24-24s-24 10.7-24 24zm80 64l0 96c0 13.3 10.7 24 24 24s24-10.7-24-24l0-96c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
                  />
                </svg>
              </button>
              <input
                className='chat-input text-black'
                type='text'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message chat bot..."
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button onClick={sendMessage} className='chat-btn'>
                <img src={send_icon} alt='Send Icon' className='send-icon' />
              </button>
            </div>
          </div>
        </div>
    </div>
  );
}

export default ChatBotComponent;
