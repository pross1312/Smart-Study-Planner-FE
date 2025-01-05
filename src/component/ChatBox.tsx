import { useRef, useState, useEffect } from 'react';
import chatbox_icon from '../assets/icon.png';
import send_icon from '../assets/send.png';
import chatbox from '../assets/chatbot.png';
import user_image from '../assets/user.jpeg';

import Avatar from './Avatar';
import Typing from './Typing';
import "./css/ChatBox.css"
import { listModels, createChat, getChatHistory, Role } from '../api/chat.api';

function ChatBotComponent() {
  const [messages, setMessages] = useState<Array<{role: Role, content: string}>>([]);
  const [typingMessage, setTypingMessage] = useState<string | null>(null);
  const [_currentModel, setModel] = useState<string | null>(null);
  const [_modelList, setModelList] = useState<Array<string>>([]);
  const [input, setInput] = useState<string>('');
  const [isShow, setShow] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isScaled, setIsScaled] = useState(false);
  const chatboxRef = useRef<HTMLDivElement>(null);

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

    // analyzeSchedule().then(response => {
    //   const seperationIndex = response?.data?.indexOf('\r\n\r\n');
    //   const suggestions = response?.data?.slice(0, seperationIndex)?.split("\r\n");
    //   for (const suggestion of suggestions) {
    //     console.log(JSON.parse(suggestion));
    //   }
    //   console.log(response?.data?.slice(seperationIndex + 4));
    // }).catch(err => {
    //   console.log(err);
    // });
  }, []);

  const sendMessage = async () => {
    if (input.trim()) {
      setMessages([...messages, { role: Role.Model, content: input }]);
      setInput('');
      setLoading(true);

      const botMessage = await callAPI();
      setLoading(false);
      displayTypingEffect(botMessage);
    }
  };

  const displayTypingEffect = (text: string) => {
    let index = 0;
    setTypingMessage('');
      const typingInterval = setInterval(() => {
      setTypingMessage((prev) => prev + text[index]);
      index++;

      if (index === text.length) {
        clearInterval(typingInterval);
        setMessages((prevMessages) => [...prevMessages, { role: Role.Model, content: text }]);
        setTypingMessage(null);
      }
    }, 10);
  };

  const callAPI = async () => {
      try{
        const response = await createChat({prompt: input});
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
    <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
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
                            <pre className={`message ${msg.role}`}>
                              {msg.content.split('\n').map((line: string, index: number) => (
                                <div style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }} key={index}>
                                  {line}
                                </div>
                              ))}
                            </pre>
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
                <pre className='message bot'>
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
