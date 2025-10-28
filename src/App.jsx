import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

// "База данных" где ключи НЕ совпадают с id товаров
const productsDatabase = {
  'super-tv': { id: 1001, name: 'Телевизор', price: 29900, amount: 15 },
  'mega-phone': { id: 1002, name: 'Смартфон', price: 13900, amount: 48 },
  'cool-tablet': { id: 1003, name: 'Планшет', price: 18400, amount: 23 },
  'old-laptop': { id: 999, name: 'Ноутбук', price: 45000, amount: 5 },
};

const fetchProduct = (productKey) => {
  return productsDatabase[productKey];
};

const Home = () => (
  <div>
    <h2>Главная страница</h2>
    <p>Добро пожаловать в наш магазин!</p>
  </div>
);

const ProductList = () => (
  <div>
    <h2>Каталог товаров</h2>
    <p>Обратите внимание: в URL используются ключи, а не ID товаров!</p>
    <ul>
      {Object.entries(productsDatabase).map(([key, product]) => (
        <li key={key}>
          <Link to={`/products/${key}`}>
            {product.name} (ID: {product.id}, Ключ: "{key}")
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const ProductDetail = () => {
  const { productKey } = useParams();
  const product = fetchProduct(productKey);

  if (!product) {
    return (
      <div>
        <h3>Товар не найден!</h3>
        <p>Ключ "{productKey}" не существует в базе</p>
      </div>
    );
  }

  return (
    <div style={{ border: '2px solid #ccc', padding: '20px', margin: '20px 0' }}>
      <h3>Информация о товаре</h3>
      <p><strong>Ключ в URL:</strong> {productKey}</p>
      <p><strong>ID товара:</strong> {product.id}</p>
      <p><strong>Название:</strong> {product.name}</p>
      <p><strong>Цена:</strong> {product.price} руб.</p>
      <p><strong>На складе:</strong> {product.amount} шт.</p>
      <div style={{ background: '#f0f0f0', padding: '10px', marginTop: '10px' }}>
        <strong>Важно:</strong> Ключ "{productKey}" ≠ ID {product.id}!
      </div>
    </div>
  );
};

// Главный компонент приложения
function App() {
  return (
    <Router>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <header style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
          <h1>Магазин техники</h1>
          <nav>
            <Link to="/" style={{ marginRight: '15px' }}>Главная</Link>
            <Link to="/products">Каталог</Link>
          </nav>
        </header>

        <main style={{ marginTop: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:productKey" element={<ProductDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;