// components/BuyMeCoffeeButton.js
import React, { useEffect } from 'react';

import Link from 'next/link';
import styles from './Buymecoffee.module.css'
function BuyMeCoffeeButton() {
    return (
        <Link className={styles['buy-me-coffee-btn']} href="https://www.buymeacoffee.com/darayuthhag"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=darayuthhag&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></Link>
    );
}

export default BuyMeCoffeeButton;
