# 📈 Stock Price Dashboard

A beautiful, responsive stock price dashboard built with React, Tailwind CSS, and Recharts. This application displays real-time stock market data in both table and chart formats with advanced features like search, sorting, and error handling.

## ✨ Features

### Core Requirements ✅
- **Stock Data Table**: Displays symbol, price, change %, and volume
- **Responsive Design**: Built with Tailwind CSS for mobile-first design
- **Real-time Data**: Fetches stock information (currently using sample data)
- **Beautiful UI**: Modern gradient design with glassmorphism effects

### Bonus Features 🚀
- **Loading States**: Animated spinner while fetching data
- **Interactive Charts**: Multiple chart types using Recharts
  - Bar chart for stock prices
  - Line chart for price changes
  - Pie chart for market activity
- **Search Functionality**: Filter stocks by symbol or company name
- **Sorting**: Click column headers to sort by any field
- **Error Handling**: Graceful error states with retry functionality
- **View Mode Toggle**: Switch between table and chart views
- **Responsive Layout**: Works perfectly on all device sizes

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Beautiful chart library
- **React Icons** - Icon library
- **Axios** - HTTP client (ready for API integration)

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd stock-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📊 API Integration

The app is currently using sample data for demonstration. To integrate with a real stock API:

1. **Alpha Vantage** (Free tier available):
```javascript
// In App.js, replace the sample data with:
const API_KEY = 'your_api_key';
const response = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=AAPL&apikey=${API_KEY}`);
```

2. **Finnhub** (Free tier available):
```javascript
const API_KEY = 'your_api_key';
const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=AAPL&token=${API_KEY}`);
```

## 🎨 Features in Detail

### Table View
- Sortable columns (click headers to sort)
- Color-coded price changes (green for positive, red for negative)
- Responsive design with horizontal scroll on mobile
- Company avatars with stock symbol initials

### Chart View
- **Bar Chart**: Visualizes stock prices
- **Line Chart**: Shows price change percentages
- **Pie Chart**: Displays market activity distribution
- Interactive tooltips with detailed information
- Summary statistics cards

### Search & Filter
- Real-time search by stock symbol or company name
- Clear search functionality
- No results state handling

### Loading & Error States
- Beautiful animated loading spinner
- Comprehensive error messages
- Retry functionality
- User-friendly error explanations

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Upload the `build` folder to Netlify

### GitHub Pages
1. Add `"homepage": "https://yourusername.github.io/stock-dashboard"` to package.json
2. Install gh-pages: `npm install --save-dev gh-pages`
3. Add deploy script: `"deploy": "gh-pages -d build"`
4. Run: `npm run deploy`

## 📱 Responsive Design

The dashboard is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🎯 Future Enhancements

- Real-time WebSocket updates
- More chart types (candlestick, area charts)
- Stock watchlist functionality
- Historical data analysis
- Dark/light theme toggle
- Export functionality
- More stock exchanges support

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Note**: This is a demonstration project. For production use, please integrate with a real stock market API and implement proper error handling and rate limiting.
