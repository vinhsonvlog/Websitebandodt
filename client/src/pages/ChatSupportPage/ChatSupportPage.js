import { useState } from 'react';
import './ChatSupportPage.css';

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'support',
    text: 'Bạn cần hỗ trợ gì không ?',
    time: '10:42 SA',
  },
  {
    id: 2,
    sender: 'user',
    text: 'Cho mình hỏi giá tiền của con Dell XPS 13 9320',
    time: '10:42 SA',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&q=80',
  },
  {
    id: 3,
    sender: 'support',
    text: 'Nếu là laptop Dell XPS 13 9320 thì có giá là : 23.700.000',
    time: '10:43 SA',
  }
];

function ChatSupportPage() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputText,
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' SA',
    };

    setMessages([...messages, newMessage]);
    setInputText('');

    // Simulate basic bot reply
    setTimeout(() => {
      const replyMessage = {
        id: Date.now() + 1,
        sender: 'support',
        text: 'Cảm ơn bạn. Bộ phận CSKH sẽ phản hồi bạn trong giây lát.',
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' SA',
      };
      setMessages(prev => [...prev, replyMessage]);
    }, 1500);
  };

  return (
    <div className="chat-support">
      <div className="chat-support__container">
        <div className="chat-support__header-title">Quốc Hưng - Chat hỗ trợ</div>
        
        <div className="chat-support__main-box">
          <aside className="chat-sidebar">
            <h2 className="chat-sidebar__title">Dịch vụ hỗ trợ</h2>
            <ul className="chat-sidebar__list">
              <li className="chat-sidebar__item">Tư vấn online</li>
              <li className="chat-sidebar__item chat-sidebar__item--active">Chăm sóc khách hàng</li>
            </ul>
          </aside>

          <main className="chat-content">
            <header className="chat-content__header">
              <span className="chat-content__header-icon">⚙️</span>
              <h2 className="chat-content__header-title">Chăm sóc khách hàng</h2>
            </header>

            <div className="chat-content__messages">
              {messages.map((msg) => (
                <div key={msg.id} className={`chat-message chat-message--${msg.sender}`}>
                  <div className="chat-message__avatar">
                    {msg.sender === 'support' ? '👮' : '👤'}
                  </div>
                  <div className="chat-message__body">
                    {msg.text && (
                      <div className={`chat-message__bubble chat-message__bubble--${msg.sender}`}>
                        {msg.text}
                      </div>
                    )}
                    {msg.image && (
                      <img src={msg.image} alt="attachment" className="chat-message__image" />
                    )}
                    <div className="chat-message__time">{msg.time}</div>
                  </div>
                </div>
              ))}
            </div>

            <footer className="chat-content__input-area">
              <div className="chat-content__input-icons">
                <span>🎤</span>
                <span>🖼️</span>
                <span>😊</span>
                <span>GIF</span>
              </div>
              <div className="chat-content__input-wrapper">
                <input
                  type="text"
                  placeholder="Aa"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <span className="chat-content__input-addon">😊</span>
              </div>
              <button 
                className="chat-content__send-btn" 
                onClick={handleSend}
              >
                💬
              </button>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}

export default ChatSupportPage;
