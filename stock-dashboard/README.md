# 📈 Stock Price Dashboard

A responsive stock price dashboard built with React, Tailwind CSS, and Recharts. Displays stock market data in table and chart formats with search, sorting, and interactive features.

## 🌐 Live Demo

**🚀 [View Live Application](https://stock-dashboard-made-by-ahmad.netlify.app/)**

## ✨ Features

### Core Requirements ✅
- Stock data table with symbol, price, change %, volume
- Responsive design with Tailwind CSS
- Real-time data fetching (sample data)
- Modern UI with gradient design

### Bonus Features 🚀
- Loading states with animated spinner
- Interactive charts (bar, line, pie)
- Search functionality
- Sortable columns
- Error handling with retry
- View mode toggle (table/chart)
- Responsive layout

## 🛠️ Technologies

- React 18
- Tailwind CSS
- Recharts for data visualization
- React Icons
- Axios for API calls

## 🚀 Getting Started

```bash
git clone <repo-url>
cd stock-dashboard
npm install
npm start
```

## 📊 API Integration

Ready to integrate with real stock APIs:

```javascript
// Alpha Vantage
const response = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=${API_KEY}`);

// Finnhub
const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=AAPL&token=${API_KEY}`);
```

## 🎨 Features

### Table View
- Sortable columns
- Color-coded price changes
- Responsive design
- Company avatars

### Chart View
- Bar chart for prices
- Line chart for changes
- Pie chart for market activity
- Interactive tooltips

### Search & Filter
- Real-time search
- Clear functionality
- No results handling

## 🚀 Deployment

### Netlify (Current)
- **Live URL**: [https://stock-dashboard-made-by-ahmad.netlify.app/](https://stock-dashboard-made-by-ahmad.netlify.app/)

### Other Options
- Vercel: Connect GitHub repo
- GitHub Pages: `npm run deploy`

## 📱 Responsive

Optimized for desktop, tablet, and mobile devices using Tailwind CSS responsive utilities.

## 📄 License

MIT License

---

**🎉 Live Demo**: [https://stock-dashboard-made-by-ahmad.netlify.app/](https://stock-dashboard-made-by-ahmad.netlify.app/)
