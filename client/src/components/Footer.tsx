import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content">
      <div>
        <p>
          Made with ❤️ by{' '}
          <Link href="https://github.com/0xRnato" target="_blank">
            Renato Neto
          </Link>
        </p>
      </div>
    </footer>
  );
}
