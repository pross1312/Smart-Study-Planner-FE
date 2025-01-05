import { useRef, useState } from 'react';
import chatbox_icon from '../assets/icon.png';
import send_icon from '../assets/send.png';
import chatbox from '../assets/chatbot.png';
import user_image from '../assets/user.jpeg';

import Avatar from './Avatar';
import Typing from './Typing';
import "./css/ChatBox.css"
import { createChat } from '../api/chat.api';

function ChatBotComponent() {
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([]);
  const [typingMessage, setTypingMessage] = useState<string | null>(null);
  const [input, setInput] = useState<string>('');
  const [isShow, setShow] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const chatboxRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'user', text: input }]);
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
        setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text }]);
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
        return "I'm sorry, I don't understand that.";
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
        <div ref={chatboxRef} className='chatbox'>
          <div className='chatbox-nav'>
            <Avatar width='3rem' height='3rem' margin='0 0 0 1rem' image={user_image} />
            <div className='chatbox-nav-text'>ChatGPT</div>
          </div>
          <div className='messages'>
            {messages.map((msg, index) => (
                <div key={index} className={`message-wrapper ${msg.sender}`}>
                    {msg.sender === 'bot' ? (
                        <>
                            <Avatar width='2.5rem' height='2.5rem' margin='1rem 0 0 0' image={chatbox} />
                            <div className={`message ${msg.sender}`}>{msg.text}</div>
                        </>
                    ) : (
                        <>
                            <div className={`message ${msg.sender}`}>{msg.text}</div>
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
                <Avatar width='2.5rem' height='2.5rem' alignSelf='flex-start' margin='1rem 0 0 0' image={chatbox} />
                <div className='message bot'>{typingMessage}</div>
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
