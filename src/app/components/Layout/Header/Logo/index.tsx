import Image from 'next/image'
import Link from 'next/link'

const Logo: React.FC = () => {
  return (
    <Link href='/'>
      <Image
        src='/images/logo/bookverse.svg'
        alt='BookVerse Commerce'
        width={160}
        height={48}
        style={{ width: 'auto', height: 'auto' }}
        quality={100}
      />
    </Link>
  )
}

export default Logo
