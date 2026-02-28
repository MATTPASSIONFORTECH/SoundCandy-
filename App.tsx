import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './store/AuthContext';
import { CartProvider } from './store/CartContext';
import { DataProvider } from './store/DataContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { Blog } from './pages/Blog';
import { Credits } from './pages/Credits';
import { Support } from './pages/Support';
import { Cart } from './pages/Cart';
import { Upload } from './pages/Upload';
import { About } from './pages/About';
import { AdminSettings } from './pages/AdminSettings';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <DataProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/credits" element={<Credits />} />
                <Route path="/support" element={<Support />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/about" element={<About />} />
                <Route path="/admin" element={<AdminSettings />} />
              </Routes>
            </Layout>
          </DataProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
