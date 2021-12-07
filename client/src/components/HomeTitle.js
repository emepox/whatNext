import React, { useState, useEffect } from 'react';
import { useTrail, a } from '@react-spring/web';

  const Trail = ({ open, children }) => {
  const items = React.Children.toArray(children)
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  })
  return (
    <div>
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index} className="relative w-full h-custom text-black text-custom font-extrabold tracking-tighter overflow-hidden pr-custom " style={style}>
          <a.div style={{ height }}>{items[index]}</a.div>
        </a.div>
      ))}
    </div>
  )
}

export default function App() {
  const [open, setOpen] = useState(false)
  
  useEffect(() => {
    setOpen(state => !state);
  }, [])
  return (
    <div className="flex flex-col items-center justify-center">
      <Trail open={open}>
        <span>Lorem</span>
        <span>Ipsum</span>
        <span>Dolor</span>
        <span>Sit</span>
      </Trail>
    </div>
  )
}
