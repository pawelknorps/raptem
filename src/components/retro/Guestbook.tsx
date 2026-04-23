import React, { useState, useEffect } from 'react';

interface Entry {
  id: number;
  name: string;
  message: string;
  date: string;
}

const Guestbook: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('raptem_guestbook');
    if (saved) {
      setEntries(JSON.parse(saved));
    } else {
      // Default entries for that authentic feel
      const defaults: Entry[] = [
        { id: 1, name: 'Wujek Gienek', message: 'Super gracie chłopaki! Tynk u mnie w kuchni faktycznie odpadł!', date: '23.04.2026' },
        { id: 2, name: 'FanFolk99', message: 'Kiedy koncert w remizie w Krzywosądzy??? Pozdrawiam!', date: '22.04.2026' }
      ];
      setEntries(defaults);
      localStorage.setItem('raptem_guestbook', JSON.stringify(defaults));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    const newEntry: Entry = {
      id: Date.now(),
      name,
      message,
      date: new Date().toLocaleDateString('pl-PL')
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem('raptem_guestbook', JSON.stringify(updated));
    setName('');
    setMessage('');
    alert('WPIS DODANY! GOŁĄB WYPRAWIONY!');
  };

  return (
    <div className="guestbook-container" style={{ border: '3px inset #fff', padding: '15px', background: '#f0f0f0' }}>
      <h3 style={{ marginBottom: '10px', color: '#000080' }}>KSIĘGA GOŚCI (Wersja 1.0)</h3>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px', borderBottom: '2px solid #808080', paddingBottom: '15px' }}>
        <input 
          type="text" 
          placeholder="Twoja ksywka..." 
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '5px', border: '2px inset #fff', fontFamily: 'Times New Roman' }}
        />
        <textarea 
          placeholder="Wpisz się do księgi..." 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ height: '80px', padding: '5px', border: '2px inset #fff', fontFamily: 'Times New Roman' }}
        />
        <button type="submit" className="win95-button" style={{ fontWeight: 'bold' }}>
          WYŚLIJ GOŁĘBIA
        </button>
      </form>

      <div className="entries-list" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {entries.map(entry => (
          <div key={entry.id} className="entry" style={{ border: '1px solid #808080', padding: '10px', background: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#808080', marginBottom: '5px' }}>
              <strong>~{entry.name}</strong>
              <span>{entry.date}</span>
            </div>
            <p style={{ fontSize: '14px' }}>{entry.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Guestbook;
