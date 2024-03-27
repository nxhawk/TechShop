import 'bootstrap-icons/font/bootstrap-icons.css';
import '../globals.css'
import ToasterContext from '../context/ToasterContext';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import FAB from '../components/widgets/fab/FAB';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return(
  <html lang='vi'>
      <body suppressHydrationWarning={true} className='bg-gray-200'>
        <ToasterContext/>
        <>
          <Header/>
          <main className='max-w-screen-xl mx-auto align-middle items-center'>
              {children}
          </main>
          <FAB/>
          <Footer/>
        </>
      </body>
  </html>
  )
}