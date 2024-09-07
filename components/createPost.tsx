import { Plus } from "lucide-react";
import Post from './post'
import { useState } from "react";

export default function CreatePost() {
  const [isOpen, setIsOpen] = useState(false)

  function handleClick() {
    console.log('test')
    setIsOpen(true)
  }

  return <>
    <div style={{position: 'fixed', bottom: '1em', left: 'calc(50% - 2.5em)'}} onClick={handleClick}>
      <div style={{ padding: '0.5em', width: '5em', height: '5em', borderRadius: '50%', backgroundColor: 'white', boxShadow: '0.25em 0.25em 0.5em rgba(0, 0, 0, 30% )' }}>
        <Plus size={'4em'} color="#959595" />
      </div>
    </div>
    <div style={{position: 'fixed', top: '0'}}>
      <Post isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  </>
}