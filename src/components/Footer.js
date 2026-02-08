export default function Footer() {
  return (
    <footer className="bg-secondary/50 pt-16 pb-8 border-t mt-auto">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">OSCAR EDU HYPER MART</h3>
            <p className="text-muted-foreground text-sm">
              India's largest one stop store for art and craft supplies.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">New Arrivals</a></li>
              <li><a href="#" className="hover:text-primary">Best Sellers</a></li>
              <li><a href="#" className="hover:text-primary">Sale</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary">FAQs</a></li>
              <li><a href="#" className="hover:text-primary">Shipping Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">Subscribe to get special offers and updates.</p>
            <input type="email" placeholder="Your email" className="w-full p-2 border rounded mb-2 text-sm" />
            <button className="w-full bg-primary text-white py-2 rounded text-sm font-medium hover:bg-primary/90">
              Subscribe
            </button>
          </div>
        </div>
        <div className="border-t pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Oscar Edu Hyper Mart. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
