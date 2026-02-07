import React, { useState } from 'react';

function getDayOfWeek(day, month, year) {
  const d = new Date(year, month - 1, day);
  const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  return days[d.getDay()];
}

function isLeapYear(year) {
  const y = parseInt(year, 10);
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}

function getCurrentAge(day, month, year) {
  const birth = new Date(year, month - 1, day);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

function getAgeWord(age) {
  if (age % 10 === 1 && age % 100 !== 11) return 'год';
  if ([2, 3, 4].includes(age % 10) && ![12, 13, 14].includes(age % 100)) return 'года';
  return 'лет';
}

function isValidDate(day, month, year) {
  const d = parseInt(day, 10);
  const m = parseInt(month, 10);
  const y = parseInt(year, 10);
  if (!d || d < 1 || d > 31 || !m || m < 1 || m > 12 || !y || y < 1900 || y > 2100) return false;
  const maxDay = new Date(y, m, 0).getDate();
  if (d > maxDay) return false;
  const input = new Date(y, m - 1, d);
  if (input > new Date()) return false;
  return true;
}

const STAR_DIGITS = {
  '0': [' *** ', '*   *', '*   *', '*   *', ' *** '],
  '1': ['  *  ', ' **  ', '  *  ', '  *  ', ' *** '],
  '2': [' *** ', '*   *', '  ** ', ' *   ', '*****'],
  '3': [' *** ', '*   *', '  ** ', '*   *', ' *** '],
  '4': ['*   *', '*   *', '*****', '    *', '    *'],
  '5': ['*****', '*    ', ' *** ', '    *', ' *** '],
  '6': [' *** ', '*    ', ' *** ', '*   *', ' *** '],
  '7': ['*****', '    *', '   * ', '  *  ', ' *   '],
  '8': [' *** ', '*   *', ' *** ', '*   *', ' *** '],
  '9': [' *** ', '*   *', ' ****', '    *', ' *** '],
};

function dateToStars(dd, mm, yyyy) {
  const s = `${String(dd).padStart(2, '0')} ${String(mm).padStart(2, '0')} ${yyyy}`;
  const lines = [];
  for (let row = 0; row < 5; row++) {
    let line = '';
    for (const ch of s) {
      if (ch === ' ') line += '   ';
      else if (STAR_DIGITS[ch]) line += STAR_DIGITS[ch][row] + ' ';
    }
    lines.push(line);
  }
  return lines.join('\n');
}

function App() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState(null);
  const [leapResult, setLeapResult] = useState(null);
  const [age, setAge] = useState(null);
  const [starOutput, setStarOutput] = useState('');

  const valid = isValidDate(day, month, year);

  const onDayOfWeek = () => {
    if (!valid) return alert('Введите корректную дату (день, месяц, год).');
    setDayOfWeek(getDayOfWeek(Number(day), Number(month), Number(year)));
  };

  const onLeapYear = () => {
    if (!year) return alert('Введите год.');
    setLeapResult(isLeapYear(year));
  };

  const onAge = () => {
    if (!valid) return alert('Введите корректную дату (день, месяц, год).');
    setAge(getCurrentAge(Number(day), Number(month), Number(year)));
  };

  const onStars = () => {
    if (!valid) return alert('Введите корректную дату (день, месяц, год).');
    const dd = String(day).padStart(2, '0');
    const mm = String(month).padStart(2, '0');
    const text = dateToStars(day, month, year);
    setStarOutput(`Дата рождения: ${dd}.${mm}.${year}\n\n${text}`);
    console.log('\nДата рождения (дд мм гггг):\n' + text);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Кейс №2 — Стилистическое преобразование чисел</h1>
      </header>
      <main className="main-content">
        <section className="input-section">
          <h2>1. Введите дату рождения</h2>
          <div className="date-inputs">
            <div className="input-group">
              <label>День</label>
              <input
                type="number"
                min="1"
                max="31"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                placeholder="ДД"
              />
            </div>
            <div className="input-group">
              <label>Месяц</label>
              <input
                type="number"
                min="1"
                max="12"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                placeholder="ММ"
              />
            </div>
            <div className="input-group">
              <label>Год</label>
              <input
                type="number"
                min="1900"
                max="2100"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="ГГГГ"
              />
            </div>
          </div>
        </section>

        <section className="functions-section">
          <div className="function-card">
            <h3>2. День недели</h3>
            <button type="button" onClick={onDayOfWeek} className="function-button">Узнать день недели</button>
            {dayOfWeek !== null && <div className="result">{dayOfWeek}</div>}
          </div>
          <div className="function-card">
            <h3>3. Високосный год</h3>
            <button type="button" onClick={onLeapYear} className="function-button">Проверить год</button>
            {leapResult !== null && <div className="result">{leapResult ? 'Високосный' : 'Не високосный'}</div>}
          </div>
          <div className="function-card">
            <h3>4. Возраст</h3>
            <button type="button" onClick={onAge} className="function-button">Сколько лет</button>
            {age !== null && <div className="result">{age} {getAgeWord(age)}</div>}
          </div>
          <div className="function-card">
            <h3>5. Дата звёздочками</h3>
            <button type="button" onClick={onStars} className="function-button">Вывести в консоль и на экран</button>
          </div>
        </section>

        {starOutput && (
          <section className="console-section">
            <div className="console-container">
              <div className="console-header">
                <span className="console-title">Вывод даты (дд мм гггг)</span>
              </div>
              <pre className="console-output">{starOutput}</pre>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
