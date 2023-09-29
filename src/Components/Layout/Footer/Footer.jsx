import React from 'react'
import Logo from '../../../images/logo.jpeg';
import './Footer.css'
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <footer id='footer'>
        <div className='left-footer'>
            <img src={Logo} alt="Logo de Importados Beauty" />
            <p>Importados beauty busca brindar mayor accesibilidad para comprar productos del exterior, principalmente fragancias de Victoria Secret. Consúltanos!</p>
        </div>
        <div className='right-footer'>
            <a  href="https://www.instagram.com/importadosbeauty_sn/" target='_blank'><InstagramIcon className='instagram'/></a>
            <a href='tel:+5493364001069'>Tel: +5493364001069</a>
        </div>
    </footer>
  )
}

export default Footer