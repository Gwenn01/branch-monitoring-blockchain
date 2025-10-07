import { useState } from 'react'
import { BranchPanel, Dashboard, Sidebar, TransactionExplorer, WalletConnect } from './components'

const App = () => {
  const [count, setCount] = useState(0)

  return (
   <div className=''>
    <Sidebar />
    <Dashboard />
    <TransactionExplorer />
    <BranchPanel />
    <WalletConnect />
   </div>
  )
}

export default App
