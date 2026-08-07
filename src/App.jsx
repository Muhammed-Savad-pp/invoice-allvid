import { lazy, useEffect, useRef, useState } from 'react';
import './App.css'
const InvoicePDF = lazy(() => import('./components/InvoicePDF'))
const Home = lazy(() => import('./pages/Home'))


function App() {

  const [invoiceData, setInvoiceData] = useState(null);
  const invoiceRef = useRef(null);

  useEffect(() => {
    if(invoiceData) {
      invoiceRef.current?.print();
    }
  }, [invoiceData])

  const handleSubmit = (data) => {
    setInvoiceData(data);
  }

  return (
    <>
      <Home onSubmit={handleSubmit} />

       <div className="absolute -left-[9999px] top-0">
        <InvoicePDF
          ref={invoiceRef}
          data={invoiceData}
        />
      </div>
    </>
  )
}

export default App
