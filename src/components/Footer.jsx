export default function Footer() {
  return (
    <footer style={{marginTop:'auto',padding:'1.5rem 2rem',borderTop:'1px solid #eee',color:'#666',fontSize:'0.95rem'}}>
      <div style={{maxWidth:1000,margin:'0 auto',display:'flex',gap:'1rem',justifyContent:'space-between',flexWrap:'wrap'}}>
        <span>© {new Date().getFullYear()} Quizzify</span>
        <nav aria-label="Footer menu" style={{display:'flex',gap:'1rem'}}>
          <a href="#" style={{color:'inherit',textDecoration:'none'}}>Contact</a>
          <a href="#" style={{color:'inherit',textDecoration:'none'}}>Privacy</a>
          <a href="#" style={{color:'inherit',textDecoration:'none'}}>Terms</a>
        </nav>
      </div>
    </footer>
  );
}