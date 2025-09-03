
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const WhatsAppWidget = () => {
    return (
        <div className="whatsapp-box">
            <Link
                href="https://api.whatsapp.com/send?phone=41774144691"
                title="Whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp"
            >
                <Image src="/images/images/whatsapp.png" alt="Whatsapp" title="Whatsapp" width={60} height={60} />
            </Link>

        </div>
    )
}

export default WhatsAppWidget